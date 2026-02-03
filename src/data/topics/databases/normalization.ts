import { Topic } from '@/types';

export const normalization: Topic = {
  id: 'normalization',
  title: 'Database Normalization',
  description: 'Process of organizing data to reduce redundancy',
  category: 'databases',
  confidence: 'intermediate',
  keyPoints: [
    {
      title: 'First Normal Form (1NF)',
      description: 'Atomic values only, no repeating groups',
    },
    {
      title: 'Second Normal Form (2NF)',
      description: '1NF + no partial dependencies on composite key',
    },
    {
      title: 'Third Normal Form (3NF)',
      description: '2NF + no transitive dependencies',
    },
    {
      title: 'BCNF',
      description: 'Every determinant is a candidate key',
    },
  ],
  quizQuestions: [
    {
      question: 'What is a transitive dependency and why does 3NF eliminate it?',
      answer: 'A transitive dependency is when A → B → C (A determines B, B determines C). 3NF eliminates these because they cause update anomalies—changing C requires updating multiple rows.',
    },
    {
      question: 'What is the difference between 2NF and 3NF?',
      answer: '2NF eliminates partial dependencies (non-key attributes depending on part of a composite key). 3NF eliminates transitive dependencies (non-key attributes depending on other non-key attributes).',
    },
    {
      question: 'When might you intentionally denormalize a database?',
      answer: 'For read-heavy workloads where join performance is critical. Denormalization trades storage space and update complexity for faster reads by pre-joining or duplicating data.',
    },
  ],
  codeExamples: [
    {
      title: 'Normalization Example',
      language: 'text',
      code: `Unnormalized:
Order(order_id, customer_name, customer_city, items[])

1NF - Remove repeating groups:
Order(order_id, customer_name, customer_city)
OrderItem(order_id, item_id, quantity)

2NF - Remove partial dependencies:
(customer_name depends only on order_id, not item_id)
Already in 2NF for OrderItem if order_id alone is not key

3NF - Remove transitive dependencies:
customer_city depends on customer_name, not order_id

Final 3NF:
Customer(customer_id, name, city)
Order(order_id, customer_id, date)  
OrderItem(order_id, item_id, quantity)`,
      explanation: 'Normalization reduces update anomalies and data redundancy',
    },
  ],
};
