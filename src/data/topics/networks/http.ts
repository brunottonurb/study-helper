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
      description: 'GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS',
    },
    {
      title: 'Status Codes',
      description: '2xx success, 3xx redirect, 4xx client error, 5xx server error',
    },
    {
      title: 'Headers',
      description: 'Content-Type, Authorization, Cache-Control, Cookie',
    },
    {
      title: 'HTTPS',
      description: 'HTTP over TLS for encrypted, authenticated communication',
    },
  ],
  quizQuestions: [
    {
      question: 'What is the difference between PUT and PATCH?',
      answer: 'PUT replaces the entire resource with the request body (idempotent). PATCH applies partial modifications to a resource.',
    },
    {
      question: 'What does HTTP status code 401 vs 403 mean?',
      answer: '401 Unauthorized means authentication is required (or failed). 403 Forbidden means the server understood the request but refuses to authorize it (authenticated but not permitted).',
    },
    {
      question: 'What makes HTTP a stateless protocol?',
      answer: 'Each HTTP request is independent—the server doesn\'t retain information between requests. State must be maintained through cookies, tokens, or session IDs.',
    },
    {
      question: 'What is the purpose of the OPTIONS method?',
      answer: 'OPTIONS describes the communication options for the target resource. It\'s used in CORS preflight requests to check which methods and headers are allowed.',
    },
  ],
  codeExamples: [
    {
      title: 'HTTP Request/Response',
      language: 'text',
      code: `Request:
GET /api/users/123 HTTP/1.1
Host: example.com
Accept: application/json
Authorization: Bearer eyJhbGc...

Response:
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: max-age=3600

{"id": 123, "name": "John"}

Common Status Codes:
200 OK              - Success
201 Created         - Resource created
301 Moved           - Permanent redirect
400 Bad Request     - Invalid request
401 Unauthorized    - Auth required
403 Forbidden       - Not allowed
404 Not Found       - Resource missing
500 Server Error    - Server failed`,
      explanation: 'HTTP is stateless; each request is independent',
    },
  ],
};
