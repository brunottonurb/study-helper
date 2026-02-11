import { notFound } from 'next/navigation';
import { CategoryClient } from '@/components/CategoryClient';
import { readCategories, readTopics } from '@/lib/data-store';
import { getCategoryById, getTopicsByCategory } from '@/lib/api-client';

interface CategoryPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: CategoryPageProps) {
  const { id } = await params;
  const categories = await readCategories();
  const category = getCategoryById(categories, id);
  if (!category) return { title: 'Subject Not Found' };
  
  return {
    title: `${category.name} - Study Notes`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;
  const categories = await readCategories();
  const topics = await readTopics();
  const category = getCategoryById(categories, id);
  
  if (!category) {
    notFound();
  }

  const categoryTopics = getTopicsByCategory(topics, id);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
        <CategoryClient 
          category={category} 
          categoryTopics={categoryTopics}
          allCategories={categories}
        />
      </div>
    </div>
  );
}
