'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, Markdown, TopicCard } from '@/components';
import type { SearchResults as SearchResultsData } from '@/types';

const EMPTY_RESULTS: SearchResultsData = {
  topics: [],
  keyPoints: [],
  codeExamples: [],
  quizQuestions: [],
};

const getTopicHref = (topicId: string, targetId?: string, kind?: 'key-point' | 'code-example' | 'quiz-question') => {
  if (!targetId || !kind) {
    return `/topics/${topicId}`;
  }

  return `/topics/${topicId}#${kind}-${targetId}`;
};

function ResultSection({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  if (count === 0) {
    return null;
  }

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-serif font-semibold text-[var(--ink)]">{title}</h2>
        <span className="text-xs text-[var(--ink-light)] uppercase tracking-wider">{count}</span>
      </div>
      {children}
    </section>
  );
}

function KeyPointResultCard({
  item,
}: {
  item: SearchResultsData['keyPoints'][number];
}) {
  return (
    <Card as={Link} href={getTopicHref(item.topic.id, item.id, 'key-point')} className="p-5 h-full group">
      <div className="search-preview-fade">
        <p className="text-xs text-[var(--ink-light)] mb-1">Key Point · {item.topic.title}</p>
        <h3 className="text-base font-serif font-semibold text-[var(--ink)] mb-2">
          {item.title}
        </h3>
        <Markdown className="text-sm text-[var(--ink-light)]">
          {item.description}
        </Markdown>
      </div>
    </Card>
  );
}

function CodeExampleResultCard({
  item,
}: {
  item: SearchResultsData['codeExamples'][number];
}) {
  return (
    <Card as={Link} href={getTopicHref(item.topic.id, item.id, 'code-example')} className="p-5 h-full group">
      <div className="search-preview-fade" style={{ '--fade-max-height': '14rem' } as React.CSSProperties}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-[var(--ink-light)]">Code Example · {item.topic.title}</p>
          <span className="text-xs font-mono px-2 py-0.5 border border-[var(--border)] bg-[var(--code-bg)] text-[var(--ink-light)]">
            {item.language}
          </span>
        </div>
        <h3 className="text-base font-serif font-semibold text-[var(--ink)] mb-3">
          {item.title}
        </h3>
        <pre className="text-xs text-[var(--ink-light)] bg-[var(--code-bg)] border border-[var(--border)] p-3 overflow-x-auto line-clamp-5">
          {item.code}
        </pre>
        {item.explanation ? (
          <Markdown className="text-sm text-[var(--ink-light)] mt-3">
            {item.explanation}
          </Markdown>
        ) : null}
      </div>
    </Card>
  );
}

function QuizQuestionResultCard({
  item,
}: {
  item: SearchResultsData['quizQuestions'][number];
}) {
  return (
    <Card as={Link} href={getTopicHref(item.topic.id, item.id, 'quiz-question')} className="p-5 h-full group">
      <div className="search-preview-fade">
        <p className="text-xs text-[var(--ink-light)] mb-1">Question · {item.topic.title}</p>
        <div className="text-base font-serif font-semibold text-[var(--ink)] mb-2">
          <Markdown>{item.question}</Markdown>
        </div>
        <Markdown className="text-sm text-[var(--ink-light)]">
          {item.answer}
        </Markdown>
      </div>
    </Card>
  );
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = (searchParams.get('q') || '').trim();
  const [results, setResults] = useState<SearchResultsData>(EMPTY_RESULTS);
  const [loadedQuery, setLoadedQuery] = useState('');

  useEffect(() => {
    if (!query) {
      return;
    }

    let isActive = true;

    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        if (!isActive) return;
        setResults(data);
        setLoadedQuery(query);
      })
      .catch(err => {
        if (!isActive) return;
        console.error('Search error:', err);
        setLoadedQuery(query);
      });

    return () => {
      isActive = false;
    };
  }, [query]);

  const isLoading = Boolean(query) && loadedQuery !== query;

  const visibleResults = query ? results : EMPTY_RESULTS;
  const totalResults =
    visibleResults.topics.length +
    visibleResults.keyPoints.length +
    visibleResults.codeExamples.length +
    visibleResults.quizQuestions.length;

  return (
    <>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-serif font-bold text-[var(--ink)] mb-3">Search Results</h1>
        {isLoading ? (
          <p className="text-[var(--ink-light)]">Searching...</p>
        ) : query ? (
          <p className="text-[var(--ink-light)]">
            Found {totalResults} result{totalResults !== 1 ? 's' : ''} for &quot;{query}&quot;
          </p>
        ) : (
          <p className="text-[var(--ink-light)]">Enter a search term to find topics and study content</p>
        )}
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="text-center py-16">
          <p className="text-[var(--ink-light)]">Loading...</p>
        </div>
      ) : totalResults > 0 ? (
        <>
          <ResultSection title="Topics" count={visibleResults.topics.length}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visibleResults.topics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          </ResultSection>

          <ResultSection title="Key Points" count={visibleResults.keyPoints.length}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visibleResults.keyPoints.map((item) => (
                <KeyPointResultCard key={item.id} item={item} />
              ))}
            </div>
          </ResultSection>

          <ResultSection title="Code Examples" count={visibleResults.codeExamples.length}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visibleResults.codeExamples.map((item) => (
                <CodeExampleResultCard key={item.id} item={item} />
              ))}
            </div>
          </ResultSection>

          <ResultSection title="Quiz Questions" count={visibleResults.quizQuestions.length}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visibleResults.quizQuestions.map((item) => (
                <QuizQuestionResultCard key={item.id} item={item} />
              ))}
            </div>
          </ResultSection>
        </>
      ) : query ? (
        <div className="text-center py-16 bg-[var(--paper)] border border-[var(--border)]">
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="text-lg font-serif font-semibold text-[var(--ink)] mb-2">No results found</h2>
          <p className="text-[var(--ink-light)] mb-6">
            Try different keywords or browse subjects
          </p>
          <Link
            href="/categories"
            className="px-5 py-2.5 bg-[var(--ink)] text-[var(--background)] text-sm hover:opacity-80 inline-block"
          >
            Browse Subjects
          </Link>
        </div>
      ) : (
        <div className="text-center py-16 bg-[var(--paper)] border border-[var(--border)]">
          <div className="text-4xl mb-4">💡</div>
          <h2 className="text-lg font-serif font-semibold text-[var(--ink)] mb-2">Start Searching</h2>
          <p className="text-[var(--ink-light)]">
            Use the search bar above to find topics and concepts
          </p>
        </div>
      )}
    </>
  );
}

function SearchLoading() {
  return (
    <div className="mb-10">
      <h1 className="text-2xl font-serif font-bold text-[var(--ink)] mb-3">Search Results</h1>
      <p className="text-[var(--ink-light)]">Loading...</p>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-6">
        <Suspense fallback={<SearchLoading />}>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  );
}
