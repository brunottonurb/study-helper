import { Topic } from '@/types';

export const osiModel: Topic = {
  id: 'osi-model',
  title: 'OSI Model',
  description: 'Seven-layer conceptual model for network communication',
  category: 'networks',
  confidence: 'intermediate',
  keyPoints: [
    {
      title: 'Physical Layer (1)',
      description: 'Bits over physical medium (cables, signals)',
    },
    {
      title: 'Data Link Layer (2)',
      description: 'Frames, MAC addresses, error detection (Ethernet)',
    },
    {
      title: 'Network Layer (3)',
      description: 'Packets, IP addresses, routing',
    },
    {
      title: 'Transport Layer (4)',
      description: 'Segments, ports, TCP/UDP',
    },
    {
      title: 'Application Layer (7)',
      description: 'HTTP, FTP, SMTP, DNS protocols',
    },
  ],
  quizQuestions: [
    {
      question: 'At which OSI layer does a router operate?',
      answer: 'Layer 3 (Network layer). Routers use IP addresses to forward packets between different networks.',
    },
    {
      question: 'What is the difference between a MAC address and an IP address?',
      answer: 'MAC address (Layer 2) is a hardware identifier burned into the network card, used for local network communication. IP address (Layer 3) is a logical address used for routing across networks.',
    },
    {
      question: 'What happens to data as it moves down the OSI layers?',
      answer: 'Each layer adds its own header (encapsulation): Application data → TCP segment → IP packet → Ethernet frame → physical bits. The reverse happens when receiving.',
    },
    {
      question: 'At which layer does a switch operate vs a hub?',
      answer: 'A switch operates at Layer 2 (Data Link), using MAC addresses to forward frames. A hub operates at Layer 1 (Physical), simply repeating signals to all ports.',
    },
  ],
  codeExamples: [
    {
      title: 'OSI vs TCP/IP Model',
      language: 'text',
      code: `OSI Model          TCP/IP Model      Examples
─────────────────────────────────────────────────
7. Application  ┐
6. Presentation ├─  Application     HTTP, FTP, DNS
5. Session      ┘

4. Transport    ──  Transport       TCP, UDP

3. Network      ──  Internet        IP, ICMP, ARP

2. Data Link    ┐
1. Physical     ┴─  Network Access  Ethernet, WiFi

Data encapsulation:
[HTTP Data] → [TCP Header][Data] → [IP Header][Segment]
            → [Ethernet Header][Packet][Trailer]`,
      explanation: 'Each layer adds its header as data moves down the stack',
    },
  ],
};
