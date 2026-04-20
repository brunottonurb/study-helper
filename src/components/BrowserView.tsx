'use client';

import cx from 'classnames';
import { useState, useMemo } from 'react';
import { Category, Topic } from '@/types';
import CodeBlock from './CodeBlock';
import Markdown from './Markdown';

interface BrowserViewProps {
  categories: Category[];
  topics: Topic[];
}

type TabType = 'keyPoints' | 'codeExamples' | 'quizQuestions';

const rootClasses = (className?: string) =>
  cx('hidden lg:grid grid-cols-12 gap-px bg-[var(--border)] overflow-hidden border border-[var(--border)] h-full min-h-0', className);

const panelClasses = (className: string) =>
  cx(className, 'min-h-0 bg-[var(--paper)] overflow-y-auto');

const sectionHeaderClasses = (className?: string) =>
  cx('sticky top-0 bg-[var(--paper)] border-b border-[var(--border)] p-4', className);

const sectionTitleClasses = (className?: string) =>
  cx('text-sm font-serif font-semibold text-[var(--ink)] uppercase tracking-wide', className);

const listContainerClasses = (className?: string) =>
  cx('divide-y divide-[var(--border)]', className);

const listButtonClasses = (isActive: boolean, className?: string) =>
  cx(
    'w-full text-left px-4 py-3 cursor-pointer',
    isActive ? 'bg-[var(--background)]' : 'text-[var(--ink)] hover:text-[var(--accent)]',
    className,
  );

const contentTitleClasses = (className?: string) =>
  cx('text-2xl font-serif font-bold text-[var(--ink)] mb-2', className);

const contentDescriptionClasses = (className?: string) =>
  cx('text-[var(--ink-light)] text-sm', className);

const tabButtonClasses = (isActive: boolean, className?: string) =>
  cx(
    'py-3 border-b-2 font-serif font-semibold text-sm transition-colors cursor-pointer',
    isActive
      ? 'border-[var(--accent)] text-[var(--accent)]'
      : 'border-transparent text-[var(--ink-light)] hover:text-[var(--ink)]',
    className,
  );

export default function BrowserView({ categories, topics }: BrowserViewProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(categories[0]?.id || '');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<TabType>('keyPoints');

  const topicCountsByCategory = useMemo(() => {
    return topics.reduce<Record<string, number>>((acc, topic) => {
      acc[topic.categoryId] = (acc[topic.categoryId] || 0) + 1;
      return acc;
    }, {});
  }, [topics]);

  // Filter topics by selected category
  const filteredTopics = useMemo(() => {
    return topics.filter((topic) => topic.categoryId === selectedCategoryId);
  }, [topics, selectedCategoryId]);

  // Get selected topic details
  const selectedTopic = useMemo(() => {
    return topics.find((topic) => topic.id === selectedTopicId);
  }, [topics, selectedTopicId]);

  // Auto-select first topic when category changes
  const topicToDisplay = selectedTopic || filteredTopics[0];

  return (
    <div className={rootClasses()}>
      {/* Left Column: Categories */}
      <div className={panelClasses('col-span-2')}>
        <div className={sectionHeaderClasses()}>
          <h2 className={sectionTitleClasses()}>
            Subjects
          </h2>
        </div>
        <div className={listContainerClasses()}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategoryId(category.id);
                setSelectedTopicId('');
                setActiveTab('keyPoints');
              }}
              className={listButtonClasses(selectedCategoryId === category.id)}
            >
              <div className="flex items-start gap-2">
                <span className="text-lg">{category.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-serif font-semibold truncate">{category.name}</p>
                  <p className="text-xs text-[var(--ink-light)] truncate">{topicCountsByCategory[category.id] || 0} topics</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Middle Column: Topics */}
      <div className={panelClasses('col-span-3')}>
        <div className={sectionHeaderClasses()}>
          <h2 className={sectionTitleClasses()}>
            Topics
          </h2>
        </div>
        <div className={listContainerClasses()}>
          {filteredTopics.length === 0 ? (
            <div className="p-4 text-center text-[var(--ink-light)] text-sm">
              No topics in this subject
            </div>
          ) : (
            filteredTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedTopicId(topic.id);
                  setActiveTab('keyPoints');
                }}
                className={listButtonClasses(topicToDisplay?.id === topic.id)}
              >
                <p className="font-serif font-semibold line-clamp-2 text-sm">{topic.title}</p>
                <p className="text-xs text-[var(--ink-light)] mt-1 line-clamp-1">{topic.description}</p>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Right Column: Content */}
      <div className={panelClasses('col-span-7')}>
        {topicToDisplay ? (
          <div className="min-h-full">
            {/* Header */}
            <div className="sticky top-0 bg-[var(--paper)] border-b border-[var(--border)] p-6">
              <h1 className={contentTitleClasses()}>
                {topicToDisplay.title}
              </h1>
              <p className={contentDescriptionClasses()}>{topicToDisplay.description}</p>
            </div>

            {/* Tabs */}
            <div className="sticky top-[100px] bg-[var(--paper)] border-b border-[var(--border)] px-6">
              <div className="flex gap-6">
                <TabButton
                  active={activeTab === 'keyPoints'}
                  onClick={() => setActiveTab('keyPoints')}
                  label={`Key Points (${topicToDisplay.keyPoints.length})`}
                />
                <TabButton
                  active={activeTab === 'codeExamples'}
                  onClick={() => setActiveTab('codeExamples')}
                  label={`Code Examples (${topicToDisplay.codeExamples.length})`}
                />
                <TabButton
                  active={activeTab === 'quizQuestions'}
                  onClick={() => setActiveTab('quizQuestions')}
                  label={`Questions (${topicToDisplay.quizQuestions?.length || 0})`}
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {activeTab === 'keyPoints' && (
                <KeyPointsView keyPoints={topicToDisplay.keyPoints} />
              )}
              {activeTab === 'codeExamples' && (
                <CodeExamplesView codeExamples={topicToDisplay.codeExamples} />
              )}
              {activeTab === 'quizQuestions' && (
                <QuizQuestionsView questions={topicToDisplay.quizQuestions || []} />
              )}
            </div>
          </div>
        ) : (
          <div className="flex h-full min-h-0 items-center justify-center text-[var(--ink-light)]">
            <p>Select a topic to view content</p>
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={tabButtonClasses(active)}
    >
      {label}
    </button>
  );
}

function KeyPointsView({ keyPoints }: { keyPoints: { id?: string; title: string; description: string }[] }) {
  if (keyPoints.length === 0) {
    return <p className="text-[var(--ink-light)]">No key points available</p>;
  }

  return (
    <div className="space-y-6">
      {keyPoints.map((kp) => (
        <div key={kp.id || kp.title}>
          <h3 className="text-base font-serif font-semibold text-[var(--ink)] mb-2">
            {kp.title}
          </h3>
          <div className="text-[var(--ink-light)] leading-relaxed">
            <Markdown>{kp.description}</Markdown>
          </div>
        </div>
      ))}
    </div>
  );
}

function CodeExamplesView({ codeExamples }: { codeExamples: { id?: string; title: string; language: string; code: string; explanation?: string }[] }) {
  if (codeExamples.length === 0) {
    return <p className="text-[var(--ink-light)]">No code examples available</p>;
  }

  return (
    <div className="space-y-8">
      {codeExamples.map((example) => (
        <CodeBlock key={example.id || example.title} example={example} />
      ))}
    </div>
  );
}

function QuizQuestionsView({ questions }: { questions: { id?: string; question: string; answer: string }[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (questions.length === 0) {
    return <p className="text-[var(--ink-light)]">No quiz questions available</p>;
  }

  return (
    <div className="space-y-4">
      {questions.map((q, idx) => {
        const itemId = q.id || String(idx);
        return (
          <div key={itemId} className="border border-[var(--border)] rounded">
            <button
              onClick={() => setExpandedId(expandedId === itemId ? null : itemId)}
              className="w-full text-left px-4 py-3 hover:bg-[var(--hover-bg)] transition-colors"
            >
              <div className="flex items-start gap-2">
                <span className="text-sm font-semibold text-[var(--accent)] flex-shrink-0">Q{idx + 1}</span>
                <p className="text-[var(--ink)] font-serif">{q.question}</p>
              </div>
            </button>
            {expandedId === itemId && (
              <div className="px-4 py-3 bg-[var(--code-bg)] border-t border-[var(--border)]">
                <p className="text-sm font-semibold text-[var(--ink-light)] mb-2">Answer:</p>
                <div className="text-[var(--ink)] leading-relaxed">
                  <Markdown>{q.answer}</Markdown>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
