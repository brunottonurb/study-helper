import { Topic } from '@/types';

export const nextjsConcepts: Topic = {
  id: 'nextjs-concepts',
  title: 'Next.js: Server vs Client Components',
  description: 'Understanding the React Server Components (RSC) architecture in Next.js App Router.',
  category: 'frontend',
  confidence: 'intermediate',
  keyPoints: [
    {
      title: 'Server Components (Default)',
      description: 'Components that render exclusively on the server. They have direct access to backend resources (DB, FS) but cannot use hooks or event listeners.',
    },
    {
      title: 'Client Components',
      description: 'Marked with "use client". Standard React components that are hydrated in the browser. Used for interactivity (useState, useEffect, onClick).',
    },
    {
      title: 'The Boundary',
      description: 'You can import a Client Component into a Server Component, but you cannot import a Server Component into a Client Component.',
    },
  ],
  quizQuestions: [
    {
      question: 'What is the main benefit of Server Components?',
      answer: 'They reduce JavaScript bundle size sent to the client since their code never runs in the browser. They can also directly access backend resources without API calls.',
    },
    {
      question: 'Why can\'t you use useState in a Server Component?',
      answer: 'Server Components render once on the server and send static HTML. They have no browser runtime, so hooks that manage state or effects are meaningless.',
    },
    {
      question: 'What does "use client" directive do?',
      answer: 'It marks a component (and all its imports) as a Client Component. The code is bundled for the browser and can use hooks, event handlers, and browser APIs.',
    },
    {
      question: 'Why are async components possible in Next.js App Router?',
      answer: 'Server Components run in a Node.js environment, so they can await data fetching directly in the component body before rendering, unlike client components.',
    },
  ],
  codeExamples: [
    {
      title: 'Server Component Pattern',
      language: 'typescript',
      code: `// app/page.tsx (Server Component by default)
import db from './db'; 
import LikeButton from './LikeButton'; // Client Component

// Async allows direct data fetching!
export default async function BlogPost({ params }) {
  // Direct backend access
  const post = await db.post.findUnique({ where: { id: params.id } });

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      
      {/* Client Component for interactivity */}
      <LikeButton initialCount={post.likes} />
    </article>
  );
}`,
      explanation: 'Notice how we mix direct database calls (Server) with interactive UI (Client) in one tree.',
    },
    {
      title: 'Client Component Pattern',
      language: 'typescript',
      code: `// components/LikeButton.tsx
'use client'; // Required for hooks

import { useState } from 'react';

export default function LikeButton({ initialCount }) {
  const [likes, setLikes] = useState(initialCount);

  return (
    <button onClick={() => setLikes(likes + 1)}>
      👍 {likes}
    </button>
  );
}`,
      explanation: 'This handles the browser-side logic. It is downloaded by the user.',
    },
  ],
};