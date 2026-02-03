import { Topic } from '@/types';

export const twosComplement: Topic = {
  id: 'twos-complement',
  title: "Two's Complement & One's Complement",
  description: 'Binary number representations for signed integers in computer systems',
  category: 'technical-cs',
  confidence: 'advanced',
  keyPoints: [
    {
      title: "One's Complement",
      description: 'Flip all bits to represent negative numbers; has two representations for zero (+0 and -0)',
    },
    {
      title: "Two's Complement",
      description: "Flip all bits and add 1; most common representation for signed integers in modern systems",
    },
    {
      title: 'Range',
      description: 'For n bits: -2^(n-1) to 2^(n-1)-1. Example: 8-bit signed = -128 to +127',
    },
    {
      title: 'Sign Extension',
      description: 'Extend MSB when converting to larger bit width to preserve value',
    },
    {
      title: 'Overflow Detection',
      description: 'Occurs when sign of result differs from expected; check carry into vs out of MSB',
    },
  ],
  quizQuestions: [
    {
      question: "How do you convert a positive number to its negative in two's complement?",
      answer: "Flip all bits (one's complement) and add 1. For example, +5 (0000 0101) → flip → (1111 1010) → add 1 → (1111 1011) = -5.",
    },
    {
      question: "Why is two's complement preferred over one's complement?",
      answer: "Two's complement has a single representation for zero (no +0 and -0), and arithmetic operations work without special handling for negative numbers.",
    },
    {
      question: 'What is the range of an 8-bit signed integer in two\'s complement?',
      answer: '-128 to +127. The formula is -2^(n-1) to 2^(n-1)-1, so for 8 bits: -2^7 to 2^7-1 = -128 to 127.',
    },
    {
      question: 'How do you detect overflow in two\'s complement addition?',
      answer: 'Overflow occurs when adding two positive numbers gives a negative result, or adding two negative numbers gives a positive result. Technically, when carry into MSB ≠ carry out of MSB.',
    },
  ],
  codeExamples: [
    {
      title: "Two's Complement Conversion",
      language: 'text',
      code: `Converting -5 to 8-bit two's complement:

Step 1: Write +5 in binary
   +5 = 0000 0101

Step 2: Flip all bits (one's complement)
        1111 1010

Step 3: Add 1
        1111 1010
      +         1
        ---------
        1111 1011  ← This is -5 in two's complement

Verification: 1111 1011
  = -128 + 64 + 32 + 16 + 8 + 0 + 2 + 1
  = -128 + 123
  = -5 ✓`,
      explanation: "Two's complement allows addition/subtraction with same circuitry",
    },
    {
      title: 'Arithmetic Examples',
      language: 'text',
      code: `8-bit two's complement arithmetic:

Example 1: 5 + (-3) = 2
   0000 0101  (+5)
 + 1111 1101  (-3)
   ---------
   0000 0010  (+2) ✓  (carry out discarded)

Example 2: -5 + (-3) = -8
   1111 1011  (-5)
 + 1111 1101  (-3)
   ---------
   1111 1000  (-8) ✓

One's complement comparison:
   +0 = 0000 0000
   -0 = 1111 1111  ← Two zeros is problematic!

Two's complement:
   +0 = 0000 0000
   -0 = 0000 0000  ← Single zero representation`,
      explanation: "Two's complement eliminated the dual-zero problem of one's complement",
    },
  ],
  resources: ['Computer Organization and Design - Patterson & Hennessy'],
};
