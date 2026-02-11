'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TopicCard, CategoryForm, TopicForm, Modal } from '@/components';
import { Category, Topic } from '@/types';
import { updateCategory, deleteCategory, createTopic } from '@/lib/api-client';

interface CategoryClientProps {
  category: Category;
  categoryTopics: Topic[];
  allCategories: Category[];
}

export function CategoryClient({ category, categoryTopics, allCategories }: CategoryClientProps) {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewTopicModalOpen, setIsNewTopicModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = async (updatedCategory: Category) => {
    await updateCategory(category.id, updatedCategory);
    setIsEditModalOpen(false);
    router.refresh();
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete the category "${category.name}"? This will NOT delete the topics in this category.`)) {
      return;
    }
    setIsDeleting(true);
    try {
      await deleteCategory(category.id);
      router.push('/categories');
      router.refresh();
    } catch (error) {
      alert('Failed to delete category');
      setIsDeleting(false);
    }
  };

  const handleCreateTopic = async (topic: Topic) => {
    await createTopic(topic);
    setIsNewTopicModalOpen(false);
    router.refresh();
  };

  return (
    <>
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-[var(--ink-light)] mb-8">
        <Link href="/" className="hover:text-[var(--ink)] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-[var(--ink)] transition-colors">Subjects</Link>
        <span>/</span>
        <span className="text-[var(--ink)]">{category.name}</span>
      </nav>

      {/* Header with Edit Controls */}
      <div className="mb-10 pb-8 border-b border-[var(--border)]">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{category.icon}</span>
            <h1 className="text-2xl font-serif font-bold text-[var(--ink)]">{category.name}</h1>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-3 py-1 text-sm text-[var(--accent)] border border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white rounded transition-colors"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-3 py-1 text-sm text-red-600 border border-red-600 hover:bg-red-600 hover:text-white rounded transition-colors disabled:opacity-50"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
        <p className="text-[var(--ink-light)] leading-relaxed">{category.description}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="text-sm text-[var(--ink-light)]">
            {categoryTopics.length} {categoryTopics.length === 1 ? 'topic' : 'topics'} in this subject
          </div>
          <button
            onClick={() => setIsNewTopicModalOpen(true)}
            className="px-3 py-1 text-sm text-white bg-[var(--accent)] hover:bg-[var(--accent-dark)] rounded transition-colors"
          >
            + New Topic
          </button>
        </div>
      </div>

      {/* Topics Grid */}
      {categoryTopics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categoryTopics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-[var(--ink-light)] mb-4">No notes in this subject yet.</p>
          <button
            onClick={() => setIsNewTopicModalOpen(true)}
            className="text-sm text-[var(--accent)] hover:underline"
          >
            Create your first topic
          </button>
        </div>
      )}

      {/* Edit Category Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Category"
      >
        <CategoryForm
          category={category}
          onSave={handleUpdate}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>

      {/* New Topic Modal */}
      <Modal
        isOpen={isNewTopicModalOpen}
        onClose={() => setIsNewTopicModalOpen(false)}
        title="Create New Topic"
      >
        <TopicForm
          categories={allCategories}
          onSave={handleCreateTopic}
          onCancel={() => setIsNewTopicModalOpen(false)}
        />
      </Modal>
    </>
  );
}
