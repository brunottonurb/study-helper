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
      description: 'All operations succeed or all fail (rollback)',
    },
    {
      title: 'Consistency',
      description: 'Database moves from one valid state to another',
    },
    {
      title: 'Isolation',
      description: 'Concurrent transactions appear to execute serially',
    },
    {
      title: 'Durability',
      description: 'Committed transactions survive system failures',
    },
  ],
  quizQuestions: [
    {
      question: 'What does Atomicity guarantee in ACID?',
      answer: 'Atomicity guarantees that all operations in a transaction succeed together or fail together. If any operation fails, the entire transaction is rolled back as if it never happened.',
    },
    {
      question: 'What is a dirty read and which isolation level prevents it?',
      answer: 'A dirty read occurs when a transaction reads uncommitted data from another transaction. READ COMMITTED and higher isolation levels prevent dirty reads.',
    },
    {
      question: 'What is the trade-off between higher isolation levels?',
      answer: 'Higher isolation levels (like SERIALIZABLE) provide stronger consistency guarantees but reduce concurrency and throughput. Lower levels allow more parallelism but risk anomalies.',
    },
    {
      question: 'Why is a bank transfer a classic example of atomicity?',
      answer: 'Debiting Account A and crediting Account B must both succeed or both fail. Without atomicity, a crash after debit but before credit would lose money.',
    },
  ],
  codeExamples: [
    {
      title: 'Transaction Example',
      language: 'sql',
      code: `-- Bank transfer: must be atomic
BEGIN TRANSACTION;

UPDATE accounts 
SET balance = balance - 100 
WHERE account_id = 'A';

UPDATE accounts 
SET balance = balance + 100 
WHERE account_id = 'B';

-- Check constraint
IF (SELECT balance FROM accounts WHERE account_id = 'A') < 0
    ROLLBACK;
ELSE
    COMMIT;

-- Isolation levels (weakest to strongest):
-- READ UNCOMMITTED - dirty reads possible
-- READ COMMITTED   - no dirty reads
-- REPEATABLE READ  - no non-repeatable reads  
-- SERIALIZABLE     - no phantom reads`,
      explanation: 'ACID properties ensure reliable transaction processing',
    },
  ],
};
