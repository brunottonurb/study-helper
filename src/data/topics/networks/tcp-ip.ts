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
      description: 'IP addresses are **logical addresses** for routing packets across networks:\n\n- **IPv4**: 32-bit (4 octets), ~4.3 billion addresses. Written as `192.168.1.1`. Running out → need NAT.\n- **IPv6**: 128-bit, ~3.4×10³⁸ addresses. Written as `2001:0db8:85a3::8a2e:0370:7334` (zeros compressed with `::`). Designed to replace IPv4.\n- **Private IP ranges** (not routable on internet): `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`. Used inside LANs, translated via NAT.\n- **Special addresses**: `127.0.0.1` (localhost/loopback), `0.0.0.0` (all interfaces), `255.255.255.255` (broadcast), `169.254.x.x` (link-local / APIPA — no DHCP).\n- **DHCP** (Dynamic Host Configuration Protocol): automatically assigns IP, subnet mask, gateway, and DNS servers to devices when they join a network.\n- **Subnetting**: `192.168.1.0/24` means 24-bit network prefix + 8-bit host = 256 addresses (254 usable). `/16` = 65,536 addresses. `/32` = single host.',
    },
    {
      title: 'TCP Three-Way Handshake',
      description: 'TCP establishes a reliable connection before data transfer using a **three-way handshake**:\n\n1. **SYN**: Client sends a segment with SYN flag + initial **sequence number** (ISN, random for security): `seq=x`\n2. **SYN-ACK**: Server responds with SYN+ACK flags + its own ISN: `seq=y, ack=x+1`\n3. **ACK**: Client confirms: `ack=y+1`. Connection **ESTABLISHED**.\n\nThis process:\n- **Synchronizes sequence numbers**: both sides agree on starting points for numbering bytes\n- **Confirms bidirectional communication**: proves both sides can send and receive\n- **Prevents stale connections**: sequence numbers prevent old delayed SYNs from creating ghost connections\n\n**Connection termination** uses a **four-way handshake**: FIN → ACK → FIN → ACK (both sides independently close). There\'s a `TIME_WAIT` state (2×MSL, typically 60s) to handle delayed packets.',
    },
    {
      title: 'TCP vs UDP',
      description: 'TCP and UDP are the two main **Transport Layer** protocols with very different tradeoffs:\n\n| Feature | **TCP** | **UDP** |\n|---------|---------|--------|\n| Connection | Connection-oriented (handshake) | Connectionless |\n| Reliability | Guaranteed delivery (ACKs + retransmission) | Best-effort, no guarantees |\n| Ordering | Ordered delivery (sequence numbers) | No ordering |\n| Flow control | Sliding window | None |\n| Congestion control | Slow start, AIMD | None |\n| Header size | 20-60 bytes | 8 bytes |\n| Speed | Slower (overhead) | Faster (minimal overhead) |\n\n**Use TCP for**: HTTP/HTTPS, email (SMTP), file transfer (FTP), SSH — anything requiring reliability.\n**Use UDP for**: DNS queries, video streaming, online gaming, VoIP, IoT sensors — where speed matters more than occasional packet loss.\n\n**QUIC** (HTTP/3): a modern UDP-based protocol that adds TCP-like reliability without TCP\'s limitations.',
    },
    {
      title: 'TCP Reliability Mechanisms',
      description: 'TCP ensures reliable, ordered delivery through several mechanisms:\n\n- **Sequence numbers**: every byte is numbered. The receiver can detect missing, duplicate, or out-of-order data.\n- **Acknowledgments (ACKs)**: receiver confirms receipt with the next expected sequence number. Missing ACK → retransmit.\n- **Retransmission**: if no ACK received within **RTO** (Retransmission Timeout, dynamically calculated from RTT), resend the segment.\n- **Flow control** (Sliding Window): receiver advertises **window size** — how much data it can buffer. Sender won\'t exceed this. Prevents slow receivers from being overwhelmed.\n- **Congestion control**: algorithms to avoid overwhelming the **network**:\n  - **Slow start**: begin with small congestion window, double each RTT (exponential growth)\n  - **Congestion avoidance**: after threshold, grow linearly (AIMD — Additive Increase, Multiplicative Decrease)\n  - **Fast retransmit**: if 3 duplicate ACKs received, retransmit immediately (don\'t wait for timeout)\n- **Checksum**: 16-bit checksum on header + data for error detection.',
    },
    {
      title: 'Ports & Sockets',
      description: '**Ports** identify specific applications/services on a host. Combined with IP, they form a **socket**:\n\n- **Well-known ports** (0-1023): reserved for standard services. `HTTP=80`, `HTTPS=443`, `SSH=22`, `DNS=53`, `SMTP=25`, `FTP=21`, `MySQL=3306`, `PostgreSQL=5432`.\n- **Registered ports** (1024-49151): assigned by IANA for specific applications. `Redis=6379`, `MongoDB=27017`, `Node.js dev=3000`.\n- **Ephemeral/dynamic ports** (49152-65535): assigned temporarily by the OS to client connections.\n- **Socket**: an endpoint = IP address + port + protocol. Example: `TCP 192.168.1.10:49152`.\n- **Connection tuple**: a TCP connection is uniquely identified by 4 values: (source IP, source port, dest IP, dest port). A server on port 443 can handle thousands of simultaneous connections because each client uses a different ephemeral source port.\n- **`0.0.0.0:8080`**: listen on all network interfaces. `127.0.0.1:8080`: listen only on localhost (not accessible from network).',
    },
    {
      title: 'Network Address Translation (NAT)',
      description: '**NAT** translates between private (internal) and public (external) IP addresses at the router:\n\n- **Why needed**: IPv4 has only ~4.3 billion addresses. NAT lets an entire network share one public IP. Your home router does this.\n- **How it works**: router maintains a **NAT table** mapping internal (IP:port) → external (IP:port). Outgoing packets get their source IP rewritten to the router\'s public IP. Incoming responses are mapped back using the table.\n- **Types**: **SNAT** (Source NAT — outbound), **DNAT** (Destination NAT — inbound, port forwarding), **PAT** (Port Address Translation — many-to-one, most common at home)\n- **Port forwarding**: manually map external port to an internal IP:port. Needed to host servers behind NAT. `Router:8080 → 192.168.1.10:80`\n- **NAT traversal**: a challenge for P2P apps (game multiplayer, video calls). Solutions: **STUN** (discover public IP/port), **TURN** (relay server), **ICE** (try all methods). WebRTC uses ICE.\n- **Downsides**: breaks end-to-end connectivity, complicates P2P, adds latency, makes inbound connections difficult.',
    },
  ],
  quizQuestions: [
    {
      question: 'Why does TCP use a three-way handshake?',
      answer: 'To synchronize sequence numbers between client and server (both sides agree on starting numbers), confirm that both sides can send AND receive (bidirectional verification), and prevent stale SYN packets from old connections from establishing ghost connections. It\'s the minimum exchange to establish a reliable connection.',
    },
    {
      question: 'When would you choose UDP over TCP?',
      answer: 'When speed and low latency matter more than reliability: video/audio streaming (a dropped frame is better than a delayed one), online gaming (real-time position updates), VoIP (voice calls), DNS queries (simple request/response), IoT sensor data. UDP\'s minimal 8-byte header and lack of handshake/retransmission reduce overhead.',
    },
    {
      question: 'What does CIDR notation like /24 mean?',
      answer: '/24 means the first 24 bits of the IP address are the network prefix, leaving 8 bits for host addresses. That\'s a subnet mask of 255.255.255.0, allowing 256 addresses (254 usable — broadcast and network addresses reserved). /16 = 65,536 addresses, /32 = single host, /0 = all addresses.',
    },
    {
      question: 'How does TCP ensure reliable delivery?',
      answer: 'Through: 1) Sequence numbers (order tracking), 2) Acknowledgments (confirm receipt), 3) Retransmission (resend if no ACK within timeout), 4) Checksums (detect corruption), 5) Flow control via sliding window (don\'t overwhelm receiver), 6) Congestion control (don\'t overwhelm network with slow start + AIMD).',
    },
    {
      question: 'What is NAT and why is it used?',
      answer: 'NAT (Network Address Translation) maps private IPs to a public IP at the router. It\'s needed because IPv4 has limited addresses (~4.3 billion) — NAT lets entire networks share one public IP. The router maintains a translation table (internal IP:port ↔ external IP:port) to route responses back to the correct internal device.',
    },
    {
      question: 'What is the difference between a port and a socket?',
      answer: 'A port is a 16-bit number (0-65535) identifying a service on a host. A socket is the combination of IP address + port + protocol (e.g., TCP 192.168.1.10:8080). A TCP connection is identified by the 4-tuple: (src IP, src port, dst IP, dst port). One server port can handle many connections because each client has a unique ephemeral source port.',
    },
    {
      question: 'What is TCP flow control and how does the sliding window work?',
      answer: 'Flow control prevents the sender from overwhelming a slow receiver. The receiver advertises a "window size" — how many bytes it can buffer. The sender limits unacknowledged data to this window. As the receiver processes data and acknowledges it, the window "slides" forward, allowing more data to be sent.',
    },
    {
      question: 'What is the difference between flow control and congestion control?',
      answer: 'Flow control prevents overwhelming the RECEIVER (via window size in TCP header). Congestion control prevents overwhelming the NETWORK (via slow start, congestion avoidance algorithms). Both limit sending rate but for different reasons. Flow control is about the endpoint\'s buffer; congestion control is about the network path.',
    },
    {
      question: 'Why is TIME_WAIT state needed when closing a TCP connection?',
      answer: 'After sending the final ACK, the closing side enters TIME_WAIT for 2×MSL (Maximum Segment Lifetime, typically 60 seconds). This ensures: 1) The final ACK reaches the other side (can retransmit if lost), 2) Any delayed packets from the old connection expire before the same port pair is reused.',
    },
    {
      question: 'What is the difference between IPv4 and IPv6?',
      answer: 'IPv4: 32-bit addresses (4.3 billion), written as dotted decimal (192.168.1.1), requires NAT. IPv6: 128-bit addresses (3.4×10³⁸), written as hex with colons (2001:db8::1), no NAT needed (every device gets a global address), built-in IPsec, simplified header, no broadcast (uses multicast instead).',
    },
    {
      question: 'What is DHCP and what does it provide?',
      answer: 'DHCP (Dynamic Host Configuration Protocol) automatically assigns network configuration to devices: IP address, subnet mask, default gateway (router), DNS server addresses, and lease duration. Without DHCP, you\'d manually configure each device. DHCP uses UDP ports 67 (server) and 68 (client).',
    },
    {
      question: 'What is port forwarding and when is it needed?',
      answer: 'Port forwarding is a NAT rule that maps an external port on the router to a specific internal IP:port. It\'s needed to make a service behind NAT accessible from the internet — e.g., hosting a web server at home: router\'s port 80 → 192.168.1.10:80. Without port forwarding, inbound connections can\'t reach devices behind NAT.',
    },
  ],
  codeExamples: [
    {
      title: 'TCP Connection Lifecycle',
      language: 'text',
      code: `════ Connection Establishment (3-way handshake) ════
Client                              Server
  │                                   │  (LISTEN)
  │──── SYN (seq=1000) ─────────────>│
  │     "I want to connect"           │  (SYN_RCVD)
  │                                   │
  │<─── SYN-ACK (seq=5000,ack=1001)──│
  │     "OK, here's my seq number"    │
  │                                   │
  │──── ACK (ack=5001) ─────────────>│
  │     "Got it, we're connected"     │  (ESTABLISHED)
  │                                   │

════ Data Transfer ════
  │──── DATA (seq=1001, 500 bytes) ─>│
  │                                   │
  │<─── ACK (ack=1501) ──────────────│  "Got bytes through 1500"
  │                                   │
  │──── DATA (seq=1501, 500 bytes) ─>│
  │          ✗ LOST!                  │
  │                                   │  (no ACK → timeout)
  │──── DATA (seq=1501, retransmit) ─>│
  │                                   │
  │<─── ACK (ack=2001) ──────────────│  "Got retransmit"

════ Connection Termination (4-way handshake) ════
  │──── FIN (seq=2001) ─────────────>│
  │     "I'm done sending"           │
  │<─── ACK (ack=2002) ──────────────│
  │     "OK, noted"                   │
  │<─── FIN (seq=6000) ──────────────│
  │     "I'm done too"               │
  │──── ACK (ack=6001) ─────────────>│
  │  [TIME_WAIT: 60s]                │  [CLOSED]
  │  [CLOSED]                         │`,
      explanation: 'The three-way handshake synchronizes sequence numbers. Data transfer uses sequence numbers and acknowledgments for reliability — lost packets are retransmitted. The four-way close lets each side independently signal completion, with TIME_WAIT ensuring delayed packets don\'t interfere with new connections.',
    },
    {
      title: 'Subnetting & CIDR Cheat Sheet',
      language: 'text',
      code: `════ CIDR Notation ════
CIDR     Subnet Mask       Hosts    Use Case
/32    255.255.255.255      1       Single host (loopback, host route)
/31    255.255.255.254      2       Point-to-point link
/30    255.255.255.252      2       Point-to-point (traditional)
/24    255.255.255.0       254      Typical LAN subnet
/16    255.255.0.0       65,534     Large LAN / campus
/8     255.0.0.0      16,777,214   Class A (10.0.0.0/8)
/0     0.0.0.0          (all)      Default route

════ Private IP Ranges ════
10.0.0.0/8         → 10.0.0.0 – 10.255.255.255      (16M addresses)
172.16.0.0/12      → 172.16.0.0 – 172.31.255.255     (1M addresses)
192.168.0.0/16     → 192.168.0.0 – 192.168.255.255   (65K addresses)

════ Subnet Calculation Example ════
Network: 192.168.10.0/26

  /26 = 26 network bits, 6 host bits
  Subnet mask: 255.255.255.192 (11111111.11111111.11111111.11000000)
  Hosts per subnet: 2⁶ - 2 = 62 usable
  Number of subnets: 2² = 4 subnets in a /24

  Subnet 0: 192.168.10.0   – 192.168.10.63    (gateway: .1)
  Subnet 1: 192.168.10.64  – 192.168.10.127   (gateway: .65)
  Subnet 2: 192.168.10.128 – 192.168.10.191   (gateway: .129)
  Subnet 3: 192.168.10.192 – 192.168.10.255   (gateway: .193)

  First usable = network + 1, Last usable = broadcast - 1
  Network address = all host bits 0, Broadcast = all host bits 1`,
      explanation: 'CIDR notation /N means N bits for the network prefix. Subtract from 32 to get host bits, then 2^host_bits - 2 = usable addresses (minus network and broadcast). Private ranges (10.x, 172.16-31.x, 192.168.x) are used behind NAT and not routable on the public internet.',
    },
    {
      title: 'Network Diagnostics with Common Tools',
      language: 'bash',
      code: `# ═══ IP Configuration ═══
ip addr show              # Linux: show all interfaces and IPs
ifconfig                  # macOS/legacy: show interfaces
ip route show             # Show routing table (default gateway)
cat /etc/resolv.conf      # DNS server configuration

# ═══ Connectivity Testing ═══
ping -c 4 8.8.8.8        # ICMP echo: test basic connectivity
ping -c 4 google.com     # Tests DNS resolution + connectivity
ping6 ::1                # IPv6 ping (localhost)

# ═══ Path Tracing ═══
traceroute google.com     # Show each hop to destination
mtr google.com            # Live traceroute + ping stats (best tool)

# ═══ Port Scanning & Connections ═══
ss -tlnp                  # List listening TCP ports + process
ss -tunp                  # All TCP/UDP connections + process
lsof -i :8080             # What process is using port 8080?
nc -zv example.com 443    # Test if TCP port is reachable

# ═══ TCP Connection Details ═══
ss -i                     # Show TCP internal info (window, RTT)
# Example output:
# tcp ESTAB  192.168.1.10:49152  93.184.216.34:443
#   cubic wscale:7,7  rto:204  rtt:12.5/6.25  cwnd:10  send 9.3Mbps

# ═══ NAT & Firewall ═══
# View NAT table (Linux router)
iptables -t nat -L -v --line-numbers
# Port forward: external 8080 → internal 192.168.1.10:80
iptables -t nat -A PREROUTING -p tcp --dport 8080 \
  -j DNAT --to-destination 192.168.1.10:80

# ═══ Quick health check ═══
# 1. Can I reach my gateway?  
ping -c 1 $(ip route | grep default | awk '{print $3}')
# 2. Can I reach the internet? 
ping -c 1 8.8.8.8
# 3. Does DNS work?           
ping -c 1 google.com`,
      explanation: 'Troubleshoot in order: 1) Check your IP config, 2) Ping gateway (Layer 2/3), 3) Ping external IP like 8.8.8.8 (routing/NAT), 4) Ping a domain (DNS), 5) Test specific ports (Layer 4). Use ss/netstat for connection state and mtr for persistent path analysis.',
    },
  ],
};
