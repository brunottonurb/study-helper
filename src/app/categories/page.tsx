import { CategoriesClient } from '@/components/CategoriesClient';
import { readCategories, readTopics } from '@/lib/data-store';
import { getTopicsByCategory } from '@/lib/data-utils';

export const metadata = {
  title: 'Subjects - Study Notes',
  description: 'Browse all study subjects',
};

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  const categories = await readCategories();
  const topics = await readTopics();
  
  // Calculate topic counts for each category
  const topicCounts: Record<string, number> = {};
  categories.forEach(category => {
    topicCounts[category.id] = getTopicsByCategory(topics, category.id).length;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
        <CategoriesClient initialCategories={categories} topicCounts={topicCounts} />
      </div>
    </div>
  );
}
