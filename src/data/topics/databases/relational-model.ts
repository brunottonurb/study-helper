import { Topic } from '@/types';

export const relationalModel: Topic = {
  id: 'relational-model',
  title: 'Relational Model',
  description: 'Foundation of relational database systems',
  category: 'databases',
  confidence: 'intermediate',
  keyPoints: [
    {
      title: 'Relations (Tables)',
      description: 'Set of tuples with attributes; each row is unique',
    },
    {
      title: 'Keys',
      description: 'Primary key (unique identifier), Foreign key (references other table)',
    },
    {
      title: 'Relational Algebra',
      description: 'Select (σ), Project (π), Join (⋈), Union (∪), Difference (−)',
    },
    {
      title: 'Integrity Constraints',
      description: 'Entity integrity (PK not null), Referential integrity (FK valid)',
    },
  ],
  quizQuestions: [
    {
      question: 'What is the difference between a Primary Key and a Foreign Key?',
      answer: 'A Primary Key uniquely identifies each row in its own table (must be unique and not null). A Foreign Key references the Primary Key of another table, establishing relationships between tables.',
    },
    {
      question: 'What does the Selection (σ) operation do in relational algebra?',
      answer: 'Selection filters rows based on a condition, like a WHERE clause in SQL. It takes a relation and returns a subset of tuples that satisfy the condition.',
    },
    {
      question: 'What is referential integrity and why is it important?',
      answer: 'Referential integrity ensures that Foreign Key values either match an existing Primary Key or are null. It prevents orphaned records and maintains consistent relationships between tables.',
    },
  ],
  codeExamples: [
    {
      title: 'Relational Algebra Operations',
      language: 'text',
      code: `Tables:
Student(id, name, major)
Enrollment(student_id, course_id, grade)

Operations:

Selection (σ): Filter rows
σ_major='CS'(Student)
→ Students majoring in CS

Projection (π): Select columns  
π_name,major(Student)
→ Only name and major columns

Join (⋈): Combine tables
Student ⋈_id=student_id Enrollment
→ Student info with their enrollments

Equivalent SQL:
SELECT name, course_id 
FROM Student JOIN Enrollment ON id = student_id
WHERE major = 'CS'`,
      explanation: 'Relational algebra is the theoretical foundation for SQL queries',
    },
  ],
};
