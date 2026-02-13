import { Topic } from '@/types';

export const http: Topic = {
  id: 'http',
  title: 'HTTP Protocol',
  description: 'Application layer protocol for web communication',
  category: 'networks',
  confidence: 'intermediate',
  keyPoints: [
    {
      title: 'Request Methods',
      description: 'HTTP methods define the **action** to perform on a resource. Key semantic properties: **safe** (no side effects), **idempotent** (repeated calls produce same result):\n\n- **GET**: retrieve a resource. Safe + idempotent. No body. Cacheable.\n- **POST**: create a resource or trigger an action. **Not** idempotent (each call may create a new resource).\n- **PUT**: replace an entire resource. Idempotent (sending same PUT twice = same result). Requires full representation.\n- **PATCH**: partially modify a resource. **Not** necessarily idempotent (depends on implementation).\n- **DELETE**: remove a resource. Idempotent (deleting twice = same result: resource gone).\n- **HEAD**: like GET but returns only headers (no body). Used to check if resource exists or get metadata.\n- **OPTIONS**: describes allowed methods/headers. Used in **CORS preflight** requests.\n- **CONNECT**: establish a tunnel (used for HTTPS through proxies).',
    },
    {
      title: 'Status Codes',
      description: 'Three-digit codes indicating the result of the request:\n\n- **1xx Informational**: `100 Continue` (proceed with body), `101 Switching Protocols` (WebSocket upgrade)\n- **2xx Success**: `200 OK`, `201 Created` (new resource + Location header), `204 No Content` (success, no body — common for DELETE), `206 Partial Content` (range requests)\n- **3xx Redirection**: `301 Moved Permanently` (update bookmarks, SEO redirect), `302 Found` (temporary redirect), `304 Not Modified` (conditional GET — use cached version), `307/308` (like 302/301 but **preserves method**)\n- **4xx Client Error**: `400 Bad Request` (malformed), `401 Unauthorized` (unauthenticated — misleading name), `403 Forbidden` (authenticated but not authorized), `404 Not Found`, `405 Method Not Allowed`, `409 Conflict`, `422 Unprocessable Entity` (validation error), `429 Too Many Requests` (rate limiting)\n- **5xx Server Error**: `500 Internal Error`, `502 Bad Gateway` (upstream failed), `503 Service Unavailable` (overloaded/maintenance), `504 Gateway Timeout`',
    },
    {
      title: 'Headers',
      description: 'HTTP headers carry metadata about the request/response:\n\n- **Content-Type**: MIME type of the body (`application/json`, `text/html`, `multipart/form-data`)\n- **Authorization**: credentials (`Bearer <token>`, `Basic <base64>`)\n- **Cache-Control**: caching directives (`max-age=3600`, `no-cache`, `no-store`, `public`, `private`, `must-revalidate`)\n- **ETag / If-None-Match**: conditional requests — server returns `304 Not Modified` if ETag matches (bandwidth saving)\n- **Cookie / Set-Cookie**: stateful sessions. `Set-Cookie: session=abc; HttpOnly; Secure; SameSite=Strict`\n- **CORS headers**: `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`\n- **Content-Encoding**: compression (`gzip`, `br` for Brotli)\n- **Accept**: content negotiation — client tells server what formats it accepts\n- **X-Request-ID**: trace requests across microservices',
    },
    {
      title: 'HTTPS & TLS',
      description: 'HTTPS = HTTP over **TLS** (Transport Layer Security), providing:\n\n- **Encryption**: data is encrypted in transit — prevents eavesdropping (even on public WiFi)\n- **Authentication**: the server proves its identity via a **certificate** signed by a trusted **Certificate Authority** (CA). The browser verifies the chain of trust.\n- **Integrity**: data cannot be tampered with in transit (detected via MAC).\n\n**TLS Handshake** (TLS 1.3, simplified):\n1. Client sends **ClientHello** (supported cipher suites, random)\n2. Server sends **ServerHello** (chosen cipher, certificate, key share)\n3. Client verifies certificate, both derive **session keys**\n4. Encrypted communication begins (1-RTT in TLS 1.3, 0-RTT for resumption)\n\n**Let\'s Encrypt**: free, automated CA. Use **certbot** for automatic certificate renewal. Certificates expire every 90 days. **HSTS** header forces browsers to always use HTTPS.',
    },
    {
      title: 'HTTP/2 and HTTP/3',
      description: 'Evolution of the HTTP protocol for better performance:\n\n**HTTP/1.1** (1997): text-based, one request per TCP connection at a time. Workarounds: connection keep-alive, domain sharding, sprite sheets, bundling.\n\n**HTTP/2** (2015):\n- **Multiplexing**: multiple requests/responses over a **single TCP connection** simultaneously (no head-of-line blocking at HTTP level)\n- **Binary protocol**: more efficient parsing than text\n- **Header compression** (HPACK): headers are compressed and deduplicated\n- **Server push**: server can proactively send resources the client will need\n- **Stream prioritization**: important resources first\n\n**HTTP/3** (2022):\n- Built on **QUIC** (UDP-based) instead of TCP\n- Eliminates **TCP head-of-line blocking**: lost packets only affect their stream, not all streams\n- **0-RTT connection** establishment (vs 1-3 RTTs for TCP+TLS)\n- Built-in encryption (TLS 1.3 integrated into QUIC)\n- Better performance on unreliable networks (mobile, WiFi)',
    },
    {
      title: 'REST & API Design',
      description: 'REST (Representational State Transfer) is an **architectural style** for HTTP APIs:\n\n- **Resources**: identified by URIs (`/users/123`, `/posts/456/comments`). Use **nouns**, not verbs.\n- **Methods as verbs**: `GET /users` (list), `POST /users` (create), `GET /users/123` (read), `PUT /users/123` (replace), `DELETE /users/123` (delete)\n- **Stateless**: each request contains all needed information (auth token, etc.). No server-side session.\n- **Status codes**: use appropriate codes (`201` for created with `Location` header, `204` for successful delete, `422` for validation errors)\n- **Pagination**: `?page=2&limit=20` or cursor-based (`?after=xyz`). Include `Link` headers for next/prev.\n- **Versioning**: URL path (`/v1/users`), header (`Accept: application/vnd.api+json;version=1`), or query param\n- **HATEOAS**: responses include links to related actions (rarely implemented in practice)\n\nAlternatives: **GraphQL** (client specifies exactly what data it needs), **gRPC** (binary, Protocol Buffers, bidirectional streaming).',
    },
  ],
  quizQuestions: [
    {
      question: 'What is the difference between PUT and PATCH?',
      answer: 'PUT replaces the ENTIRE resource with the request body — you must send all fields. It\'s idempotent (repeating = same result). PATCH applies PARTIAL modifications — you send only the fields to change. PATCH is not necessarily idempotent (depends on the patch format being used).',
    },
    {
      question: 'What does HTTP status code 401 vs 403 mean?',
      answer: '401 Unauthorized actually means "unauthenticated" — the request lacks valid credentials (no token, expired token). 403 Forbidden means the server knows who you are (authenticated) but you don\'t have permission for that resource. 401 = "who are you?", 403 = "I know you, but no."',
    },
    {
      question: 'What makes HTTP a stateless protocol?',
      answer: 'Each HTTP request is independent — the server doesn\'t inherently remember previous requests. There\'s no built-in session. State must be maintained explicitly through cookies, auth tokens (JWT), session IDs, or URL parameters. This simplifies server design and enables horizontal scaling.',
    },
    {
      question: 'What is the purpose of the OPTIONS method?',
      answer: 'OPTIONS describes the communication capabilities for a resource (which methods, headers are allowed). It\'s primarily used in CORS preflight requests — browsers automatically send OPTIONS before cross-origin requests with custom headers or non-simple methods to check if the server allows them.',
    },
    {
      question: 'What is the difference between HTTP/1.1 and HTTP/2?',
      answer: 'HTTP/2 adds multiplexing (multiple requests over one TCP connection simultaneously), binary framing (efficient parsing), header compression (HPACK), and server push. HTTP/1.1 is text-based and processes one request at a time per connection, requiring workarounds like domain sharding.',
    },
    {
      question: 'How does HTTPS protect data in transit?',
      answer: 'HTTPS uses TLS to provide: 1) Encryption — data is encrypted so eavesdroppers can\'t read it, 2) Authentication — server proves identity via a CA-signed certificate, 3) Integrity — data can\'t be tampered with (MAC verification). The TLS handshake negotiates cipher suites and derives session keys.',
    },
    {
      question: 'What is the ETag header used for?',
      answer: 'ETag is a hash/version identifier for a resource. On subsequent requests, the client sends If-None-Match: <etag>. If the resource hasn\'t changed, the server returns 304 Not Modified (no body), saving bandwidth. This is "conditional GET" — a form of cache validation.',
    },
    {
      question: 'What is CORS and why does it exist?',
      answer: 'Cross-Origin Resource Sharing is a browser security mechanism. By default, scripts can only make requests to their own origin (Same-Origin Policy). CORS headers (Access-Control-Allow-Origin, etc.) let servers explicitly allow cross-origin requests. The browser enforces this — it\'s not a server-side security measure.',
    },
    {
      question: 'What is HTTP/3 and how does it differ from HTTP/2?',
      answer: 'HTTP/3 uses QUIC (a UDP-based protocol) instead of TCP. This eliminates TCP head-of-line blocking where a single lost packet stalls all streams. QUIC has built-in TLS 1.3, 0-RTT connection establishment, and better performance on unreliable networks. Connection migration is also possible (switching WiFi to cellular).',
    },
    {
      question: 'What is the difference between 301 and 302 redirects?',
      answer: '301 Moved Permanently tells clients and search engines the resource has permanently moved — update bookmarks and SEO juice transfers. 302 Found means temporary redirect — keep using the original URL. 307 and 308 are the strict versions that preserve the HTTP method (301/302 may change POST to GET).',
    },
    {
      question: 'What is the Cache-Control "no-cache" vs "no-store" directive?',
      answer: 'no-cache does NOT mean "don\'t cache" — it means the cache must revalidate with the server before using a cached response (conditional request with ETag/Last-Modified). no-store means genuinely don\'t cache at all — don\'t store the response anywhere. Use no-store for sensitive data.',
    },
    {
      question: 'Why is idempotency important for API design?',
      answer: 'Idempotent operations (GET, PUT, DELETE) produce the same result when repeated. This is critical for reliability: if a network error occurs, you can safely retry without side effects. POST is not idempotent — retrying may create duplicate resources. Use idempotency keys (unique request IDs) for non-idempotent operations.',
    },
  ],
  codeExamples: [
    {
      title: 'HTTP Request/Response Anatomy',
      language: 'text',
      code: `══════ REQUEST ══════
POST /api/users HTTP/1.1          ← Method, Path, Version
Host: api.example.com             ← Required in HTTP/1.1
Content-Type: application/json    ← Body format
Authorization: Bearer eyJhbGc...  ← Authentication
Accept: application/json          ← Desired response format
Content-Length: 42                 ← Body size in bytes

{"name": "Alice", "email": "alice@example.com"}

══════ RESPONSE ══════
HTTP/1.1 201 Created              ← Version, Status Code, Reason
Content-Type: application/json
Location: /api/users/789          ← URI of new resource
Cache-Control: no-cache
Set-Cookie: session=abc; HttpOnly; Secure; SameSite=Strict
X-Request-ID: req-123-abc         ← Tracing ID

{"id": 789, "name": "Alice", "email": "alice@example.com"}

══════ STATUS CODE CHEAT SHEET ══════
200 OK              201 Created       204 No Content
301 Permanent       302 Temporary     304 Not Modified
400 Bad Request     401 Unauthenticated  403 Forbidden
404 Not Found       409 Conflict      422 Validation Error
429 Rate Limited    500 Server Error  503 Unavailable`,
      explanation: 'An HTTP message has a start line, headers, blank line, and optional body. The request specifies method and path. The response includes a status code. Headers convey metadata like content type, auth, caching, and cookies.',
    },
    {
      title: 'Caching Headers in Action',
      language: 'text',
      code: `═══ Strategy 1: Immutable assets (JS/CSS with hash in filename) ═══

Request:  GET /static/app.a1b2c3.js
Response: Cache-Control: public, max-age=31536000, immutable
          ETag: "a1b2c3d4e5"

→ Cached for 1 year. "immutable" tells browser: don't even revalidate.
  File hash in URL changes when content changes → new URL = cache miss.

═══ Strategy 2: API responses (may change) ═══

Request:  GET /api/users/123
Response: Cache-Control: private, max-age=60
          ETag: "user-123-v5"

→ Cached for 60s (private = only in browser, not CDN/proxy).
  After 60s, browser sends conditional request:

Request:  GET /api/users/123
          If-None-Match: "user-123-v5"
Response: 304 Not Modified (no body! saves bandwidth)
          ETag: "user-123-v5"

═══ Strategy 3: Sensitive data ═══

Request:  GET /api/account/balance
Response: Cache-Control: no-store
          Pragma: no-cache

→ Never cached anywhere. Used for financial data, PII, etc.

═══ Strategy 4: HTML pages (always revalidate) ═══

Request:  GET /about
Response: Cache-Control: no-cache
          ETag: "page-about-v3"

→ "no-cache" = CAN be cached, but MUST revalidate every time.
  Browser stores it but always checks with server first.`,
      explanation: 'Different caching strategies for different content types. Immutable assets use long max-age + filename hashing. API data uses short max-age + ETag validation. Sensitive data uses no-store. HTML uses no-cache for always-fresh content with validation.',
    },
    {
      title: 'CORS Preflight Flow',
      language: 'text',
      code: `Frontend: https://app.example.com
Backend:  https://api.example.com

═══ Simple request (no preflight): GET with standard headers ═══
Request:  GET /api/data
          Origin: https://app.example.com

Response: Access-Control-Allow-Origin: https://app.example.com
          → Browser allows the response to be read

═══ Preflight required: POST with JSON body ═══

Step 1: Browser automatically sends OPTIONS preflight
Request:  OPTIONS /api/users
          Origin: https://app.example.com
          Access-Control-Request-Method: POST
          Access-Control-Request-Headers: Content-Type, Authorization

Response: Access-Control-Allow-Origin: https://app.example.com
          Access-Control-Allow-Methods: GET, POST, PUT, DELETE
          Access-Control-Allow-Headers: Content-Type, Authorization
          Access-Control-Max-Age: 86400   ← Cache preflight for 24h

Step 2: Actual request (only if preflight succeeds)
Request:  POST /api/users
          Origin: https://app.example.com
          Content-Type: application/json
          Authorization: Bearer eyJhbGc...

          {"name": "Alice"}

Response: Access-Control-Allow-Origin: https://app.example.com
          {"id": 1, "name": "Alice"}

═══ Common CORS errors ═══
• Missing Access-Control-Allow-Origin header → blocked
• Credentials (cookies) require: 
    Access-Control-Allow-Credentials: true
    Access-Control-Allow-Origin: <specific origin>  (NOT *)`,
      explanation: 'CORS is enforced by the browser, not the server. "Simple" requests (GET/POST with standard headers) skip preflight. Complex requests (custom headers, PUT/DELETE, JSON content-type) trigger an OPTIONS preflight to check permissions before the actual request.',
    },
  ],
};
