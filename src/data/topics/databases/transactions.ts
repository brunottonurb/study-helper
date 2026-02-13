import { Topic } from '@/types';

export const transactions: Topic = {
  id: 'transactions',
  title: 'Transactions & ACID',
  description: 'Ensuring data consistency in database operations',
  category: 'databases',
  confidence: 'intermediate',
  keyPoints: [
    {
      title: 'Atomicity',
      description: 'All operations in a transaction succeed together or **fail together** — there is no partial completion. If any operation fails, the entire transaction is **rolled back** as if it never happened. Implemented via **write-ahead logging (WAL)**: changes are written to a log *before* modifying data, so the system can undo incomplete transactions after a crash. The classic example: a bank transfer debiting Account A and crediting Account B must either complete both steps or neither — a crash between the debit and credit must not lose money.',
    },
    {
      title: 'Consistency',
      description: 'A transaction moves the database from one **valid state** to another valid state. All **integrity constraints** (primary keys, foreign keys, check constraints, triggers) must hold before and after the transaction. If a transaction would violate any constraint, the entire transaction is rolled back. Note: consistency in ACID is different from consistency in CAP theorem (which refers to all nodes seeing the same data in a distributed system). ACID consistency is about *logical correctness* — the application\'s invariants are preserved.',
    },
    {
      title: 'Isolation',
      description: 'Concurrent transactions appear to execute **serially** (one after another), even though they actually run in parallel. Without isolation, concurrent access leads to **anomalies**:\n\n- **Dirty read**: reading uncommitted data from another transaction\n- **Non-repeatable read**: re-reading a row gives different values (another transaction modified it)\n- **Phantom read**: re-executing a query returns new rows (another transaction inserted matching rows)\n- **Lost update**: two transactions read-modify-write the same data, one overwrites the other\n\nIsolation is typically the most expensive ACID property and is implemented via **locking** (pessimistic: 2PL) or **MVCC** (optimistic: multi-version concurrency control).',
    },
    {
      title: 'Durability',
      description: 'Once a transaction is **committed**, it is guaranteed to survive any subsequent system failure — power loss, crash, disk failure. Implemented via **write-ahead logging (WAL)**: committed changes are forced to durable storage (disk/SSD) before the commit is acknowledged. The **redo log** allows replaying committed transactions that weren\'t yet written to the main data files. Combined with **checkpointing** (periodically writing dirty pages to disk), this ensures recovery. For extreme durability, databases support **synchronous replication** to multiple data centers.',
    },
    {
      title: 'Isolation Levels',
      description: 'SQL defines four **isolation levels** that trade consistency for performance (from weakest to strongest):\n\n- **READ UNCOMMITTED**: allows dirty reads — rarely used, fastest but least safe\n- **READ COMMITTED**: prevents dirty reads — you only see committed data. *Default in PostgreSQL, Oracle.*\n- **REPEATABLE READ**: prevents dirty and non-repeatable reads — values you\'ve read won\'t change during your transaction. *Default in MySQL/InnoDB.*\n- **SERIALIZABLE**: prevents all anomalies including phantoms — equivalent to serial execution. Slowest but safest.\n\n**MVCC** (used by PostgreSQL, MySQL InnoDB, Oracle) provides READ COMMITTED and above without read locks by maintaining multiple versions of each row. Readers don\'t block writers and vice versa.',
    },
    {
      title: 'Concurrency Control Mechanisms',
      description: 'Databases use different strategies to handle concurrent access:\n\n- **Two-Phase Locking (2PL)**: transactions acquire locks before accessing data, release all locks after commit. **Strict 2PL** holds all locks until commit/rollback. Guarantees serializability but can cause **deadlocks** (two transactions waiting for each other\'s locks — resolved by aborting one).\n- **MVCC** (Multi-Version Concurrency Control): maintains multiple versions of each row, timestamped. Readers see a consistent **snapshot** without acquiring locks. Writers create new versions. *Most modern databases use MVCC.*\n- **Optimistic Concurrency Control (OCC)**: assumes conflicts are rare — proceed without locks, validate at commit time, abort if conflicts detected. Good for read-heavy workloads.\n\nMost production databases use a **hybrid approach**: MVCC for reads + locking for write-write conflicts.',
    },
  ],
  quizQuestions: [
    {
      question: 'What does Atomicity guarantee in ACID?',
      answer: 'Atomicity guarantees that all operations in a transaction succeed together or fail together. If any operation fails, the entire transaction is rolled back as if it never happened. Implemented using write-ahead logging (WAL) so incomplete transactions can be undone after a crash.',
    },
    {
      question: 'What is a dirty read and which isolation level prevents it?',
      answer: 'A dirty read occurs when a transaction reads data that another transaction has modified but not yet committed. If that transaction rolls back, the first read invalid data. READ COMMITTED and all higher isolation levels prevent dirty reads.',
    },
    {
      question: 'What is the trade-off between higher isolation levels?',
      answer: 'Higher isolation levels (like SERIALIZABLE) provide stronger consistency guarantees but reduce concurrency and throughput. Lower levels allow more parallelism but risk anomalies. Most applications use READ COMMITTED (PostgreSQL default) or REPEATABLE READ (MySQL default) as a pragmatic middle ground.',
    },
    {
      question: 'Why is a bank transfer a classic example of atomicity?',
      answer: 'Debiting Account A and crediting Account B must both succeed or both fail. Without atomicity, a crash after the debit but before the credit would lose money. The WAL ensures that either both changes are applied (on commit) or neither is (on rollback/crash recovery).',
    },
    {
      question: 'What is the difference between a dirty read and a non-repeatable read?',
      answer: 'A dirty read reads uncommitted data (the other transaction hasn\'t committed yet and might roll back). A non-repeatable read reads committed data, but re-reading the same row later returns different values because another transaction committed an update between the two reads.',
    },
    {
      question: 'What is a phantom read?',
      answer: 'A phantom read occurs when a transaction re-executes a query and gets new rows that weren\'t there before, because another transaction inserted matching rows and committed. Unlike non-repeatable reads (existing rows change), phantoms involve new rows appearing. Only SERIALIZABLE prevents phantoms.',
    },
    {
      question: 'How does MVCC work?',
      answer: 'MVCC (Multi-Version Concurrency Control) maintains multiple versions of each row, each with a timestamp or transaction ID. Readers see a consistent snapshot of the data at their transaction\'s start time, without acquiring locks. Writers create new versions rather than overwriting. This allows readers and writers to proceed concurrently without blocking each other.',
    },
    {
      question: 'What is a deadlock and how do databases handle it?',
      answer: 'A deadlock occurs when two or more transactions are each waiting for locks held by the other, creating a cycle of dependencies. Databases detect deadlocks using a wait-for graph and resolve them by aborting one transaction (the "victim") so the other can proceed. The aborted transaction can be retried.',
    },
    {
      question: 'What is write-ahead logging (WAL)?',
      answer: 'WAL requires that changes are written to a durable log before modifying the actual data pages. This ensures atomicity (undo incomplete transactions) and durability (redo committed transactions not yet written to data files). The log is sequential writes (fast) while data page updates are random I/O (slow).',
    },
    {
      question: 'What is the difference between ACID consistency and CAP consistency?',
      answer: 'ACID consistency means a transaction preserves all integrity constraints (logical correctness within a single database). CAP consistency means all nodes in a distributed system see the same data at the same time (data agreement across replicas). They address different concerns.',
    },
    {
      question: 'What is optimistic concurrency control and when is it preferred?',
      answer: 'OCC assumes conflicts are rare — transactions proceed without acquiring locks, keeping track of what they\'ve read. At commit time, the system checks if any read data was modified by another transaction. If conflict is detected, the transaction is aborted and retried. Preferred for read-heavy workloads with rare write conflicts.',
    },
    {
      question: 'What is the difference between Two-Phase Locking and MVCC?',
      answer: '2PL uses locks to prevent concurrent access — readers block writers and vice versa, guaranteeing serializability but reducing concurrency. MVCC maintains multiple row versions so readers see snapshots without locks — readers never block writers. MVCC provides better concurrency for read-heavy workloads.',
    },
  ],
  codeExamples: [
    {
      title: 'Transaction with ACID Properties',
      language: 'sql',
      code: `-- Bank transfer: must be atomic
BEGIN TRANSACTION;

-- Debit from Account A
UPDATE accounts 
SET balance = balance - 100 
WHERE account_id = 'A';

-- Credit to Account B  
UPDATE accounts 
SET balance = balance + 100 
WHERE account_id = 'B';

-- Consistency check: no negative balances
DO $$
BEGIN
  IF (SELECT balance FROM accounts WHERE account_id = 'A') < 0 THEN
    RAISE EXCEPTION 'Insufficient funds';  -- triggers ROLLBACK
  END IF;
END $$;

COMMIT;  -- Durability: changes survive any crash after this point

-- If anything fails between BEGIN and COMMIT:
-- Atomicity ensures both updates are rolled back
-- The database returns to its pre-transaction state`,
      explanation: 'This transaction demonstrates all ACID properties: atomicity (both or neither), consistency (balance check), isolation (other transactions see old or new state, never partial), durability (committed changes survive crashes).',
    },
    {
      title: 'Isolation Levels & Anomalies',
      language: 'sql',
      code: `-- Set isolation level for a session
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

-- Isolation levels vs anomalies:
--
-- Level                  | Dirty | Non-repeatable | Phantom
-- -----------------------|-------|----------------|--------
-- READ UNCOMMITTED       |  Yes  |     Yes        |  Yes
-- READ COMMITTED         |  No   |     Yes        |  Yes
-- REPEATABLE READ        |  No   |     No         |  Yes*
-- SERIALIZABLE           |  No   |     No         |  No
--
-- * MySQL InnoDB's REPEATABLE READ also prevents phantoms
--   using gap locks (stricter than SQL standard)

-- Example: Non-repeatable read (READ COMMITTED)
-- Transaction 1:                -- Transaction 2:
-- BEGIN;                        -- BEGIN;
-- SELECT balance FROM accts     
-- WHERE id = 1;  → $1000       
--                               -- UPDATE accts SET balance = 500
--                               -- WHERE id = 1;
--                               -- COMMIT;
-- SELECT balance FROM accts     
-- WHERE id = 1;  → $500 ← different!
-- COMMIT;

-- Fix: Use REPEATABLE READ — both reads return $1000`,
      explanation: 'Each isolation level prevents progressively more anomalies. READ COMMITTED is the most common default — it prevents dirty reads while allowing good concurrency.',
    },
    {
      title: 'Deadlock Example & Prevention',
      language: 'sql',
      code: `-- Deadlock scenario:
-- Transaction 1:                -- Transaction 2:
-- BEGIN;                        -- BEGIN;
-- UPDATE accts SET bal=bal-100  
-- WHERE id = 1;  (locks row 1)  
--                               -- UPDATE accts SET bal=bal-100
--                               -- WHERE id = 2;  (locks row 2)
-- UPDATE accts SET bal=bal+100
-- WHERE id = 2;  ← WAITS for T2's lock on row 2
--                               -- UPDATE accts SET bal=bal+100
--                               -- WHERE id = 1;  ← WAITS for T1's lock on row 1
--
-- DEADLOCK! Both waiting for each other.
-- Database detects cycle, aborts one transaction.

-- Prevention strategies:
-- 1. Lock ordering: always lock rows in consistent order
BEGIN;
-- Lock both rows in id order (lowest first)
SELECT * FROM accts WHERE id IN (1, 2) ORDER BY id FOR UPDATE;
UPDATE accts SET bal = bal - 100 WHERE id = 1;
UPDATE accts SET bal = bal + 100 WHERE id = 2;
COMMIT;

-- 2. Lock timeout
SET lock_timeout = '5s';  -- abort if can't acquire lock in 5s

-- 3. Use SELECT ... FOR UPDATE NOWAIT
SELECT * FROM accts WHERE id = 1 FOR UPDATE NOWAIT;
-- Fails immediately if row is locked`,
      explanation: 'Deadlocks are resolved automatically by aborting one transaction, but prevention through consistent lock ordering is preferable. Always retry aborted transactions.',
    },
  ],
};
