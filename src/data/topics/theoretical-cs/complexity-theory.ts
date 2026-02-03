import { Topic } from '@/types';

export const complexityTheory: Topic = {
  id: 'complexity-theory',
  title: 'Complexity Theory',
  description: 'Classification of computational problems by resource requirements',
  category: 'theoretical-cs',
  confidence: 'intermediate',
  keyPoints: [
    {
      title: 'P vs NP',
      description: 'P = problems solvable in polynomial time, NP = verifiable in polynomial time',
    },
    {
      title: 'NP-Complete',
      description: 'Hardest problems in NP; if one is in P, then P = NP',
    },
    {
      title: 'Big O Notation',
      description: 'O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)',
    },
    {
      title: 'Reduction',
      description: 'Transforming one problem into another to prove complexity bounds',
    },
  ],
  quizQuestions: [
    {
      question: 'What does it mean for a problem to be in NP?',
      answer: 'A problem is in NP if a proposed solution can be verified in polynomial time. It does NOT mean the problem is hard to solve—P is a subset of NP.',
    },
    {
      question: 'Why is the P vs NP question so important?',
      answer: 'If P = NP, every problem whose solution can be quickly verified could also be quickly solved, breaking most modern cryptography and revolutionizing optimization.',
    },
    {
      question: 'What does it mean to reduce problem A to problem B?',
      answer: 'It means transforming any instance of A into an instance of B in polynomial time. If B can be solved efficiently, so can A. If A is hard, B must also be hard.',
    },
    {
      question: 'What is the significance of the Cook-Levin theorem?',
      answer: 'It proved SAT (Boolean satisfiability) is NP-complete, meaning any NP problem can be reduced to SAT. This established the first NP-complete problem.',
    },
  ],
  codeExamples: [
    {
      title: 'Complexity Classes Hierarchy',
      language: 'text',
      code: `P ⊆ NP ⊆ PSPACE ⊆ EXPTIME

P:        Sorting, Shortest Path, Primality Testing
NP:       SAT, Traveling Salesman (decision), Graph Coloring
NP-Hard:  Halting Problem, Traveling Salesman (optimization)

Cook-Levin Theorem: SAT is NP-complete
→ Any NP problem can be reduced to SAT in polynomial time`,
      explanation: 'Understanding where problems fall in the hierarchy helps choose appropriate algorithms',
    },
  ],
};
