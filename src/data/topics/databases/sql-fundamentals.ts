import { Topic } from '@/types';

export const sqlFundamentals: Topic = {
  id: 'sql-fundamentals',
  title: 'SQL Fundamentals',
  description: 'Structured Query Language for relational databases',
  category: 'databases',
  confidence: 'intermediate',
  keyPoints: [
    {
      title: 'DDL (Data Definition)',
      description: 'CREATE, ALTER, DROP - define database structure',
    },
    {
      title: 'DML (Data Manipulation)',
      description: 'SELECT, INSERT, UPDATE, DELETE - work with data',
    },
    {
      title: 'JOINs',
      description: 'INNER, LEFT, RIGHT, FULL OUTER - combine related tables',
    },
    {
      title: 'Aggregation',
      description: 'GROUP BY, HAVING with COUNT, SUM, AVG, MIN, MAX',
    },
  ],
  quizQuestions: [
    {
      question: 'What is the difference between WHERE and HAVING?',
      answer: 'WHERE filters rows before aggregation (can\'t use aggregate functions). HAVING filters groups after aggregation (can use COUNT, SUM, etc.).',
    },
    {
      question: 'What is the difference between INNER JOIN and LEFT JOIN?',
      answer: 'INNER JOIN returns only matching rows from both tables. LEFT JOIN returns all rows from the left table plus matching rows from the right (with NULL for non-matches).',
    },
    {
      question: 'What is the difference between DELETE and TRUNCATE?',
      answer: 'DELETE removes rows one by one (can use WHERE, logged, triggers fire). TRUNCATE removes all rows instantly (no WHERE, minimal logging, resets auto-increment).',
    },
    {
      question: 'What does GROUP BY do and when is it required?',
      answer: 'GROUP BY groups rows with identical values into summary rows. It\'s required when using aggregate functions (COUNT, SUM) with non-aggregated columns in SELECT.',
    },
  ],
  codeExamples: [
    {
      title: 'SQL Query Examples',
      language: 'sql',
      code: `-- Create tables with constraints
CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    major VARCHAR(50)
);

CREATE TABLE enrollments (
    student_id INT REFERENCES students(id),
    course_id INT,
    grade DECIMAL(3,2),
    PRIMARY KEY (student_id, course_id)
);

-- Query with JOIN and aggregation
SELECT s.name, COUNT(*) as courses, AVG(e.grade) as avg_grade
FROM students s
LEFT JOIN enrollments e ON s.id = e.student_id
GROUP BY s.id, s.name
HAVING COUNT(*) > 3
ORDER BY avg_grade DESC;`,
      explanation: 'SQL combines DDL for structure and DML for data manipulation',
    },
  ],
};
