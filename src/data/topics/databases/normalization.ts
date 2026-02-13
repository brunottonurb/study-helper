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
      description: 'A relation is in **1NF** if every attribute contains only **atomic** (indivisible) values — no repeating groups, no arrays, no nested tables. Each row must be **uniquely identifiable** (has a primary key). Example violation: a `phone_numbers` column containing `"555-1234, 555-5678"`. Fix: create a separate row for each phone number, or a separate `PhoneNumbers` table. 1NF is the **minimum requirement** for a relation to be considered well-formed in the relational model.',
    },
    {
      title: 'Second Normal Form (2NF)',
      description: '1NF + **no partial dependencies**. A partial dependency exists when a non-key attribute depends on only *part* of a composite primary key, not the whole key. Only relevant for tables with **composite keys**. Example: table `(student_id, course_id, student_name, grade)` — `student_name` depends only on `student_id`, not on `(student_id, course_id)`. Fix: move `student_name` to a `Students` table. Tables with a **single-column primary key** are automatically in 2NF if they\'re in 1NF.',
    },
    {
      title: 'Third Normal Form (3NF)',
      description: '2NF + **no transitive dependencies**. A transitive dependency exists when a non-key attribute depends on another non-key attribute: `A → B → C` where A is the key, B and C are non-key. Example: `(employee_id, department_id, department_name)` — `department_name` depends on `department_id`, not directly on `employee_id`. Fix: create a `Departments` table. **Codd\'s definition**: a relation is in 3NF if for every functional dependency `X → A`, either X is a superkey or A is a prime attribute (part of a candidate key). Most practical databases aim for 3NF as the sweet spot.',
    },
    {
      title: 'Boyce-Codd Normal Form (BCNF)',
      description: 'A stricter version of 3NF: **every determinant must be a candidate key**. 3NF allows non-key attributes to functionally determine prime attributes; BCNF does not. Example violation: `(student, course, professor)` where each professor teaches one course, but multiple professors can teach the same course. Here `professor → course` but `professor` is not a candidate key. BCNF decomposition may lose **dependency preservation** (unlike 3NF, which always preserves all functional dependencies). In practice, the difference between 3NF and BCNF rarely matters.',
    },
    {
      title: 'Functional Dependencies',
      description: 'A **functional dependency** `X → Y` means that for any two tuples with the same value of X, they must have the same value of Y. X **functionally determines** Y. FDs are the theoretical foundation for normalization — each normal form eliminates certain types of problematic FDs. Key concepts:\n\n- **Candidate key**: minimal set of attributes that functionally determines all others\n- **Superkey**: any superset of a candidate key\n- **Prime attribute**: appears in at least one candidate key\n- **Armstrong\'s axioms**: reflexivity, augmentation, transitivity — used to derive all FDs from a given set (compute the **closure** X⁺)',
    },
    {
      title: 'Denormalization',
      description: 'The **intentional introduction of redundancy** to improve read performance, reversing normalization trade-offs. Common strategies:\n\n- **Pre-computed joins**: store joined data in a single table to avoid expensive JOINs\n- **Materialized views**: precomputed query results that are periodically refreshed\n- **Summary/aggregate tables**: store pre-calculated counts, sums, averages\n- **Duplicated columns**: copy frequently accessed data to avoid joins\n\nDenormalization trades **write complexity** and **storage space** for **read speed**. It introduces **update anomalies** — when denormalized data changes, all copies must be updated consistently. Common in **OLAP** (analytical) systems, data warehouses, and read-heavy applications. **Normalize first**, then selectively denormalize based on measured performance bottlenecks.',
    },
  ],
  quizQuestions: [
    {
      question: 'What is a transitive dependency and why does 3NF eliminate it?',
      answer: 'A transitive dependency is when A → B → C (A determines B, B determines C, where B is not a key). 3NF eliminates these because they cause update anomalies — changing C requires updating multiple rows where B appears, and inserting C requires a value for A even if unrelated.',
    },
    {
      question: 'What is the difference between 2NF and 3NF?',
      answer: '2NF eliminates partial dependencies (non-key attributes depending on part of a composite key). 3NF eliminates transitive dependencies (non-key attributes depending on other non-key attributes). 2NF only applies to composite keys; 3NF applies regardless of key type.',
    },
    {
      question: 'When might you intentionally denormalize a database?',
      answer: 'For read-heavy workloads where JOIN performance is critical, such as analytics dashboards, search results, or caching layers. Denormalization trades storage space, update complexity, and data consistency for faster reads by pre-joining or duplicating data.',
    },
    {
      question: 'What is a functional dependency?',
      answer: 'A functional dependency X → Y means if two rows have the same value for X, they must have the same value for Y. X "functionally determines" Y. For example, employee_id → employee_name means each ID maps to exactly one name.',
    },
    {
      question: 'What is the difference between 3NF and BCNF?',
      answer: '3NF allows a non-key attribute to functionally determine a prime attribute (part of a candidate key). BCNF requires every determinant to be a candidate key — it\'s strictly stronger. BCNF decomposition may lose dependency preservation, while 3NF always preserves all functional dependencies.',
    },
    {
      question: 'Why are tables with single-column primary keys automatically in 2NF?',
      answer: 'Partial dependencies can only exist with composite keys — a non-key attribute depending on part of the key. With a single-column key, there is no "part" of the key to depend on, so partial dependencies are impossible. The table only needs to be in 1NF to automatically satisfy 2NF.',
    },
    {
      question: 'What are update anomalies and how does normalization prevent them?',
      answer: 'Update anomalies include: Insertion anomalies (can\'t add data without unrelated data), Deletion anomalies (deleting data accidentally removes unrelated info), and Modification anomalies (updating one fact requires changing multiple rows). Normalization prevents them by ensuring each fact is stored in exactly one place.',
    },
    {
      question: 'What is a candidate key vs a superkey?',
      answer: 'A superkey is any set of attributes that uniquely identifies a row. A candidate key is a minimal superkey — removing any attribute would lose uniqueness. A table may have multiple candidate keys, and one is chosen as the primary key. Example: both (SSN) and (email) could be candidate keys for a person.',
    },
    {
      question: 'What are Armstrong\'s axioms?',
      answer: 'Three inference rules for functional dependencies: (1) Reflexivity: if Y ⊆ X, then X → Y. (2) Augmentation: if X → Y, then XZ → YZ. (3) Transitivity: if X → Y and Y → Z, then X → Z. These are sound and complete — they can derive exactly all FDs implied by a given set.',
    },
    {
      question: 'What is a materialized view and when is it used?',
      answer: 'A materialized view stores the precomputed results of a query as a physical table, unlike a regular view which re-executes the query each time. Used for expensive aggregations or joins in analytical/reporting workloads. The trade-off is that it must be refreshed periodically and uses storage space.',
    },
    {
      question: 'What is lossless-join decomposition?',
      answer: 'When decomposing a table during normalization, a lossless-join decomposition ensures that joining the resulting tables exactly reproduces the original data (no spurious tuples). This is guaranteed if the common attributes of the decomposed tables form a superkey of at least one of them.',
    },
    {
      question: 'Why should you "normalize first, then selectively denormalize"?',
      answer: 'Starting normalized ensures data integrity and eliminates anomalies. You only introduce redundancy (denormalize) after measuring actual performance bottlenecks, targeting specific slow queries. Premature denormalization creates maintenance burden and consistency risks without proven benefit.',
    },
  ],
  codeExamples: [
    {
      title: 'Normalization Step-by-Step',
      language: 'text',
      code: `Unnormalized:
Order(order_id, customer_name, customer_city, items[])

1NF — Remove repeating groups (no arrays):
OrderItem(order_id, item_id, customer_name, customer_city, qty)

2NF — Remove partial dependencies:
  customer_name and customer_city depend on order_id only,
  not on the full composite key (order_id, item_id)

Order(order_id, customer_name, customer_city)
OrderItem(order_id, item_id, qty)

3NF — Remove transitive dependencies:
  customer_city depends on customer_name, not order_id directly
  (customer_name → customer_city is transitive through order_id)

Customer(customer_id, name, city)
Order(order_id, customer_id, date)
OrderItem(order_id, item_id, qty)

Each fact stored exactly once → no update anomalies`,
      explanation: 'Each normal form addresses a specific type of redundancy. Most practical databases aim for 3NF, balancing integrity with simplicity.',
    },
    {
      title: 'Functional Dependency Analysis',
      language: 'text',
      code: `Table: StudentCourse(sid, sname, cid, cname, grade)

Functional dependencies:
  sid → sname            (student ID determines name)
  cid → cname            (course ID determines name)
  (sid, cid) → grade     (student + course determines grade)

Candidate key: (sid, cid)
  — this determines all attributes

Violations:
  2NF: sid → sname is a partial dependency
       (sname depends on part of the key)
  2NF: cid → cname is a partial dependency

Decomposition to 3NF:
  Student(sid, sname)           ← sid → sname
  Course(cid, cname)            ← cid → cname
  Enrollment(sid, cid, grade)   ← (sid, cid) → grade

All FDs are now key → non-key. Lossless-join: ✓
Dependency-preserving: ✓`,
      explanation: 'Analyzing functional dependencies reveals which normal form violations exist and guides decomposition into properly normalized tables.',
    },
    {
      title: 'Denormalization for Performance',
      language: 'sql',
      code: `-- Normalized (3NF): requires JOIN for every product listing
SELECT p.name, p.price, c.category_name, b.brand_name
FROM products p
JOIN categories c ON p.category_id = c.id
JOIN brands b ON p.brand_id = b.id
WHERE c.category_name = 'Electronics';

-- Denormalized: single table scan, much faster reads
-- Trade-off: category/brand names duplicated in every row
CREATE TABLE product_listings AS
SELECT p.id, p.name, p.price, 
       c.category_name, b.brand_name
FROM products p
JOIN categories c ON p.category_id = c.id
JOIN brands b ON p.brand_id = b.id;

-- Materialized view (auto-refresh alternative)
CREATE MATERIALIZED VIEW product_listings AS
SELECT p.id, p.name, p.price,
       c.category_name, b.brand_name
FROM products p
JOIN categories c ON p.category_id = c.id
JOIN brands b ON p.brand_id = b.id;

-- Refresh when underlying data changes
REFRESH MATERIALIZED VIEW product_listings;`,
      explanation: 'Denormalization eliminates joins for read performance but requires maintaining consistency across duplicated data. Materialized views offer an automated middle ground.',
    },
  ],
};
