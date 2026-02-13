import { Topic } from '@/types';

export const sqlFundamentals: Topic = {
  id: 'sql-fundamentals',
  title: 'SQL Fundamentals',
  description: 'Structured Query Language for relational databases',
  category: 'databases',
  confidence: 'intermediate',
  keyPoints: [
    {
      title: 'DDL (Data Definition Language)',
      description: 'Commands that define and modify database **structure** (schema):\n\n- **`CREATE TABLE`**: define a new table with columns, types, and constraints\n- **`ALTER TABLE`**: add/drop/modify columns and constraints on an existing table\n- **`DROP TABLE`**: permanently remove a table and all its data\n- **`CREATE INDEX`**: create an index for faster lookups\n- **`CREATE VIEW`**: define a virtual table based on a query\n\nDDL statements are typically **auto-committed** (can\'t be rolled back in most RDBMS). Column types vary by database: `INT`, `VARCHAR(n)`, `TEXT`, `DECIMAL(p,s)`, `DATE`, `TIMESTAMP`, `BOOLEAN`, `SERIAL` (auto-increment in PostgreSQL) vs `AUTO_INCREMENT` (MySQL).',
    },
    {
      title: 'DML (Data Manipulation Language)',
      description: 'Commands for working with **data** within tables:\n\n- **`SELECT`**: retrieve data with filtering, sorting, grouping, and joining\n- **`INSERT`**: add new rows — single values, multiple rows, or from a subquery\n- **`UPDATE`**: modify existing rows matching a condition (**always use WHERE** to avoid updating all rows!)\n- **`DELETE`**: remove rows matching a condition (**always use WHERE**!)\n\n`SELECT` has a specific **logical execution order** (different from written order): `FROM` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `DISTINCT` → `ORDER BY` → `LIMIT`. Understanding this order explains why you can\'t use a column alias in `WHERE` (it\'s evaluated after `SELECT`) but can in `ORDER BY`.',
    },
    {
      title: 'JOINs',
      description: 'Combine rows from two or more tables based on related columns:\n\n- **`INNER JOIN`**: only rows with matches in *both* tables (the default)\n- **`LEFT (OUTER) JOIN`**: all rows from left table + matching rows from right (NULL for non-matches)\n- **`RIGHT (OUTER) JOIN`**: all rows from right table + matching rows from left\n- **`FULL OUTER JOIN`**: all rows from both tables (NULL where no match)\n- **`CROSS JOIN`**: Cartesian product — every row × every row (rarely intended)\n- **`SELF JOIN`**: a table joined with itself (e.g., employees and their managers)\n\nJOIN performance depends on **indexes** on join columns. The query optimizer chooses between **nested loop** (small tables), **hash join** (equality, large tables), and **merge join** (sorted data) strategies.',
    },
    {
      title: 'Aggregation & Grouping',
      description: 'Aggregate functions compute a **single value** from a set of rows: `COUNT(*)`, `SUM()`, `AVG()`, `MIN()`, `MAX()`, `COUNT(DISTINCT col)`. Combined with **`GROUP BY`** to compute aggregates per group.\n\n- **`GROUP BY`** collapses rows with identical values into summary rows. Every column in `SELECT` must either be in `GROUP BY` or wrapped in an aggregate function.\n- **`HAVING`** filters groups *after* aggregation (unlike `WHERE`, which filters *before*). `HAVING` can use aggregate functions: `HAVING COUNT(*) > 5`.\n\nAdvanced: **window functions** (`ROW_NUMBER()`, `RANK()`, `SUM() OVER()`) compute aggregates without collapsing rows — each row retains its identity while gaining access to aggregate values over a "window" of related rows.',
    },
    {
      title: 'Subqueries & CTEs',
      description: 'Subqueries are queries nested inside other queries, used in `WHERE`, `FROM`, or `SELECT` clauses:\n\n- **Scalar subquery**: returns a single value — `WHERE price > (SELECT AVG(price) FROM products)`\n- **Row subquery**: returns a single row\n- **Table subquery**: returns a result set — used in `FROM` clause or with `IN`, `EXISTS`, `ANY`, `ALL`\n- **Correlated subquery**: references the outer query — re-executed for each outer row (can be slow)\n\n**CTEs** (Common Table Expressions) using `WITH` provide **named temporary result sets** that make complex queries readable. **Recursive CTEs** can traverse hierarchical data (org charts, tree structures). CTEs are generally clearer than nested subqueries and can be referenced multiple times.',
    },
    {
      title: 'Indexes',
      description: 'Data structures that speed up **data retrieval** at the cost of slower writes and extra storage:\n\n- **B-tree index**: the default — balanced tree supporting equality and range queries. O(log n) lookups.\n- **Hash index**: very fast equality lookups O(1) but no range queries\n- **Composite index**: index on multiple columns — order matters! `(a, b, c)` supports queries on `a`, `(a, b)`, and `(a, b, c)` but NOT `(b, c)` alone (**leftmost prefix rule**)\n- **Covering index**: includes all columns needed by a query, avoiding table lookup entirely\n- **Unique index**: enforces uniqueness (implicitly created for PK and UNIQUE constraints)\n\n**`EXPLAIN`** (or `EXPLAIN ANALYZE` in PostgreSQL) shows the query plan — whether indexes are used, join strategies, and estimated costs. Always check `EXPLAIN` before adding indexes; unnecessary indexes slow down writes.',
    },
  ],
  quizQuestions: [
    {
      question: 'What is the difference between WHERE and HAVING?',
      answer: 'WHERE filters individual rows before aggregation (can\'t use aggregate functions). HAVING filters groups after aggregation (can use COUNT, SUM, etc.). Example: WHERE price > 10 filters rows, HAVING COUNT(*) > 5 filters groups.',
    },
    {
      question: 'What is the difference between INNER JOIN and LEFT JOIN?',
      answer: 'INNER JOIN returns only rows with matches in both tables. LEFT JOIN returns all rows from the left table plus matching rows from the right (with NULL for non-matches). Use LEFT JOIN when you need all records from one table regardless of matches.',
    },
    {
      question: 'What is the difference between DELETE and TRUNCATE?',
      answer: 'DELETE removes rows one by one (can use WHERE, fully logged, triggers fire, can be rolled back). TRUNCATE removes all rows instantly (no WHERE, minimal logging, resets auto-increment, typically can\'t be rolled back). TRUNCATE is much faster for clearing entire tables.',
    },
    {
      question: 'What does GROUP BY do and when is it required?',
      answer: 'GROUP BY groups rows with identical values into summary rows for aggregation. It\'s required when using aggregate functions (COUNT, SUM) alongside non-aggregated columns in SELECT. Every non-aggregated column in SELECT must appear in GROUP BY.',
    },
    {
      question: 'What is the logical execution order of a SELECT statement?',
      answer: 'FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT. This explains why column aliases defined in SELECT can\'t be used in WHERE (evaluated earlier) but can be used in ORDER BY (evaluated later).',
    },
    {
      question: 'What is a correlated subquery and why can it be slow?',
      answer: 'A correlated subquery references columns from the outer query, so it\'s re-executed for each row of the outer query. For a table with n rows, the subquery runs n times. Often can be rewritten as a JOIN for better performance.',
    },
    {
      question: 'What is a window function and how does it differ from GROUP BY?',
      answer: 'Window functions (ROW_NUMBER, RANK, SUM OVER) compute aggregates across a set of rows related to the current row WITHOUT collapsing them into groups. Each row retains its identity. GROUP BY collapses rows into one row per group.',
    },
    {
      question: 'What is the leftmost prefix rule for composite indexes?',
      answer: 'A composite index on (a, b, c) can be used for queries filtering on a, (a, b), or (a, b, c), but NOT for queries filtering only on b, c, or (b, c). The index follows the leftmost columns first, like a phone book sorted by last name then first name.',
    },
    {
      question: 'What is EXPLAIN used for?',
      answer: 'EXPLAIN shows the query execution plan — which indexes are used, join strategies (nested loop, hash, merge), estimated row counts, and costs. EXPLAIN ANALYZE actually runs the query and shows real execution times. Essential for identifying performance bottlenecks.',
    },
    {
      question: 'What is the difference between UNION and UNION ALL?',
      answer: 'UNION combines results from two queries and removes duplicates (requires sorting). UNION ALL combines results without removing duplicates, which is faster. Use UNION ALL when duplicates are acceptable or impossible.',
    },
    {
      question: 'What is a CTE and when should you use one?',
      answer: 'A CTE (WITH clause) defines a named temporary result set that exists for the duration of one query. Use CTEs to break complex queries into readable steps, when you need to reference the same subquery multiple times, or for recursive queries (tree traversal, hierarchies).',
    },
    {
      question: 'What is a covering index?',
      answer: 'A covering index includes all columns that a query needs, so the database can answer the query entirely from the index without looking up the actual table rows (index-only scan). This avoids the expensive random I/O of table lookups and can dramatically speed up queries.',
    },
  ],
  codeExamples: [
    {
      title: 'DDL & DML Fundamentals',
      language: 'sql',
      code: `-- Create tables with constraints
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    major VARCHAR(50),
    gpa DECIMAL(3,2) CHECK (gpa >= 0 AND gpa <= 4.0),
    enrolled_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE enrollments (
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    course_id INT,
    grade DECIMAL(3,2),
    PRIMARY KEY (student_id, course_id)
);

-- Insert data
INSERT INTO students (name, major, gpa) VALUES
    ('Alice', 'CS', 3.8),
    ('Bob', 'Math', 3.5),
    ('Carol', 'CS', 3.9);

-- Update with WHERE (never forget WHERE!)
UPDATE students SET gpa = 3.9 WHERE name = 'Alice';

-- Delete with WHERE (never forget WHERE!)
DELETE FROM enrollments WHERE grade < 1.0;`,
      explanation: 'DDL defines structure, DML manipulates data. Always use WHERE with UPDATE and DELETE to avoid modifying all rows accidentally.',
    },
    {
      title: 'JOINs, Aggregation & Window Functions',
      language: 'sql',
      code: `-- JOIN with aggregation
SELECT s.name, COUNT(*) as courses, AVG(e.grade) as avg_grade
FROM students s
LEFT JOIN enrollments e ON s.id = e.student_id
GROUP BY s.id, s.name
HAVING COUNT(*) > 3
ORDER BY avg_grade DESC;

-- Self JOIN: find students in the same major
SELECT a.name, b.name, a.major
FROM students a
JOIN students b ON a.major = b.major AND a.id < b.id;

-- Window function: rank students by GPA within major
SELECT name, major, gpa,
    RANK() OVER (PARTITION BY major ORDER BY gpa DESC) as rank,
    AVG(gpa) OVER (PARTITION BY major) as major_avg
FROM students;

-- Window vs GROUP BY comparison:
-- GROUP BY: one row per major with average
-- Window:   every student row, with major average added`,
      explanation: 'Window functions add analytical power without collapsing rows. PARTITION BY acts like GROUP BY but within the window frame, and each row retains its identity.',
    },
    {
      title: 'Subqueries, CTEs & Indexes',
      language: 'sql',
      code: `-- Scalar subquery in WHERE
SELECT name, gpa
FROM students
WHERE gpa > (SELECT AVG(gpa) FROM students);

-- Correlated subquery with EXISTS
SELECT s.name
FROM students s
WHERE EXISTS (
    SELECT 1 FROM enrollments e
    WHERE e.student_id = s.id AND e.grade >= 3.5
);

-- CTE for readability
WITH honor_students AS (
    SELECT s.id, s.name, AVG(e.grade) as avg_grade
    FROM students s
    JOIN enrollments e ON s.id = e.student_id
    GROUP BY s.id, s.name
    HAVING AVG(e.grade) >= 3.5
)
SELECT name, avg_grade FROM honor_students ORDER BY avg_grade DESC;

-- Recursive CTE: org chart / tree traversal
WITH RECURSIVE org_tree AS (
    SELECT id, name, manager_id, 0 as depth
    FROM employees WHERE manager_id IS NULL      -- root
    UNION ALL
    SELECT e.id, e.name, e.manager_id, ot.depth + 1
    FROM employees e
    JOIN org_tree ot ON e.manager_id = ot.id     -- children
)
SELECT * FROM org_tree ORDER BY depth;

-- Index for query optimization
CREATE INDEX idx_students_major ON students(major);
CREATE INDEX idx_enrollments_grade ON enrollments(student_id, grade);
-- Check if index is used:
EXPLAIN ANALYZE SELECT * FROM students WHERE major = 'CS';`,
      explanation: 'CTEs make complex queries readable and maintainable. Recursive CTEs handle hierarchical data. EXPLAIN ANALYZE verifies that indexes are actually being used.',
    },
  ],
};
