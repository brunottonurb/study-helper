import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CodeBlock, FavoriteButton, Markdown } from '@/components';
import { getTopicById, getCategoryById, getAllTopics } from '@/lib/data';

interface TopicPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const topics = await getAllTopics();
  return topics.map((topic) => ({
    id: topic.id,
  }));
}

export async function generateMetadata({ params }: TopicPageProps) {
  const { id } = await params;
  const topic = await getTopicById(id);
  if (!topic) return { title: 'Topic Not Found' };
  
  return {
    title: `${topic.title} - Study Notes`,
    description: topic.description,
  };
}

const confidenceLabels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
};

export default async function TopicPage({ params }: TopicPageProps) {
  const { id } = await params;
  const topic = await getTopicById(id);
  
  if (!topic) {
    notFound();
  }

  const category = await getCategoryById(topic.category);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-6">
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
              <span className="text-xs text-[var(--ink-light)] font-mono border border-[var(--border)] px-2 py-1 bg-[var(--paper)]">
                {confidenceLabels[topic.confidence]}
              </span>
            </div>
          </div>
          <div className="text-lg text-[var(--ink-light)] leading-relaxed">
            <Markdown>{topic.description}</Markdown>
          </div>
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
                <div className="text-[var(--ink-light)] text-sm leading-relaxed">
                  <Markdown>{point.description}</Markdown>
                </div>
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
      </div>
    </div>
  );
}
