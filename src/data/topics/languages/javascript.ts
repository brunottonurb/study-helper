import { Topic } from '@/types';

export const javascript: Topic = {
  id: 'javascript',
  title: 'JavaScript',
  description: 'Dynamic, interpreted programming language for web development and beyond',
  category: 'languages',
  confidence: 'expert',
  keyPoints: [
    {
      title: 'Event Loop & Async',
      description: 'Single-threaded with non-blocking I/O using callbacks, promises, and async/await',
    },
    {
      title: 'Closures',
      description: 'Functions that capture and remember their lexical scope even when executed outside it',
    },
    {
      title: 'Prototypal Inheritance',
      description: 'Objects inherit directly from other objects via the prototype chain',
    },
    {
      title: 'ES6+ Features',
      description: 'Arrow functions, destructuring, spread operator, modules, classes, template literals',
    },
    {
      title: 'Hoisting',
      description: 'Variable and function declarations are moved to the top of their scope during compilation',
    },
  ],
  quizQuestions: [
    {
      question: 'What is a closure and why is it useful?',
      answer: 'A closure is a function that retains access to its outer scope\'s variables even after the outer function returns. Useful for data privacy, factory functions, and maintaining state.',
    },
    {
      question: 'How does the JavaScript event loop work?',
      answer: 'The event loop continuously checks the call stack. When empty, it moves callbacks from the task queue (macrotasks) or microtask queue (promises) to the stack for execution.',
    },
    {
      question: 'What is the difference between var, let, and const?',
      answer: 'var is function-scoped and hoisted. let and const are block-scoped. const cannot be reassigned (but objects/arrays can still be mutated). let can be reassigned.',
    },
    {
      question: 'Why do Promises resolve before setTimeout(..., 0)?',
      answer: 'Promise callbacks go to the microtask queue, which has higher priority than the macrotask queue (where setTimeout goes). Microtasks run after each task, before the next macrotask.',
    },
    {
      question: 'What is the difference between == and ===?',
      answer: '== performs type coercion before comparison (1 == "1" is true). === compares without coercion, requiring both value and type to match (1 === "1" is false).',
    },
  ],
  codeExamples: [
    {
      title: 'Async/Await Pattern',
      language: 'javascript',
      code: `async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    if (!response.ok) throw new Error('User not found');
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}

// Usage with Promise.all for parallel requests
const [user, posts] = await Promise.all([
  fetchUserData(1),
  fetch('/api/posts').then(r => r.json())
]);`,
      explanation: 'Async/await provides cleaner syntax for handling promises',
    },
    {
      title: 'Closure Example',
      language: 'javascript',
      code: `function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.getCount();  // 2`,
      explanation: 'The inner functions maintain access to count even after createCounter returns',
    },
  ],
  resources: ['MDN Web Docs', 'JavaScript.info', 'You Don\'t Know JS book series'],
};
