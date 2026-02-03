import { Topic } from '@/types';

export const automataTheory: Topic = {
  id: 'automata-theory',
  title: 'Automata Theory',
  description: 'Study of abstract machines and computational problems they can solve',
  category: 'theoretical-cs',
  confidence: 'intermediate',
  keyPoints: [
    {
      title: 'Finite Automata (DFA/NFA)',
      description: 'Machines with finite states that recognize regular languages',
    },
    {
      title: 'Regular Expressions',
      description: 'Patterns that describe regular languages, equivalent to finite automata',
    },
    {
      title: 'Pushdown Automata',
      description: 'Automata with a stack, recognize context-free languages',
    },
    {
      title: 'Turing Machines',
      description: 'Universal model of computation with infinite tape and read/write head',
    },
  ],
  quizQuestions: [
    {
      question: 'What is the difference between a DFA and an NFA?',
      answer: 'A DFA (Deterministic Finite Automaton) has exactly one transition per symbol from each state, while an NFA (Nondeterministic) can have zero, one, or multiple transitions per symbol, plus epsilon (empty) transitions.',
    },
    {
      question: 'Why are regular expressions equivalent to finite automata?',
      answer: 'Any regular expression can be converted to an NFA (Thompson\'s construction), and any NFA can be converted to a DFA (subset construction). Both describe exactly the class of regular languages.',
    },
    {
      question: 'What makes a Pushdown Automaton more powerful than a Finite Automaton?',
      answer: 'A Pushdown Automaton has a stack for memory, allowing it to recognize context-free languages like balanced parentheses {a^n b^n}, which finite automata cannot recognize.',
    },
    {
      question: 'What can a Turing Machine do that other automata cannot?',
      answer: 'A Turing Machine has an infinite tape with read/write capability and can move in both directions, making it capable of computing anything that is computable (Church-Turing thesis).',
    },
  ],
  codeExamples: [
    {
      title: 'DFA for strings ending in "01"',
      language: 'text',
      code: `States: {q0, q1, q2}
Alphabet: {0, 1}
Start state: q0
Accept state: q2

Transition function:
δ(q0, 0) = q1    δ(q0, 1) = q0
δ(q1, 0) = q1    δ(q1, 1) = q2
δ(q2, 0) = q1    δ(q2, 1) = q0

Example: "1101" → q0 →1→ q0 →1→ q0 →0→ q1 →1→ q2 ✓`,
      explanation: 'DFA processes input character by character, accepting if it ends in an accept state',
    },
  ],
};
