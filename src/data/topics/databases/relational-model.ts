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
      description: 'In the relational model, data is organized into **relations** (tables). A relation has a **schema** (name + attributes with domains) and an **instance** (the current set of tuples/rows). Key properties: tuples are **unordered** (no inherent row order), attributes are **unordered** (columns have no position), each tuple is **unique** (no duplicate rows), and attribute values are **atomic** (indivisible). A **domain** defines the legal values for an attribute (e.g., integers, strings of length ≤ 100). The **degree** of a relation is the number of attributes; the **cardinality** is the number of tuples.',
    },
    {
      title: 'Keys',
      description: 'Keys enforce uniqueness and relationships:\n\n- **Superkey**: any set of attributes that uniquely identifies tuples\n- **Candidate key**: a *minimal* superkey (removing any attribute loses uniqueness)\n- **Primary key**: the chosen candidate key for a table (cannot be NULL)\n- **Foreign key**: an attribute (or set) that references the primary key of another table, establishing **referential relationships**\n- **Composite key**: a key consisting of multiple attributes\n- **Surrogate key**: an artificial identifier (auto-increment ID, UUID) with no business meaning\n- **Natural key**: a key with real-world meaning (SSN, email)\n\nSurrogate keys are popular because they\'re **immutable** and **compact**, while natural keys may change (name changes, email updates) and can be large.',
    },
    {
      title: 'Relational Algebra',
      description: 'A **procedural query language** that forms the theoretical foundation of SQL. Operations take relations as input and produce relations as output (**closure property**). Core operations:\n\n- **Selection (σ)**: filter rows by condition — `σ_age>21(Students)`\n- **Projection (π)**: select columns — `π_name,major(Students)`\n- **Union (∪)**: combine rows from two union-compatible relations\n- **Set Difference (−)**: rows in first relation but not in second\n- **Cartesian Product (×)**: all combinations of rows from two relations\n- **Rename (ρ)**: rename relations or attributes\n\nDerived operations built from these: **Join (⋈)** = σ(×), **Intersection (∩)** = R − (R − S), **Division (÷)** = "for all" queries. The algebra is **relationally complete** — it can express any query that the relational calculus can.',
    },
    {
      title: 'Integrity Constraints',
      description: 'Rules that maintain data quality and consistency:\n\n- **Domain constraints**: attribute values must belong to their declared domain (type checking)\n- **Entity integrity**: **primary key values cannot be NULL** — every tuple must be uniquely identifiable\n- **Referential integrity**: **foreign key values must match** an existing primary key value in the referenced table, or be NULL. Actions on violation: `CASCADE` (propagate delete/update), `SET NULL`, `SET DEFAULT`, `RESTRICT` (reject)\n- **Key constraints**: candidate key values must be unique across all tuples\n- **Check constraints**: custom boolean expressions that must hold for every tuple (e.g., `age >= 0`)\n- **Assertions**: database-level constraints spanning multiple tables (rarely supported in practice)\n- **Triggers**: procedural code executed automatically on INSERT/UPDATE/DELETE events',
    },
    {
      title: 'Relational Calculus',
      description: 'A **declarative** (non-procedural) query language — you specify *what* data you want, not *how* to get it. Two forms:\n\n- **Tuple relational calculus (TRC)**: variables range over tuples — `{ t | Student(t) AND t.age > 21 }` ("the set of tuples t from Student where age > 21")\n- **Domain relational calculus (DRC)**: variables range over domain values — `{ <n, a> | ∃m (Student(n, a, m) AND a > 21) }`\n\n**Codd\'s theorem**: relational algebra and relational calculus (with safe expressions) are **equivalent in expressive power**. SQL is primarily based on TRC with algebra-inspired syntax. The calculus is "relationally complete" and serves as the standard for measuring query language power.',
    },
    {
      title: 'Codd\'s 12 Rules',
      description: 'Edgar F. Codd defined **12 rules** (plus Rule 0) that a true RDBMS must satisfy:\n\n- **Rule 0**: must use relational facilities exclusively to manage data\n- **Rule 1** (Information): all data represented as values in tables\n- **Rule 2** (Guaranteed Access): every value accessible by table name + primary key + column name\n- **Rule 3** (Systematic Treatment of Null): NULL represents missing/inapplicable data systematically\n- **Rule 6** (Updatable Views): all theoretically updatable views must be updatable by the system\n- **Rule 8** (Physical Data Independence): changes to physical storage don\'t affect applications\n- **Rule 9** (Logical Data Independence): changes to logical schema don\'t break applications unnecessarily\n\nNo commercial RDBMS fully satisfies all 12 rules, but they serve as the **ideal** for relational system design.',
    },
  ],
  quizQuestions: [
    {
      question: 'What is the difference between a Primary Key and a Foreign Key?',
      answer: 'A Primary Key uniquely identifies each row in its own table (must be unique and not null). A Foreign Key references the Primary Key of another table, establishing a relationship. Foreign keys may be null (optional relationship) and multiple rows can share the same foreign key value.',
    },
    {
      question: 'What does the Selection (σ) operation do in relational algebra?',
      answer: 'Selection filters rows based on a condition, like a WHERE clause in SQL. It takes a relation and returns a subset of tuples that satisfy the condition. σ_age>21(Students) returns only students older than 21.',
    },
    {
      question: 'What is referential integrity and why is it important?',
      answer: 'Referential integrity ensures that foreign key values either match an existing primary key in the referenced table or are null. It prevents orphaned records (references to non-existent data) and maintains consistent relationships between tables.',
    },
    {
      question: 'What is the difference between a candidate key and a superkey?',
      answer: 'A superkey is any set of attributes that uniquely identifies tuples — it may contain extra attributes. A candidate key is a minimal superkey — removing any attribute would lose uniqueness. For example, {SSN, name} is a superkey but {SSN} alone is a candidate key.',
    },
    {
      question: 'What is the closure property in relational algebra?',
      answer: 'The closure property means every relational algebra operation takes relations as input and produces a relation as output. This allows operations to be composed and nested arbitrarily, enabling complex queries from simple building blocks.',
    },
    {
      question: 'What is Codd\'s theorem?',
      answer: 'Codd\'s theorem proves that relational algebra and (safe) relational calculus are equivalent in expressive power. Any query expressible in one can be expressed in the other. This establishes a standard for "relational completeness" — a query language is complete if it\'s at least as powerful as relational algebra.',
    },
    {
      question: 'What is the difference between a natural key and a surrogate key?',
      answer: 'A natural key uses a real-world attribute (SSN, email, ISBN) that has inherent meaning. A surrogate key is an artificial, system-generated identifier (auto-increment integer, UUID) with no business meaning. Surrogates are preferred because they\'re immutable, compact, and don\'t change with business rules.',
    },
    {
      question: 'What happens when you delete a row referenced by a foreign key?',
      answer: 'It depends on the referential action specified: CASCADE deletes the referencing rows too, SET NULL sets the FK to null, SET DEFAULT sets it to a default value, RESTRICT (or NO ACTION) prevents the deletion. The choice depends on business rules for the relationship.',
    },
    {
      question: 'How does a JOIN relate to Cartesian Product and Selection?',
      answer: 'A join is equivalent to a Cartesian product followed by a selection: A ⋈ B = σ_condition(A × B). The Cartesian product creates all possible combinations, then the selection keeps only matching pairs. This is how query optimizers may decompose joins internally.',
    },
    {
      question: 'What is the difference between relational algebra and relational calculus?',
      answer: 'Relational algebra is procedural — you specify the sequence of operations to perform. Relational calculus is declarative — you describe what the result should look like without specifying how to compute it. They\'re equivalent in expressive power per Codd\'s theorem.',
    },
    {
      question: 'Why must primary keys be non-null (entity integrity)?',
      answer: 'The primary key uniquely identifies each tuple. If it were null, we couldn\'t distinguish or reference that tuple — it would be an unidentifiable entity. This would break the fundamental guarantee that every row in a relation is uniquely accessible.',
    },
    {
      question: 'What is the difference between a relation and a table in practice?',
      answer: 'In theory, a relation is a set of tuples (no duplicates, no order). In practice, SQL tables allow duplicate rows (without a key constraint) and have a physical row order. SQL tables are "bags" (multisets) rather than true sets, which is why DISTINCT exists.',
    },
  ],
  codeExamples: [
    {
      title: 'Relational Algebra Operations',
      language: 'text',
      code: `Tables:
Student(id, name, major)
Enrollment(student_id, course_id, grade)

Selection (σ): Filter rows
  σ_major='CS'(Student)
  → Students majoring in CS

Projection (π): Select columns
  π_name,major(Student)
  → Only name and major columns

Cartesian Product (×):
  Student × Enrollment
  → Every student paired with every enrollment (usually huge!)

Join (⋈): Combine matching rows
  Student ⋈_{id=student_id} Enrollment
  → Student info paired with their enrollments only
  → Equivalent to: σ_{id=student_id}(Student × Enrollment)

Set Operations (union-compatible relations):
  π_name(σ_major='CS'(Student)) ∪ π_name(σ_major='Math'(Student))
  → Names of CS or Math students

Equivalent SQL:
  SELECT name, course_id
  FROM Student JOIN Enrollment ON id = student_id
  WHERE major = 'CS';`,
      explanation: 'Relational algebra provides the theoretical foundation for SQL. Query optimizers internally convert SQL into relational algebra expressions for optimization.',
    },
    {
      title: 'Key Types and Constraints',
      language: 'sql',
      code: `-- Primary key: uniquely identifies each row
CREATE TABLE students (
    id SERIAL PRIMARY KEY,           -- surrogate key
    ssn CHAR(11) UNIQUE NOT NULL,    -- natural candidate key
    email VARCHAR(100) UNIQUE,       -- another candidate key
    name VARCHAR(100) NOT NULL
);

-- Foreign key with referential actions
CREATE TABLE enrollments (
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    grade DECIMAL(3,2),
    
    PRIMARY KEY (student_id, course_id),  -- composite key
    
    FOREIGN KEY (student_id) REFERENCES students(id)
        ON DELETE CASCADE              -- delete enrollments too
        ON UPDATE CASCADE,             -- update FK if PK changes
    
    FOREIGN KEY (course_id) REFERENCES courses(id)
        ON DELETE RESTRICT             -- can't delete referenced course
);

-- Check constraints
ALTER TABLE students 
    ADD CONSTRAINT chk_ssn 
    CHECK (ssn ~ '^[0-9]{3}-[0-9]{2}-[0-9]{4}$');`,
      explanation: 'Keys and constraints enforce data integrity at the database level, preventing invalid data regardless of application code correctness.',
    },
    {
      title: 'Relational Calculus vs Algebra',
      language: 'text',
      code: `Query: "Names of CS students enrolled in course 101"

Relational Algebra (procedural — HOW):
  Step 1: Join Student and Enrollment
    temp1 ← Student ⋈_{id=student_id} Enrollment
  Step 2: Filter by major and course
    temp2 ← σ_{major='CS' ∧ course_id=101}(temp1)
  Step 3: Project name only
    result ← π_name(temp2)

  Combined: π_name(σ_{major='CS' ∧ course_id=101}(
                Student ⋈_{id=student_id} Enrollment))

Tuple Relational Calculus (declarative — WHAT):
  { t.name | Student(t) ∧ 
             ∃e(Enrollment(e) ∧ 
                e.student_id = t.id ∧
                t.major = 'CS' ∧ 
                e.course_id = 101) }

SQL (based on TRC):
  SELECT s.name
  FROM Student s
  WHERE s.major = 'CS'
    AND EXISTS (
      SELECT 1 FROM Enrollment e
      WHERE e.student_id = s.id
        AND e.course_id = 101
    );

All three express the same query!`,
      explanation: 'Relational algebra, calculus, and SQL are different ways to express the same queries. The optimizer converts SQL (declarative) into an algebra-based execution plan (procedural).',
    },
  ],
};
