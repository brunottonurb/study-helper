import { Topic } from '@/types';

export const typescript: Topic = {
  id: 'typescript',
  title: 'TypeScript',
  description: 'Typed superset of JavaScript that compiles to plain JavaScript',
  category: 'languages',
  confidence: 'expert',
  keyPoints: [
    {
      title: 'Static Type System',
      description: 'Catch errors at compile time with type annotations and inference',
    },
    {
      title: 'Interfaces & Types',
      description: 'Define contracts for object shapes, function signatures, and custom types',
    },
    {
      title: 'Generics',
      description: 'Create reusable components that work with multiple types while maintaining type safety',
    },
    {
      title: 'Union & Intersection Types',
      description: 'Combine types with | (union) or & (intersection) for flexible type definitions',
    },
    {
      title: 'Type Guards',
      description: 'Narrow types at runtime using typeof, instanceof, or custom predicates',
    },
  ],
  quizQuestions: [
    {
      question: 'What is the difference between interface and type in TypeScript?',
      answer: 'Both define object shapes, but interfaces can be extended/merged (declaration merging), while types can represent unions, primitives, and tuples. Use interface for objects, type for unions.',
    },
    {
      question: 'What are generics and why are they useful?',
      answer: 'Generics allow creating reusable components that work with multiple types while maintaining type safety. Example: Array<T> works with any type T without losing type information.',
    },
    {
      question: 'What is a discriminated union and when would you use it?',
      answer: 'A union of types that share a common literal property (discriminant). TypeScript can narrow the type based on checking this property. Useful for state machines and result types.',
    },
    {
      question: 'What does the unknown type do vs any?',
      answer: 'unknown is type-safe—you must narrow it before use (with type guards). any bypasses type checking entirely. Prefer unknown for values of uncertain type.',
    },
    {
      question: 'What is the difference between never and void?',
      answer: 'void means a function returns undefined (or nothing). never means a function never returns (throws error or infinite loop). never is the bottom type, assignable to nothing.',
    },
  ],
  codeExamples: [
    {
      title: 'Generic Utility Function',
      language: 'typescript',
      code: `interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

async function fetchApi<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  const data = await response.json();
  return {
    data: data as T,
    status: response.status,
    message: response.ok ? 'Success' : 'Error'
  };
}

// Usage with type inference
interface User {
  id: number;
  name: string;
  email: string;
}

const result = await fetchApi<User>('/api/user/1');
console.log(result.data.name); // TypeScript knows this is a string`,
      explanation: 'Generics allow type-safe reusable functions',
    },
    {
      title: 'Discriminated Unions',
      language: 'typescript',
      code: `type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

function processResult<T>(result: Result<T>): T | null {
  if (result.success) {
    return result.data; // TypeScript knows data exists
  }
  console.error(result.error); // TypeScript knows error exists
  return null;
}`,
      explanation: 'Discriminated unions enable exhaustive type checking',
    },
  ],
  resources: ['TypeScript Handbook', 'TypeScript Deep Dive'],
};
