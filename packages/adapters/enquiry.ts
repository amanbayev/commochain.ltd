import type { EnquiryPayload } from '../contracts/enquiry.ts';
export interface EnquiryDelivery {
  accept(enquiry: EnquiryPayload): Promise<void>;
}
export interface EnquiryGuard {
  checkRate(client: string): Promise<boolean>;
  acquire(eventId: string, digest: string): Promise<'new' | 'accepted' | 'pending' | 'conflict'>;
  accepted(eventId: string, digest: string): Promise<void>;
}

// Optional reference adapter. Not provisioned or enabled by this repository.
export function resendDelivery(apiKey: string, from: string, http: typeof fetch = fetch): EnquiryDelivery {
  return { async accept(v) {
    const response = await http('https://api.resend.com/emails', {
      method:'POST', headers:{ Authorization:`Bearer ${apiKey}`, 'Content-Type':'application/json', 'Idempotency-Key':`enquiry/${v.eventId}/${v.nonce}` },
      body: JSON.stringify({ from, to:['info@commochain.ltd'], reply_to:v.email,
        subject:`CommodityChain enquiry — ${v.role}`,
        text:`Name: ${v.name}\nEmail: ${v.email}\nOrganisation: ${v.organisation}\nRole: ${v.role}\nLanguage: ${v.locale}\n\n${v.message}`,
      }), signal:AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error('Provider acceptance not confirmed');
    const result = await response.json() as {id?:unknown};
    if (typeof result.id !== 'string' || !result.id) throw new Error('Invalid provider receipt');
  } };
}

// Redis REST adapter: atomic rate windows and durable PII-free idempotency tombstones.
// Never substitute a process-local map on a horizontally scaled serverless deployment.
export function redisEnquiryGuard(url: string, token: string, http: typeof fetch = fetch): EnquiryGuard {
  async function evalScript(script: string, keys: string[], args: string[]) {
    const response = await http(url, {method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},
      body:JSON.stringify(['EVAL',script,String(keys.length),...keys,...args]),signal:AbortSignal.timeout(3000)});
    if (!response.ok) throw new Error('Guard unavailable');
    const result = await response.json() as {result?:unknown;error?:unknown};
    if (result.error || result.result === undefined) throw new Error('Guard unavailable');
    return result.result;
  }
  return {
    async checkRate(client) {
      const value = await evalScript("local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],600) end; return n", [`cc:enquiry:rate:${client}`], []);
      if (typeof value !== 'number') throw new Error('Invalid rate response');
      return value <= 5;
    },
    async acquire(id, digest) {
      const result = await evalScript(`local raw=redis.call('GET',KEYS[1]); local now=tonumber(redis.call('TIME')[1]);
        if raw then local v=cjson.decode(raw); if v.digest~=ARGV[1] then return 'conflict' end;
          if v.state=='accepted' then return 'accepted' end; if v.untilTime>now then return 'pending' end end;
        redis.call('SET',KEYS[1],cjson.encode({digest=ARGV[1],state='pending',untilTime=now+30})); return 'new'`, [`cc:enquiry:event:${id}`], [digest]);
      if (!['new','accepted','pending','conflict'].includes(String(result))) throw new Error('Invalid guard response');
      return result as 'new'|'accepted'|'pending'|'conflict';
    },
    async accepted(id, digest) {
      const result = await evalScript(`local raw=redis.call('GET',KEYS[1]); if not raw then return 0 end;
        local v=cjson.decode(raw); if v.digest~=ARGV[1] then return 0 end;
        redis.call('SET',KEYS[1],cjson.encode({digest=ARGV[1],state='accepted',untilTime=0})); return 1`, [`cc:enquiry:event:${id}`], [digest]);
      if (result !== 1) throw new Error('Receipt not persisted');
    },
  };
}
