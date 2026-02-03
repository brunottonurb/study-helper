import { CategoryCard } from '@/components';
import { categories, getTopicsByCategory } from '@/data/knowledge';

export const metadata = {
  title: 'Subjects - Study Notes',
  description: 'Browse all study subjects',
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-10">
          <h1 className="text-2xl font-serif font-bold text-[var(--ink)] mb-3">All Subjects</h1>
          <p className="text-[var(--ink-light)] leading-relaxed">
            Browse through different areas of study. Each subject contains 
            notes with key concepts and examples.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              topicCount={getTopicsByCategory(category.id).length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
