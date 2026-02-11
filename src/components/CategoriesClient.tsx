'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CategoryCard, CategoryForm, Modal } from '@/components';
import { Category } from '@/types';
import { createCategory } from '@/lib/api-client';

interface CategoriesClientProps {
  initialCategories: Category[];
  topicCounts: Record<string, number>;
}

export function CategoriesClient({ initialCategories, topicCounts }: CategoriesClientProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = async (category: Category) => {
    await createCategory(category);
    setIsModalOpen(false);
    router.refresh();
  };

  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[var(--ink)] mb-3">All Subjects</h1>
          <p className="text-[var(--ink-light)] leading-relaxed">
            Browse through different areas of study. Each subject contains 
            notes with key concepts and examples.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-sm text-white bg-[var(--accent)] hover:bg-[var(--accent-dark)] rounded transition-colors"
        >
          + New Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {initialCategories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            topicCount={topicCounts[category.id] || 0}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Category"
      >
        <CategoryForm
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
}
