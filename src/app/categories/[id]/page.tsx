import { notFound } from 'next/navigation';
import Link from 'next/link';
import { TopicCard } from '@/components';
import { getCategoryById, getTopicsByCategory, categories } from '@/data/knowledge';

interface CategoryPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    id: category.id,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { id } = await params;
  const category = getCategoryById(id);
  if (!category) return { title: 'Subject Not Found' };
  
  return {
    title: `${category.name} - Study Notes`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;
  const category = getCategoryById(id);
  
  if (!category) {
    notFound();
  }

  const categoryTopics = getTopicsByCategory(id);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-[var(--ink-light)] mb-8">
          <Link href="/" className="hover:text-[var(--ink)] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-[var(--ink)] transition-colors">Subjects</Link>
          <span>/</span>
          <span className="text-[var(--ink)]">{category.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-10 pb-8 border-b border-[var(--border)]">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-3xl">{category.icon}</span>
            <h1 className="text-2xl font-serif font-bold text-[var(--ink)]">{category.name}</h1>
          </div>
          <p className="text-[var(--ink-light)] leading-relaxed">{category.description}</p>
          <div className="text-sm text-[var(--ink-light)] mt-3">
            {categoryTopics.length} {categoryTopics.length === 1 ? 'topic' : 'topics'} in this subject
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
            <p className="text-sm text-[var(--ink-light)]">
              Add topics by editing the knowledge.ts file.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
