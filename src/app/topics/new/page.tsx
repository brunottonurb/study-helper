import { Suspense } from 'react';
import NewTopicForm from './NewTopicForm';

function FormSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-[var(--border)] rounded w-1/4" />
        <div className="h-12 bg-[var(--border)] rounded w-1/3" />
        <div className="space-y-3">
          <div className="h-10 bg-[var(--border)] rounded" />
          <div className="h-10 bg-[var(--border)] rounded" />
          <div className="h-32 bg-[var(--border)] rounded" />
        </div>
      </div>
    </div>
  );
}

export default function NewTopicPage() {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <NewTopicForm />
    </Suspense>
  );
}
