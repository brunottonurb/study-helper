import { Topic } from '@/types';

export const floatingPoint: Topic = {
  id: 'floating-point',
  title: 'Floating Point Representation',
  description: 'IEEE 754 standard for representing real numbers in binary',
  category: 'technical-cs',
  confidence: 'advanced',
  keyPoints: [
    {
      title: 'IEEE 754 Format',
      description: 'Sign bit (1) + Exponent (8/11 bits) + Mantissa (23/52 bits) for float/double',
    },
    {
      title: 'Normalized Form',
      description: '(-1)^s × 1.mantissa × 2^(exponent - bias); implicit leading 1',
    },
    {
      title: 'Bias',
      description: 'Single precision: 127, Double precision: 1023. Allows unsigned exponent comparison',
    },
    {
      title: 'Special Values',
      description: 'Zero (exp=0, mant=0), Infinity (exp=all 1s, mant=0), NaN (exp=all 1s, mant≠0)',
    },
    {
      title: 'Precision Limitations',
      description: 'Not all decimals are exactly representable; 0.1 + 0.2 ≠ 0.3 in floating point',
    },
  ],
  quizQuestions: [
    {
      question: 'What are the three components of an IEEE 754 floating point number?',
      answer: 'Sign bit (1 bit), Exponent (8 bits for single, 11 for double), and Mantissa/Significand (23 bits for single, 52 for double).',
    },
    {
      question: 'Why is 0.1 + 0.2 !== 0.3 in JavaScript?',
      answer: '0.1 cannot be exactly represented in binary (it\'s a repeating fraction like 0.0001100110011...). The accumulated rounding errors make the sum slightly more than 0.3.',
    },
    {
      question: 'What is the bias in IEEE 754 and why is it used?',
      answer: 'Bias is 127 (single) or 1023 (double). It\'s added to the actual exponent to store it as an unsigned number, allowing simple comparison of floating point magnitudes.',
    },
    {
      question: 'Why does NaN === NaN return false?',
      answer: 'By IEEE 754 specification, NaN is not equal to anything, including itself. This allows detecting NaN with x !== x. Use Number.isNaN() for explicit checks.',
    },
    {
      question: 'What is the implicit leading 1 in normalized floating point numbers?',
      answer: 'In normalized form, the mantissa always starts with 1.xxxxx, so the leading 1 is not stored, saving one bit. The actual value is 1 + (stored mantissa).',
    },
  ],
  codeExamples: [
    {
      title: 'IEEE 754 Single Precision Breakdown',
      language: 'text',
      code: `32-bit Single Precision (float):
┌───┬──────────┬───────────────────────┐
│ S │ Exponent │       Mantissa        │
│ 1 │  8 bits  │       23 bits         │
└───┴──────────┴───────────────────────┘

Example: Represent -6.625

Step 1: Convert to binary
   6.625 = 110.101 (binary)

Step 2: Normalize
   110.101 = 1.10101 × 2²

Step 3: Determine components
   Sign = 1 (negative)
   Exponent = 2 + 127 (bias) = 129 = 1000 0001
   Mantissa = 10101000000000000000000 (implicit 1 dropped)

Result: 1 10000001 10101000000000000000000
        = 0xC0D40000`,
      explanation: 'The leading 1 is implicit in normalized numbers, saving one bit',
    },
    {
      title: 'Special Values & Precision',
      language: 'javascript',
      code: `// IEEE 754 special values
console.log(1 / 0);          // Infinity
console.log(-1 / 0);         // -Infinity
console.log(0 / 0);          // NaN
console.log(Math.sqrt(-1));  // NaN
console.log(NaN === NaN);    // false (NaN is not equal to itself!)

// Precision issues
console.log(0.1 + 0.2);      // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3);  // false!

// Why? 0.1 in binary is repeating:
// 0.1 ≈ 0.0001100110011001100110011...

// Safe comparison with epsilon
const EPSILON = Number.EPSILON; // ~2.22e-16
function nearlyEqual(a, b) {
  return Math.abs(a - b) < EPSILON;
}
console.log(nearlyEqual(0.1 + 0.2, 0.3)); // true`,
      explanation: 'Always use epsilon comparison for floating point equality checks',
    },
  ],
  resources: ['IEEE 754-2019 Standard', 'What Every Computer Scientist Should Know About Floating-Point Arithmetic'],
};
