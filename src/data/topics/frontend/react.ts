import { Topic } from '@/types';

export const react: Topic = {
  id: 'react',
  title: 'React',
  description: 'Declarative JavaScript library for building user interfaces',
  category: 'frontend',
  confidence: 'expert',
  keyPoints: [
    {
      title: 'Component Model',
      description: 'Build UIs from isolated, reusable pieces with their own state and logic',
    },
    {
      title: 'Hooks',
      description: 'useState, useEffect, useContext, useReducer, useMemo, useCallback for state and side effects',
    },
    {
      title: 'Virtual DOM',
      description: 'Efficient updates by diffing virtual representation before touching real DOM',
    },
    {
      title: 'State Management',
      description: 'Local state with hooks, global state with Context, Redux, or Zustand',
    },
    {
      title: 'Component Lifecycle',
      description: 'Mount, update, unmount phases managed through useEffect cleanup functions',
    },
  ],
  quizQuestions: [
    {
      question: 'Why does React use a Virtual DOM?',
      answer: 'Real DOM manipulation is slow. React maintains a virtual copy, diffs it with the previous version, and only updates the actual DOM where changes occurred (reconciliation).',
    },
    {
      question: 'What is the difference between useMemo and useCallback?',
      answer: 'useMemo memoizes a computed value. useCallback memoizes a function reference. Both prevent unnecessary recalculations/recreations when dependencies haven\'t changed.',
    },
    {
      question: 'Why do we need a key prop when rendering lists?',
      answer: 'Keys help React identify which items changed, were added, or removed. Without stable keys, React may re-render items unnecessarily or lose component state.',
    },
    {
      question: 'What is the useEffect cleanup function for?',
      answer: 'The cleanup function runs before the effect re-runs and when the component unmounts. Use it to cancel subscriptions, abort fetches, or remove event listeners to prevent memory leaks.',
    },
    {
      question: 'What causes an infinite loop with useEffect?',
      answer: 'When useEffect modifies a dependency that triggers itself again. Example: useEffect(() => setCount(count + 1), [count]) will loop forever.',
    },
  ],
  codeExamples: [
    {
      title: 'Custom Hook for Data Fetching',
      language: 'typescript',
      code: `function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url, { 
          signal: controller.signal 
        });
        const json = await response.json();
        setData(json);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}`,
      explanation: 'Custom hooks encapsulate reusable stateful logic with proper cleanup',
    },
    {
      title: 'Optimized Component',
      language: 'typescript',
      code: `interface ItemProps {
  item: { id: number; name: string };
  onSelect: (id: number) => void;
}

const ListItem = memo(function ListItem({ item, onSelect }: ItemProps) {
  const handleClick = useCallback(() => {
    onSelect(item.id);
  }, [item.id, onSelect]);

  return (
    <li onClick={handleClick}>
      {item.name}
    </li>
  );
});

function ItemList({ items }: { items: ItemProps['item'][] }) {
  const [selected, setSelected] = useState<number | null>(null);
  
  const handleSelect = useCallback((id: number) => {
    setSelected(id);
  }, []);

  return (
    <ul>
      {items.map(item => (
        <ListItem 
          key={item.id} 
          item={item} 
          onSelect={handleSelect}
        />
      ))}
    </ul>
  );
}`,
      explanation: 'memo and useCallback prevent unnecessary re-renders in lists',
    },
  ],
  resources: ['React Documentation', 'React Patterns', 'Kent C. Dodds Blog'],
};
