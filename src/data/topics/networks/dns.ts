import { Topic } from '@/types';

export const dns: Topic = {
  id: 'dns',
  title: 'DNS (Domain Name System)',
  description: 'Translates domain names to IP addresses',
  category: 'networks',
  confidence: 'intermediate',
  keyPoints: [
    {
      title: 'Hierarchical Structure',
      description: 'DNS uses a **hierarchical, distributed** database organized as an inverted tree:\n\n- **Root zone** (`.`): 13 logical root server clusters (A through M), operated by different organizations. Anycast-distributed globally for redundancy.\n- **TLD (Top-Level Domain)**: `.com`, `.org`, `.net` (generic); `.uk`, `.br` (country-code); `.dev`, `.io` (newer). Managed by registries (e.g., Verisign for `.com`).\n- **Second-level domain**: `example` in `example.com`. You register this with a **registrar** (Namecheap, Google Domains).\n- **Subdomain**: `www`, `api`, `mail` — unlimited depth (`a.b.c.example.com`). Each level is a **zone** that can delegate authority.\n- **FQDN** (Fully Qualified Domain Name): `www.example.com.` — the trailing dot represents the root zone.',
    },
    {
      title: 'Record Types',
      description: 'DNS records map names to various types of data:\n\n- **A**: maps domain → **IPv4** address (`93.184.216.34`)\n- **AAAA**: maps domain → **IPv6** address (`2606:2800:220:1:...`)\n- **CNAME**: **alias** pointing to another domain. Cannot coexist with other records at the same name. `www.example.com CNAME example.com`\n- **MX**: **mail exchange** — specifies mail servers + priority (lower = preferred). `example.com MX 10 mail.example.com`\n- **NS**: **nameserver** — delegates a zone to specific DNS servers\n- **TXT**: arbitrary text. Used for **SPF** (email sender verification), **DKIM** (email signing), **domain verification** (Google, Let\'s Encrypt)\n- **SRV**: specifies host/port for services (used by SIP, XMPP)\n- **SOA**: **Start of Authority** — contains zone serial number, refresh intervals, TTLs. One per zone.\n- **PTR**: **reverse DNS** — maps IP → domain (for `nslookup` on IPs)',
    },
    {
      title: 'Resolution Process',
      description: 'DNS resolution is a **recursive/iterative** process to translate a domain to an IP:\n\n1. **Browser cache**: check if the domain was recently resolved\n2. **OS cache**: check the system\'s DNS resolver cache (`/etc/hosts` on Unix)\n3. **Recursive resolver** (your ISP, or `8.8.8.8`, `1.1.1.1`): if not cached, it queries the hierarchy **iteratively**:\n   - Asks a **root server** → gets referral to TLD server\n   - Asks **TLD server** (`.com`) → gets referral to authoritative NS\n   - Asks **authoritative nameserver** → gets the final answer (A record)\n4. Response is cached at each level with the record\'s **TTL**\n\n**Recursive vs Iterative**: the client makes a **recursive** query to its resolver ("give me the final answer"). The resolver then makes **iterative** queries up the hierarchy (each server refers it to the next). Most clients never talk to root/TLD servers directly.',
    },
    {
      title: 'Caching & TTL',
      description: '**TTL (Time To Live)** controls how long a record is cached (in seconds):\n\n- **High TTL** (e.g., 86400 = 24h): fewer queries, less load, but **slow propagation** of changes. Good for stable records.\n- **Low TTL** (e.g., 60 = 1 min): faster propagation of changes. Good before migrations — lower TTL days before, change record, then raise TTL.\n- **Negative caching**: NXDOMAIN responses (domain doesn\'t exist) are also cached, based on the SOA record\'s minimum TTL.\n- **DNS propagation**: isn\'t really "propagation" — it\'s old caches **expiring**. Actual time is bounded by the longest TTL in the chain.\n- Caching happens at multiple layers: browser (minutes), OS, recursive resolver, ISP. Each respects the TTL independently.',
    },
    {
      title: 'DNS Security',
      description: 'DNS was designed without security. Modern extensions address this:\n\n- **DNS Spoofing / Cache Poisoning**: attacker injects false records into a resolver\'s cache, redirecting traffic to malicious IPs (e.g., Kaminsky attack).\n- **DNSSEC** (DNS Security Extensions): adds **digital signatures** to DNS records. The resolver can verify that the response came from the authoritative server and wasn\'t tampered with. Uses a chain of trust from root → TLD → domain.\n- **DoH** (DNS over HTTPS): encrypts DNS queries inside HTTPS (port 443). Prevents ISP/network snooping on which domains you visit. Used by browsers (Firefox, Chrome).\n- **DoT** (DNS over TLS): encrypts DNS queries using TLS (port 853). Similar to DoH but at the transport level — used by OS resolvers.\n- **DNS Rebinding**: attack where a malicious domain\'s DNS record changes from an external IP to `127.0.0.1`, making the browser access local services.',
    },
    {
      title: 'DNS in Practice',
      description: 'Practical DNS patterns for developers and ops:\n\n- **Round-robin DNS**: multiple A records for one domain → basic load distribution. No health checks. `example.com A 1.2.3.4` + `example.com A 5.6.7.8`\n- **GeoDNS**: return different IPs based on the client\'s geographic location — used by CDNs (CloudFlare, AWS Route 53)\n- **Failover DNS**: health-checked DNS that removes unhealthy IPs from responses\n- **ALIAS / ANAME records**: non-standard but common — like CNAME but works at the zone apex (root domain). Supported by Route 53, CloudFlare.\n- **Split-horizon DNS**: return different records for internal vs external queries (e.g., `api.company.com` resolves to private IP internally, public IP externally)\n- **Common tools**: `dig +short example.com`, `nslookup`, `host`, `whois`. Use `dig +trace` to see the full resolution path.',
    },
  ],
  quizQuestions: [
    {
      question: 'What is the difference between an A record and a CNAME record?',
      answer: 'An A record maps a domain directly to an IPv4 address. A CNAME is an alias that points to another domain name, which must then be resolved to an IP (extra lookup step). CNAME cannot coexist with other record types at the same name and cannot be used at the zone apex (root domain).',
    },
    {
      question: 'What does TTL mean in DNS and why does it matter?',
      answer: 'TTL (Time To Live) specifies how many seconds a DNS record can be cached by resolvers. Lower TTL allows faster propagation of changes (useful before migrations) but increases query load. Higher TTL reduces load but means changes take longer to propagate across the internet.',
    },
    {
      question: 'What is the role of root DNS servers?',
      answer: 'Root servers are the starting point for resolving any domain. They don\'t know the final IP address but direct queries to the appropriate TLD server (.com, .org, .io, etc.). There are 13 logical root server clusters (A through M), distributed globally using anycast routing.',
    },
    {
      question: 'What is an MX record used for?',
      answer: 'MX (Mail Exchange) records specify which mail servers receive email for a domain, along with priority values. Lower priority numbers are preferred. Example: MX 10 mail1.example.com and MX 20 mail2.example.com — mail goes to mail1 first, falls back to mail2.',
    },
    {
      question: 'What is the difference between recursive and iterative DNS queries?',
      answer: 'A recursive query asks the resolver to provide the final answer (your computer → ISP resolver). An iterative query asks "who should I ask next?" and gets referrals (resolver → root → TLD → authoritative). Clients make recursive queries; resolvers make iterative queries up the hierarchy.',
    },
    {
      question: 'What is DNS cache poisoning and how does DNSSEC prevent it?',
      answer: 'Cache poisoning is an attack where false DNS records are injected into a resolver\'s cache, redirecting traffic to malicious IPs. DNSSEC prevents this by adding digital signatures (RRSIG records) to DNS responses. The resolver verifies the signature chain from root → TLD → domain, ensuring authenticity and integrity.',
    },
    {
      question: 'What is DNS over HTTPS (DoH) and why is it used?',
      answer: 'DoH encrypts DNS queries inside HTTPS connections (port 443), preventing ISPs, network operators, and attackers from seeing which domains you\'re resolving. Without DoH, DNS queries are sent in plaintext, allowing surveillance and manipulation. Major browsers like Firefox and Chrome support DoH.',
    },
    {
      question: 'Why can\'t you use a CNAME at the zone apex (root domain)?',
      answer: 'The DNS specification says CNAME records cannot coexist with other record types. The zone apex needs SOA and NS records, which would conflict. Cloud providers offer ALIAS/ANAME as a workaround — they resolve the CNAME server-side and return an A record to the client.',
    },
    {
      question: 'What is a TXT record commonly used for?',
      answer: 'TXT records store arbitrary text and are commonly used for: SPF (email sender policy — which IPs can send email for the domain), DKIM (email authentication signatures), domain verification (proving ownership to Google, Let\'s Encrypt, etc.), and DMARC (email authentication policy).',
    },
    {
      question: 'What is split-horizon DNS?',
      answer: 'Split-horizon DNS returns different records for the same domain depending on who\'s asking. Internal network queries get private IPs (e.g., 10.0.1.5), while external queries get public IPs. This allows using the same domain name internally and externally without exposing internal infrastructure.',
    },
    {
      question: 'What is the negative caching in DNS?',
      answer: 'When a domain doesn\'t exist (NXDOMAIN response), resolvers cache this negative result too, based on the SOA record\'s minimum TTL field. This prevents repeated lookups for non-existent domains, reducing load. But it also means newly created domains may take time to become visible.',
    },
    {
      question: 'How does round-robin DNS work for load distribution?',
      answer: 'You create multiple A records for the same domain with different IPs. DNS returns all records, but rotates the order for each query. Clients typically use the first IP, distributing traffic across servers. It\'s basic and has no health checking — a dead server still gets traffic until its record is removed.',
    },
  ],
  codeExamples: [
    {
      title: 'DNS Resolution Process',
      language: 'text',
      code: `Query: www.example.com → ?

1. Browser cache → Not found
2. OS cache (/etc/hosts, stub resolver) → Not found
3. Recursive resolver (ISP / 8.8.8.8 / 1.1.1.1)
   ↓ (iterative queries from here)
4. Root DNS Server (one of 13 clusters)
   "I don't know, but .com is managed by 192.5.6.30"
   ↓
5. .com TLD Server (Verisign)
   "I don't know, but example.com's NS is ns1.example.com at 198.51.100.1"
   ↓
6. Authoritative DNS for example.com
   "www.example.com = 93.184.216.34 (TTL: 3600)"

Response travels back through resolver → OS cache → browser.
Cached for 3600 seconds (1 hour) at each layer.

┌─────────────────────────────────────────────┐
│ dig www.example.com +short                  │
│ 93.184.216.34                               │
│                                             │
│ dig www.example.com +trace                  │
│ .                         NS  a.root-servers│
│ com.                      NS  a.gtld-servers│
│ example.com.              NS  ns1.example.  │
│ www.example.com.   3600   A   93.184.216.34 │
└─────────────────────────────────────────────┘`,
      explanation: 'The recursive resolver does the heavy lifting — your browser makes one recursive query and gets the final answer. The resolver caches the response so subsequent queries skip the hierarchy. Using "dig +trace" shows each step of the iterative process.',
    },
    {
      title: 'Common DNS Record Configuration',
      language: 'text',
      code: `; Zone file for example.com
$TTL 3600  ; Default TTL: 1 hour

; SOA Record — Start of Authority
example.com.  SOA  ns1.example.com. admin.example.com. (
              2024010101 ; Serial (YYYYMMDDNN)
              3600       ; Refresh (1 hour)
              900        ; Retry (15 min)
              604800     ; Expire (1 week)
              86400 )    ; Negative cache TTL (1 day)

; Nameservers
example.com.      NS    ns1.example.com.
example.com.      NS    ns2.example.com.

; A Records (IPv4)
example.com.      A     93.184.216.34
ns1.example.com.  A     198.51.100.1
ns2.example.com.  A     198.51.100.2

; AAAA Record (IPv6)
example.com.      AAAA  2606:2800:220:1:248:1893:25c8:1946

; CNAME (alias)
www               CNAME example.com.
docs              CNAME docs-prod.netlify.app.

; Mail (MX) — lower priority = preferred
example.com.      MX    10  mail1.example.com.
example.com.      MX    20  mail2.example.com.

; TXT — SPF, DKIM, verification
example.com.      TXT   "v=spf1 include:_spf.google.com ~all"
example.com.      TXT   "google-site-verification=abc123..."
_dmarc.example.   TXT   "v=DMARC1; p=reject; rua=mailto:dmarc@example.com"`,
      explanation: 'A DNS zone file defines all records for a domain. The SOA record contains zone metadata. MX priority determines mail server preference. SPF/DKIM/DMARC TXT records secure email delivery. CNAME aliases point to other domains.',
    },
    {
      title: 'DNS Debugging with dig',
      language: 'bash',
      code: `# Basic lookup — returns just the IP
dig +short example.com
# 93.184.216.34

# Full query with all sections
dig example.com
# ;; ANSWER SECTION:
# example.com.  3600  IN  A  93.184.216.34
# ;; Query time: 23 msec

# Trace full resolution path (root → TLD → auth)
dig +trace example.com

# Query specific record types
dig example.com MX        # Mail servers
dig example.com TXT       # SPF, DKIM, verification
dig example.com NS        # Nameservers
dig example.com AAAA      # IPv6 address

# Query a specific DNS server (e.g., Google's)
dig @8.8.8.8 example.com

# Reverse DNS lookup (IP → domain)
dig -x 93.184.216.34

# Check if DNSSEC is enabled
dig +dnssec example.com

# Check propagation across multiple resolvers
dig @8.8.8.8 example.com +short   # Google
dig @1.1.1.1 example.com +short   # Cloudflare
dig @9.9.9.9 example.com +short   # Quad9

# Useful: see ALL records for a domain
dig example.com ANY  # (may not work — some servers block ANY)`,
      explanation: 'dig is the standard tool for DNS debugging. Use +short for quick lookups, +trace to see the full resolution chain, and @ to query specific servers. Compare results across resolvers to check propagation status.',
    },
  ],
};
