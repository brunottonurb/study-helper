import { Topic } from '@/types';

export const formalLanguages: Topic = {
  id: 'formal-languages',
  title: 'Formal Languages & Grammars',
  description: 'Mathematical framework for describing languages and their structure',
  category: 'theoretical-cs',
  confidence: 'intermediate',
  keyPoints: [
    {
      title: 'Chomsky Hierarchy',
      description: 'Type 0 (unrestricted) → Type 1 (context-sensitive) → Type 2 (context-free) → Type 3 (regular)',
    },
    {
      title: 'Context-Free Grammars',
      description: 'Productions of form A → α, used for programming language syntax',
    },
    {
      title: 'Parsing',
      description: 'LL (top-down) and LR (bottom-up) parsing techniques',
    },
    {
      title: 'Pumping Lemma',
      description: 'Tool to prove a language is NOT regular or context-free',
    },
  ],
  quizQuestions: [
    {
      question: 'What are the four levels of the Chomsky Hierarchy from most to least powerful?',
      answer: 'Type 0 (recursively enumerable, Turing machines) → Type 1 (context-sensitive) → Type 2 (context-free, pushdown automata) → Type 3 (regular, finite automata).',
    },
    {
      question: 'Why are context-free grammars used for programming language syntax?',
      answer: 'CFGs can express nested structures like balanced parentheses, if-else blocks, and function calls. They\'re powerful enough for most syntax but can be parsed efficiently.',
    },
    {
      question: 'What is the difference between LL and LR parsing?',
      answer: 'LL parses top-down (starts from start symbol, predicts productions). LR parses bottom-up (starts from input, reduces to start symbol). LR is more powerful but complex.',
    },
    {
      question: 'How does the Pumping Lemma work to prove a language is not regular?',
      answer: 'For any regular language, strings longer than a certain length can be "pumped" (a middle section repeated) while staying in the language. If pumping breaks membership, the language isn\'t regular.',
    },
  ],
  codeExamples: [
    {
      title: 'Context-Free Grammar for Arithmetic',
      language: 'text',
      code: `Grammar for simple arithmetic expressions:

E → E + T | E - T | T
T → T * F | T / F | F  
F → ( E ) | number

Derivation of "3 + 4 * 5":
E → E + T → T + T → F + T → 3 + T
  → 3 + T * F → 3 + F * F → 3 + 4 * F → 3 + 4 * 5

Parse tree respects operator precedence (* before +)`,
      explanation: 'CFGs define the syntax of most programming languages',
    },
  ],
};
