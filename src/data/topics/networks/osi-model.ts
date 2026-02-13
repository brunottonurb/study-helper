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
      description: 'The **Physical Layer** transmits raw **bits** over a physical medium:\n\n- **Media types**: copper cables (Ethernet Cat5e/Cat6 — electrical signals), fiber optic (light pulses), wireless (radio waves — WiFi, Bluetooth, cellular)\n- **Signaling**: encoding bits as voltage levels, light pulses, or radio frequencies. Defines bit timing, modulation, and signal strength.\n- **Hardware**: hubs, repeaters, cables, connectors (RJ-45, SFP), network interface cards (NICs)\n- **Key specs**: bandwidth (capacity), throughput (actual data rate), latency, bit error rate\n- **Topologies**: bus, star, ring, mesh — physical layout of connections\n- A **hub** operates here — it repeats signals to all ports (no intelligence, no addressing)',
    },
    {
      title: 'Data Link Layer (2)',
      description: 'The **Data Link Layer** provides **node-to-node** communication within a local network, framing bits into **frames**:\n\n- **MAC addresses**: 48-bit hardware addresses (e.g., `AA:BB:CC:DD:EE:FF`), burned into the NIC. Unique per device on a local network.\n- **Framing**: wraps Network layer packets in headers (source/dest MAC) and trailers (FCS checksum for error detection)\n- **Ethernet** (IEEE 802.3): dominant LAN protocol. Uses CSMA/CD for collision detection.\n- **Switches** operate here — they learn MAC addresses (MAC address table) and forward frames only to the correct port (unlike hubs). Much more efficient than hubs.\n- **ARP** (Address Resolution Protocol): resolves IP → MAC address. "Who has 192.168.1.1? Tell AA:BB:CC:DD:EE:FF"\n- **VLANs** (Virtual LANs): logically segment a physical network at Layer 2 (IEEE 802.1Q tagging)\n- **WiFi** (IEEE 802.11): wireless LAN protocols — uses CSMA/CA instead of CSMA/CD',
    },
    {
      title: 'Network Layer (3)',
      description: 'The **Network Layer** handles **end-to-end routing** between different networks, using **packets**:\n\n- **IP addresses**: logical addresses for routing. IPv4 (32-bit, e.g., `192.168.1.1`), IPv6 (128-bit, e.g., `2001:db8::1`)\n- **Routing**: determining the best path across networks. Routers use routing tables + protocols (OSPF, BGP, RIP) to forward packets hop by hop.\n- **Routers** operate here — they connect different networks and forward packets based on IP addresses\n- **Subnetting**: divide networks using CIDR notation. `192.168.1.0/24` = 256 addresses (`/24` = 24-bit network prefix, 8-bit host portion)\n- **NAT** (Network Address Translation): maps private IPs (10.x, 192.168.x) to a public IP. Allows many devices to share one public address.\n- **ICMP**: Internet Control Message Protocol — used by `ping` (reachability check) and `traceroute` (path discovery)\n- **IP is connectionless and unreliable** — no guarantees on delivery, ordering, or duplication. TCP (Layer 4) adds reliability.',
    },
    {
      title: 'Transport Layer (4)',
      description: 'The **Transport Layer** provides **end-to-end communication** between processes, using **segments** (TCP) or **datagrams** (UDP):\n\n- **Ports**: 16-bit numbers (0-65535) identifying specific applications. **Well-known**: 0-1023 (HTTP=80, HTTPS=443, SSH=22, DNS=53). **Ephemeral**: 49152-65535 (client-side, randomly assigned).\n- **TCP** (Transmission Control Protocol): **reliable, ordered, connection-oriented**. Three-way handshake, sequence numbers, acknowledgments, retransmission, flow control (sliding window), congestion control (slow start, AIMD).\n- **UDP** (User Datagram Protocol): **fast, unreliable, connectionless**. No handshake, no guarantees. Used for DNS, video streaming, gaming, VoIP — where speed > reliability.\n- **Socket**: an IP + port combination (`192.168.1.1:8080`). A **connection** is identified by the 4-tuple: (src IP, src port, dest IP, dest port).\n- **Multiplexing**: many conversations over one IP address using different port numbers.',
    },
    {
      title: 'Session, Presentation & Application (5-7)',
      description: 'The upper layers are often combined in practice (TCP/IP model merges them into "Application"):\n\n- **Session Layer (5)**: manages **sessions** (establishing, maintaining, terminating connections). In practice, session management is handled by application protocols (HTTP cookies, TLS session resumption). Also handles dialog control (half-duplex, full-duplex).\n- **Presentation Layer (6)**: data **translation and formatting** — encryption/decryption (TLS), compression, character encoding (ASCII ↔ Unicode), serialization (JSON, XML, Protocol Buffers). Ensures both ends interpret data the same way.\n- **Application Layer (7)**: user-facing protocols — **HTTP/HTTPS** (web), **SMTP/IMAP/POP3** (email), **FTP/SFTP** (file transfer), **SSH** (remote shell), **DNS** (name resolution), **DHCP** (automatic IP assignment), **WebSocket** (bidirectional communication).\n\nIn the real world, the TCP/IP model\'s 4 layers are more practically useful than OSI\'s 7. OSI is mainly a **teaching/reference model**.',
    },
    {
      title: 'Encapsulation & Data Flow',
      description: 'As data moves **down** the layers, each layer wraps it with its own **header** (and sometimes trailer) — this is **encapsulation**:\n\n- Application: **Data** (HTTP request body, email content, etc.)\n- Transport: **Segment** (TCP) or **Datagram** (UDP) = TCP/UDP header + data\n- Network: **Packet** = IP header + segment\n- Data Link: **Frame** = Ethernet header + packet + FCS trailer\n- Physical: **Bits** = electrical/optical/radio signals\n\n**Decapsulation** is the reverse — each layer strips its header when **receiving**. This layered approach means each layer only needs to understand its own protocols. Ethernet doesn\'t care if the packet contains TCP or UDP; TCP doesn\'t care if it\'s carrying HTTP or SSH.\n\n**PDU** (Protocol Data Unit): the name for data at each layer — helps keep terminology precise.',
    },
  ],
  quizQuestions: [
    {
      question: 'At which OSI layer does a router operate?',
      answer: 'Layer 3 (Network layer). Routers examine IP addresses in packet headers to determine the next hop and forward packets between different networks. They use routing tables populated by protocols like OSPF and BGP.',
    },
    {
      question: 'What is the difference between a MAC address and an IP address?',
      answer: 'MAC address (Layer 2) is a 48-bit hardware identifier burned into the NIC — unique on the local network, used for node-to-node communication. IP address (Layer 3) is a logical address used for routing across networks. MAC addresses don\'t change; IP addresses are assigned dynamically (DHCP) or statically.',
    },
    {
      question: 'What happens to data as it moves down the OSI layers?',
      answer: 'Each layer adds its own header (encapsulation): Application data → TCP segment (port info) → IP packet (IP addresses) → Ethernet frame (MAC addresses + error check trailer) → physical bits. The receiving end strips headers in reverse (decapsulation).',
    },
    {
      question: 'At which layer does a switch operate vs a hub?',
      answer: 'A switch operates at Layer 2 (Data Link), using MAC address tables to forward frames only to the correct port — efficient. A hub operates at Layer 1 (Physical), blindly repeating signals to ALL ports — inefficient. Switches are intelligent; hubs are not.',
    },
    {
      question: 'What is ARP and which layers does it involve?',
      answer: 'ARP (Address Resolution Protocol) translates IP addresses (Layer 3) to MAC addresses (Layer 2). When a device needs to send a packet to an IP on the local network, it broadcasts "Who has 192.168.1.1?" and the device with that IP replies with its MAC address. The result is cached in the ARP table.',
    },
    {
      question: 'Why is the OSI model considered a "reference model"?',
      answer: 'OSI was designed as an idealized conceptual framework for understanding networking, not as an implementation. The actual internet uses TCP/IP, which merges OSI layers 5-7 into "Application" and layers 1-2 into "Network Access." OSI\'s value is educational — it provides clear vocabulary and separation of concerns.',
    },
    {
      question: 'What is the difference between TCP segments and UDP datagrams?',
      answer: 'TCP segments contain sequence numbers, acknowledgment numbers, flags (SYN/ACK/FIN), window size, and checksums for reliable, ordered delivery. UDP datagrams have minimal headers (source port, dest port, length, checksum) — no ordering, no acknowledgment, no connection state. UDP trades reliability for speed.',
    },
    {
      question: 'What is NAT and why is it necessary?',
      answer: 'NAT (Network Address Translation) maps private IP addresses (10.x.x.x, 192.168.x.x) to a single public IP. It\'s necessary because IPv4 has only ~4.3 billion addresses (not enough for all devices). NAT lets an entire home/office network share one public IP. It also provides a basic layer of security by hiding internal network structure.',
    },
    {
      question: 'What is a VLAN and which OSI layer does it operate at?',
      answer: 'A VLAN (Virtual LAN) logically segments a physical network at Layer 2 (Data Link). Devices in different VLANs can\'t communicate directly even if on the same physical switch — they need a router (Layer 3) to route between VLANs. VLANs improve security and reduce broadcast domains. Uses IEEE 802.1Q tagging.',
    },
    {
      question: 'What is ICMP and what is it used for?',
      answer: 'ICMP (Internet Control Message Protocol) operates at Layer 3 (Network). It\'s used for network diagnostics and error reporting: ping (Echo Request/Reply for reachability), traceroute (TTL exceeded messages to discover path), and error messages like "Destination Unreachable" and "Redirect."',
    },
    {
      question: 'What is the difference between half-duplex and full-duplex communication?',
      answer: 'Half-duplex allows communication in both directions but only one at a time (like a walkie-talkie). Full-duplex allows simultaneous bidirectional communication (like a phone call). Modern Ethernet is full-duplex. WiFi is half-duplex (can\'t send and receive on the same channel simultaneously).',
    },
    {
      question: 'What does the Presentation Layer (6) handle?',
      answer: 'Data format translation, encryption/decryption, compression, and encoding. Examples: TLS encryption, JPEG/PNG image encoding, ASCII-to-Unicode conversion, JSON/XML serialization. In practice, these functions are handled within application protocols — the Presentation Layer is the most theoretical of the OSI layers.',
    },
  ],
  codeExamples: [
    {
      title: 'OSI vs TCP/IP Model Comparison',
      language: 'text',
      code: `OSI Model (7 layers)        TCP/IP Model (4 layers)     Devices / Examples
════════════════════════════════════════════════════════════════════════════
7. Application    ┐
6. Presentation   ├────── Application Layer         HTTP, DNS, SMTP, SSH,
5. Session        ┘                                 FTP, WebSocket, TLS*

4. Transport      ─────── Transport Layer           TCP, UDP
                                                    Ports, Sockets

3. Network        ─────── Internet Layer            IP, ICMP, ARP*
                                                    Routers

2. Data Link      ┐
1. Physical       ┴────── Network Access Layer      Ethernet, WiFi
                                                    Switches, Hubs, NICs

* TLS spans Session/Presentation in OSI
* ARP spans Data Link/Network

═══ Key differences ═══
• OSI is a theoretical reference model (never fully implemented)
• TCP/IP is the practical model the internet actually uses
• OSI has clear layer separation; TCP/IP is more pragmatic
• Most real protocols don't fit neatly into one OSI layer`,
      explanation: 'The TCP/IP model is what the internet actually uses. OSI\'s 7 layers are cleaner conceptually but overly granular — the top 3 layers (5-7) collapse into one in practice. Understanding both models helps in networking discussions.',
    },
    {
      title: 'Data Encapsulation at Each Layer',
      language: 'text',
      code: `Sending: "GET /index.html" from 192.168.1.10 → 93.184.216.34

Layer 7 (Application):
┌──────────────────────────────────────────────────┐
│ GET /index.html HTTP/1.1                         │
│ Host: example.com                                │
│ [HTTP Data]                                      │
└──────────────────────────────────────────────────┘

Layer 4 (Transport): + TCP header
┌──────────┬───────────────────────────────────────┐
│ TCP HDR  │ HTTP Data                             │
│ Src:49152│                                       │
│ Dst:80   │ ← SEGMENT                            │
│ Seq:1000 │                                       │
└──────────┴───────────────────────────────────────┘

Layer 3 (Network): + IP header
┌──────────┬──────────┬────────────────────────────┐
│ IP HDR   │ TCP HDR  │ HTTP Data                  │
│ Src:     │          │                            │
│ 192.168. │          │ ← PACKET                   │
│ 1.10     │          │                            │
│ Dst:     │          │                            │
│ 93.184.  │          │                            │
│ 216.34   │          │                            │
└──────────┴──────────┴────────────────────────────┘

Layer 2 (Data Link): + Ethernet header & trailer
┌──────────┬──────────┬──────────┬─────────┬───────┐
│ ETH HDR  │ IP HDR   │ TCP HDR  │ HTTP    │ FCS   │
│ Dst MAC  │          │          │ Data    │ (CRC) │
│ Src MAC  │          │          │         │       │
│          │          │ ← FRAME              │     │
└──────────┴──────────┴──────────┴─────────┴───────┘

Layer 1 (Physical):
  01001010 11010011 10101001 ... → electrical signals on wire`,
      explanation: 'Each layer wraps the previous data with its own header. The Transport layer adds port numbers, the Network layer adds IP addresses, the Data Link layer adds MAC addresses and a checksum. On the receiving end, each layer strips its header (decapsulation) and passes data up.',
    },
    {
      title: 'Network Diagnostics by Layer',
      language: 'bash',
      code: `# Layer 1 (Physical): Check if cable/link is up
ip link show eth0          # Linux: see interface state (UP/DOWN)
ethtool eth0               # Check link speed, duplex, cable status

# Layer 2 (Data Link): Check MAC addresses & ARP
arp -a                     # View ARP cache (IP → MAC mappings)
ip neigh show              # Linux: same as arp -a
tcpdump -i eth0 arp        # Capture ARP traffic

# Layer 3 (Network): Check IP connectivity & routing
ping 8.8.8.8               # ICMP echo — basic reachability test
traceroute 8.8.8.8         # Show path (each hop) to destination
ip route show              # View routing table
mtr 8.8.8.8                # Combined ping + traceroute (live)

# Layer 4 (Transport): Check ports & connections
netstat -tlnp              # List listening TCP ports
ss -tlnp                   # Modern netstat replacement
telnet example.com 80      # Test if TCP port is open
nc -zv example.com 443     # Netcat port scan

# Layer 7 (Application): Check HTTP, DNS, etc.
curl -v https://example.com  # Verbose HTTP request (shows TLS, headers)
dig example.com              # DNS resolution
nslookup example.com        # Simple DNS query
openssl s_client -connect example.com:443  # Test TLS certificate

# Full packet capture (all layers)
tcpdump -i eth0 -nn port 80  # Capture HTTP traffic
wireshark                     # GUI packet analyzer`,
      explanation: 'When troubleshooting, work from the bottom up: check physical connectivity first (Layer 1), then local network (Layer 2), then routing (Layer 3), then ports/connections (Layer 4), then application protocols (Layer 7). Tools like tcpdump and Wireshark can inspect all layers.',
    },
  ],
};
