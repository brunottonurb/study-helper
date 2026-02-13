import { CategoryCard } from '@/components';
import { getAllCategories, getAllTopics } from '@/lib/data';

export const metadata = {
  title: 'Subjects - Study Notes',
  description: 'Browse all study subjects',
};

export default async function CategoriesPage() {
  const [categories, topics] = await Promise.all([
    getAllCategories(),
    getAllTopics(),
  ]);

  const topicCountByCategory = topics.reduce((acc, topic) => {
    acc[topic.category] = (acc[topic.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

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
              topicCount={topicCountByCategory[category.id] || 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
