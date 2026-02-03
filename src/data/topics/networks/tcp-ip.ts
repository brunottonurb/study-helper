import { Topic } from '@/types';

export const tcpIp: Topic = {
  id: 'tcp-ip',
  title: 'TCP/IP Protocol',
  description: 'Core protocols for reliable internet communication',
  category: 'networks',
  confidence: 'intermediate',
  keyPoints: [
    {
      title: 'IP Addressing',
      description: 'IPv4 (32-bit), IPv6 (128-bit), subnetting with CIDR notation',
    },
    {
      title: 'TCP Three-Way Handshake',
      description: 'SYN → SYN-ACK → ACK to establish reliable connection',
    },
    {
      title: 'TCP vs UDP',
      description: 'TCP: reliable, ordered, connection-oriented; UDP: fast, unreliable, connectionless',
    },
    {
      title: 'Ports',
      description: 'Well-known (0-1023), registered (1024-49151), dynamic (49152-65535)',
    },
  ],
  quizQuestions: [
    {
      question: 'Why does TCP use a three-way handshake?',
      answer: 'To synchronize sequence numbers between client and server, confirm both sides can send and receive, and establish a reliable connection before data transfer.',
    },
    {
      question: 'When would you choose UDP over TCP?',
      answer: 'When speed matters more than reliability: video streaming, online gaming, VoIP, DNS queries. UDP has no connection setup, no acknowledgments, and lower latency.',
    },
    {
      question: 'What does CIDR notation like /24 mean?',
      answer: 'CIDR notation indicates the number of bits in the network prefix. /24 means 24 bits for network (255.255.255.0 subnet mask), leaving 8 bits for 256 host addresses.',
    },
    {
      question: 'How does TCP ensure reliable delivery?',
      answer: 'Through sequence numbers, acknowledgments, checksums, retransmission of lost packets, and flow control (sliding window). Each byte is numbered and acknowledged.',
    },
  ],
  codeExamples: [
    {
      title: 'TCP Connection Lifecycle',
      language: 'text',
      code: `Connection Establishment (3-way handshake):
Client              Server
  |------- SYN ------->|    seq=x
  |<---- SYN-ACK ------|    seq=y, ack=x+1
  |------- ACK ------->|    ack=y+1
  [Connection Established]

Data Transfer:
  |------- DATA ------>|    seq=x+1
  |<------ ACK --------|    ack=x+1+len
  
Connection Termination (4-way):
  |------- FIN ------->|
  |<------ ACK --------|
  |<------ FIN --------|
  |------- ACK ------->|
  [Connection Closed]`,
      explanation: 'TCP ensures reliable delivery through acknowledgments and retransmission',
    },
  ],
};
