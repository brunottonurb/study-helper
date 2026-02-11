import { notFound } from 'next/navigation';
import { TopicClient } from '@/components/TopicClient';
import { readCategories, readTopics } from '@/lib/data-store';
import { getTopicById, getCategoryById } from '@/lib/api-client';

interface TopicPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: TopicPageProps) {
  const { id } = await params;
  const topics = await readTopics();
  const topic = getTopicById(topics, id);
  if (!topic) return { title: 'Topic Not Found' };
  
  return {
    title: `${topic.title} - Study Notes`,
    description: topic.description,
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { id } = await params;
  const topics = await readTopics();
  const categories = await readCategories();
  const topic = getTopicById(topics, id);
  
  if (!topic) {
    notFound();
  }

  const category = getCategoryById(categories, topic.category);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-6">
        <TopicClient 
          topic={topic} 
          category={category}
          allCategories={categories}
        />
      </div>
    </div>
  );
}
