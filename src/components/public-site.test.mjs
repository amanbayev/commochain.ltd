import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { publicSiteCopy,companyFacts } from '../content/public-site-copy.ts';
const read=path=>readFileSync(new URL(path,import.meta.url),'utf8');
const escape=text=>text.replaceAll('&','&amp;').replaceAll("'",'&#x27;');
for(const locale of ['en','ru','kk'])test(`${locale}: homepage and download carry current company truth beneath the cinematic opening`,()=>{const html=read(`../../dist/${locale}.html`),doc=read(`../../dist/downloads/commoditychain-overview-${locale}.html`),p=publicSiteCopy[locale];for(const output of [html,doc]){for(const text of [p.hero,p.stage,p.stageBody,p.shareholderBody,p.partnershipNote,p.solanaBody,p.storageBody,p.storageSummary,p.storageDocuments,...p.evidence.map(x=>x.body)])assert.ok(output.includes(escape(text)),text);for(const text of [companyFacts.licence,companyFacts.institution,companyFacts.issued,companyFacts.expires])assert.ok(output.includes(text));assert.ok(!output.includes('Licence_Commodity'));assert.ok(!/pending approval|FinTech Lab/.test(output));}assert.ok(!html.includes('<video'));assert.match(html, /id="cinema" class="cinematic-opening"/);assert.ok(!html.includes('class="public-reading" hidden'));assert.ok(html.indexOf('id="cinema"')<html.indexOf('id="overview"'));assert.match(html,/class="public-reading"/);const ids=['overview','assets','verification','infrastructure','participation','company','faq','contact','deeper'];const positions=ids.map(id=>html.indexOf(`id="${id}"`));assert.ok(positions.every((p,i)=>p>0&&(i===0||p>positions[i-1])));assert.ok(html.includes('id="full-story-text"'));assert.ok(html.includes('id="enquiry-role"'));assert.ok(!html.includes('RESEND_API_KEY'));});
test('cinematic opening is the default and retains one controller with static fallbacks',()=>{
  const source=read('./story-page.tsx');
  assert.ok(source.includes('mounted&&!staticMode&&<video'));
  assert.equal((source.match(/<video /g)||[]).length,1);
  assert.ok(source.includes('scrubber.dispose()'));
  assert.ok(!/storyOpen|optional-cinema|closeStoryRef/.test(source));
  assert.ok(source.includes('.story-static{display:block!important}'));
  assert.ok(source.includes('const backToStory=openStory'));
  const config=JSON.parse(read('../../site.config.json'));assert.equal(config.allowIndexing,false);
});
test('deeper reading has padded content groups and a separate return action before the footer',()=>{
  const html=read('../../dist/en.html'),css=read('../public-site.css');
  assert.equal((html.match(/class="detail-content"/g)||[]).length,4);
  assert.match(html,/class="deeper-return"><a[^>]*href="#cinema"/);
  assert.match(css,/\.public-deeper \.detail-content \{[^}]*padding:8px 0 32px/);
  assert.match(css,/\.public-site \.story-footer \{[^}]*padding-top:40px/);
});
test('supplied TechHub logo uses a local alpha-capable PNG and reserves its layout',()=>{
  const png=readFileSync(new URL('../../public/assets/techhub-transparent.png',import.meta.url));
  assert.equal(png.subarray(1,4).toString(),'PNG');assert.equal(png[25],6);
  const html=read('../../dist/en.html');
  assert.match(html,/class="techhub-logo"[^>]*src="\/assets\/techhub-transparent.png"[^>]*width="1949"[^>]*height="807"[^>]*loading="lazy"/);
});
