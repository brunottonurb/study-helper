'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CodeBlock, FavoriteButton, TopicForm, Modal } from '@/components';
import { Topic, Category } from '@/types';
import { updateTopic, deleteTopic } from '@/lib/api-client';

const confidenceLabels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
};

interface TopicClientProps {
  topic: Topic;
  category: Category | undefined;
  allCategories: Category[];
}

export function TopicClient({ topic, category, allCategories }: TopicClientProps) {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = async (updatedTopic: Topic) => {
    await updateTopic(topic.id, updatedTopic);
    setIsEditModalOpen(false);
    router.refresh();
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete the topic "${topic.title}"?`)) {
      return;
    }
    setIsDeleting(true);
    try {
      await deleteTopic(topic.id);
      router.push(`/categories/${topic.category}`);
      router.refresh();
    } catch (error) {
      alert('Failed to delete topic');
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-[var(--ink-light)] mb-8">
        <Link href="/" className="hover:text-[var(--ink)] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-[var(--ink)] transition-colors">Subjects</Link>
        <span>/</span>
        {category && (
          <>
            <Link href={`/categories/${category.id}`} className="hover:text-[var(--ink)] transition-colors">
              {category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-[var(--ink)]">{topic.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-10 pb-8 border-b border-[var(--border)]">
        <div className="flex items-start justify-between mb-3">
          <h1 className="text-3xl font-serif font-bold text-[var(--ink)]">{topic.title}</h1>
          <div className="flex items-center space-x-2">
            <FavoriteButton topicId={topic.id} />
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-3 py-1 text-xs text-[var(--accent)] border border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white rounded transition-colors"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-3 py-1 text-xs text-red-600 border border-red-600 hover:bg-red-600 hover:text-white rounded transition-colors disabled:opacity-50"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
            <span className="text-xs text-[var(--ink-light)] font-mono border border-[var(--border)] px-2 py-1 bg-[var(--paper)]">
              {confidenceLabels[topic.confidence]}
            </span>
          </div>
        </div>
        <p className="text-lg text-[var(--ink-light)] leading-relaxed">{topic.description}</p>
      </header>

      {/* Key Points */}
      <section className="mb-10">
        <h2 className="text-xl font-serif font-semibold text-[var(--ink)] mb-5 pb-2 border-b border-[var(--border)]">
          Key Points
        </h2>
        <div className="space-y-4">
          {topic.keyPoints.map((point, idx) => (
            <div
              key={idx}
              className="bg-[var(--paper)] border border-[var(--border)] p-4 paper-shadow"
            >
              <h3 className="font-serif font-semibold text-[var(--ink)] mb-1">{point.title}</h3>
              <p className="text-[var(--ink-light)] text-sm leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Code Examples */}
      {topic.codeExamples.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-serif font-semibold text-[var(--ink)] mb-5 pb-2 border-b border-[var(--border)]">
            Examples
          </h2>
          <div className="space-y-6">
            {topic.codeExamples.map((example, idx) => (
              <CodeBlock key={idx} example={example} />
            ))}
          </div>
        </section>
      )}

      {/* Resources */}
      {topic.resources && topic.resources.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-serif font-semibold text-[var(--ink)] mb-5 pb-2 border-b border-[var(--border)]">
            References
          </h2>
          <ul className="space-y-2">
            {topic.resources.map((resource, idx) => (
              <li key={idx} className="flex items-center text-[var(--ink-light)] text-sm">
                <span className="mr-3 text-[var(--ink-light)]">•</span>
                {resource}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Navigation */}
      <div className="border-t border-[var(--border)] pt-8 mt-10">
        <Link
          href={`/categories/${topic.category}`}
          className="inline-flex items-center text-[var(--accent)] hover:underline text-sm"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
          Back to {category?.name || 'Subject'}
        </Link>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Topic"
      >
        <TopicForm
          topic={topic}
          categories={allCategories}
          onSave={handleUpdate}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>
    </>
  );
}
