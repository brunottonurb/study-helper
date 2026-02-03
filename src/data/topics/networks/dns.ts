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
      description: 'Root → TLD (.com, .org) → Authoritative → Local',
    },
    {
      title: 'Record Types',
      description: 'A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), NS (nameserver)',
    },
    {
      title: 'Resolution Process',
      description: 'Recursive query through DNS hierarchy until IP found',
    },
    {
      title: 'Caching',
      description: 'TTL (Time To Live) determines how long records are cached',
    },
  ],
  quizQuestions: [
    {
      question: 'What is the difference between an A record and a CNAME record?',
      answer: 'An A record maps a domain directly to an IPv4 address. A CNAME is an alias that points to another domain name, which must then be resolved to an IP.',
    },
    {
      question: 'What does TTL mean in DNS and why does it matter?',
      answer: 'TTL (Time To Live) specifies how long a DNS record can be cached. Lower TTL allows faster propagation of changes but increases DNS query load.',
    },
    {
      question: 'What is the role of root DNS servers?',
      answer: 'Root servers are the first step in resolving any domain. They don\'t know the final IP but direct queries to the appropriate TLD server (.com, .org, etc.).',
    },
    {
      question: 'What is an MX record used for?',
      answer: 'MX (Mail Exchange) records specify the mail servers responsible for receiving email for a domain, along with priority values for failover.',
    },
  ],
  codeExamples: [
    {
      title: 'DNS Resolution Example',
      language: 'text',
      code: `Query: www.example.com → ?

1. Browser cache → Not found
2. OS cache → Not found  
3. Local DNS resolver (ISP)
   ↓
4. Root DNS Server
   "Ask .com TLD server at 192.5.6.30"
   ↓
5. .com TLD Server
   "Ask example.com NS at 198.51.100.1"
   ↓
6. Authoritative DNS for example.com
   "www.example.com = 93.184.216.34"

Response cached with TTL=3600 (1 hour)

Common DNS records:
example.com.    A       93.184.216.34
example.com.    MX  10  mail.example.com.
www             CNAME   example.com.`,
      explanation: 'DNS is essential infrastructure that makes the internet usable',
    },
  ],
};
