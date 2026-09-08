# Enquiry delivery boundary — disabled until configured

The owner confirmed on 9 September 2026 that nothing is configured. This change does not provision an account, set a credential, change DNS or send a real message.

Default behavior: GET /api/enquiry returns 200 with available=false. POST returns 503 not_configured. The page offers an explicitly unsent email draft and a direct info@commochain.ltd link. The local static preview always uses that disabled behavior.

## Optional reference implementation

The OpenAPI 3.1 contract in packages/contracts/openapi.yaml precedes implementation. The transport entry is api/enquiry.ts; orchestration is in packages/enquiries; every outbound request is behind packages/adapters.

The reference delivery adapter uses the [Resend email API](https://resend.com/docs/api-reference/emails/send-email). The guard needs a durable, write-enabled Redis REST endpoint compatible with atomic EVAL and TIME (for example the [Upstash REST API](https://upstash.com/docs/redis/features/restapi)). These are implementation options, not configured or approved accounts. No dependency was added.

Use only an owner-approved provider, verified authorised sender and approved data-handling arrangement. If another provider is selected, implement the EnquiryDelivery interface and equivalent idempotency semantics; do not bypass the domain boundary.

## Exact server-only configuration

| Variable | Requirement |
| --- | --- |
| ENQUIRY_ENABLED | Literal true only after the checks below; defaults disabled |
| RESEND_API_KEY | Server-only authorised provider credential; never VITE-prefixed |
| ENQUIRY_FROM | Verified, authorised bare sender email address; no display-name syntax |
| ENQUIRY_REDIS_URL | Exact HTTPS Redis REST endpoint |
| ENQUIRY_REDIS_TOKEN | Scoped write-capable token for that endpoint |
| ENQUIRY_HMAC_SECRET | At least 32 characters of cryptographically random secret, shared across instances |
| ENQUIRY_ALLOWED_ORIGINS | Comma-separated exact HTTPS origins, no paths/trailing slash; explicitly approve any preview origin |

Recipient is fixed to info@commochain.ltd. User email is reply_to, never the recipient or sender. Configure only through the approved secret manager/Vercel settings, not chat or committed files. The API's availability response checks configuration syntax, not provider health.

## Protections and delivery semantics

- Client and server validate the same fields; optional organisation is sent as an empty string. Body limited to 8192 actual UTF-8 bytes; message 10–1500 characters, name 100, email 254, organisation 160.
- JSON-only POST, exact-origin allowlist, honeypot, explicit consent, no attachments and no arbitrary extra fields. Origin checking is not authentication and is not sufficient by itself to stop bots.
- Atomic rate guard: five attempts per ten-minute window per HMAC of Vercel's trusted client header. Missing header shares a strict anonymous bucket. Unavailable protection fails closed; no per-instance in-memory production limiter.
- Each request carries eventId plus nonce. A 30-second atomic pending lease prevents concurrent calls. The provider receives a stable idempotency key. Accepted replays do not call the provider again; changed data under the same identity conflicts.
- Request creation time has a ten-minute validity window and 30-second future skew tolerance. Preserve identity when retrying an uncertain attempt; editing starts a new attempt. Do not reuse these rules for money, trading or ledger operations.
- Provider acceptance and persisted guard receipt are both required for HTTP 202. This means provider acceptance, NOT confirmed mailbox delivery. A timeout/error may leave acceptance uncertain; retries use the same identity. Resend's documented 24-hour idempotency window exceeds this application's accepted request-age window.
- The durable store holds HMAC client keys, event IDs, payload HMACs and state/lease metadata, not raw messages, email addresses or IP addresses. These are still pseudonymous operational records, not a claim of anonymous data.
- Event tombstones deliberately have no expiry to prevent identity reuse. Review capacity, retention, backup/eviction policy and secret rotation before enabling; losing/deleting keys or changing the HMAC secret affects replay protection. Do not substitute an evicting cache without an explicit redesign.
- Application code does not log request bodies or add message contents to analytics. Provider, platform and mailbox handling still needs an approved privacy/retention policy. UI provides purpose, recipient and data-contact information, not a claim of a completed legal privacy review.

## Enabling checklist (separate authorised task)

1. Approve provider/sender, durable storage, limits, cost, privacy/retention and authorised origins. Do not create paid resources or change DNS without approval.
2. Configure a preview environment only, with server-only secrets. Confirm required Redis commands and non-evicting durability with the selected service.
3. Run the mocked tests, then obtain permission for a controlled real enquiry to the approved mailbox. Check provider acceptance, actual receipt/reply handling and failure recovery separately.
4. Check duplicate/retry, provider timeout, guard failure and rate limits against the configured preview. No live provider/Redis integration was exercised in this task.
5. Obtain publication approval independently. Do not automatically enable production delivery or indexing when merging the marketing copy.

Automated tests use mocks only. No test email has been sent.
