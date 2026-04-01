'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import MarkdownEditor from '@/components/editor/MarkdownEditor';

interface Category {
  id: string;
  name: string;
}

interface KeyPoint {
  title: string;
  description: string;
}

interface CodeExample {
  title: string;
  language: string;
  code: string;
  explanation: string;
}

interface QuizQuestion {
  question: string;
  answer: string;
}

export default function NewTopicForm() {
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategoryId = useMemo(() => searchParams.get('categoryId') || '', [searchParams]);

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    icon: '',
    categoryId: initialCategoryId,
    confidence: 'beginner',
    keyPoints: [] as KeyPoint[],
    codeExamples: [] as CodeExample[],
    quizQuestions: [] as QuizQuestion[],
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      const callbackUrl = initialCategoryId ? `/topics/new?categoryId=${initialCategoryId}` : '/topics/new';
      router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
    }
  }, [status, router, initialCategoryId]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchCategories();
    }
  }, [status]);

  useEffect(() => {
    if (initialCategoryId) {
      setFormData((prev) => ({ ...prev, categoryId: initialCategoryId }));
    }
  }, [initialCategoryId]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create topic');
      }

      const topic = await response.json();
      setIsDirty(false);
      router.push(`/topics/${topic.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create topic');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };

  const handleDescriptionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, description: value }));
    setIsDirty(true);
  };

  const addKeyPoint = () => {
    setFormData((prev) => ({
      ...prev,
      keyPoints: [...prev.keyPoints, { title: '', description: '' }],
    }));
    setIsDirty(true);
  };

  const updateKeyPoint = (index: number, field: 'title' | 'description', value: string) => {
    setFormData((prev) => ({
      ...prev,
      keyPoints: prev.keyPoints.map((kp, i) => (i === index ? { ...kp, [field]: value } : kp)),
    }));
    setIsDirty(true);
  };

  const removeKeyPoint = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      keyPoints: prev.keyPoints.filter((_, i) => i !== index),
    }));
    setIsDirty(true);
  };

  const addCodeExample = () => {
    setFormData((prev) => ({
      ...prev,
      codeExamples: [
        ...prev.codeExamples,
        { title: '', language: '', code: '', explanation: '' },
      ],
    }));
    setIsDirty(true);
  };

  const updateCodeExample = (
    index: number,
    field: 'title' | 'language' | 'code' | 'explanation',
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      codeExamples: prev.codeExamples.map((ce, i) =>
        i === index ? { ...ce, [field]: value } : ce,
      ),
    }));
    setIsDirty(true);
  };

  const removeCodeExample = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      codeExamples: prev.codeExamples.filter((_, i) => i !== index),
    }));
    setIsDirty(true);
  };

  const addQuizQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      quizQuestions: [...prev.quizQuestions, { question: '', answer: '' }],
    }));
    setIsDirty(true);
  };

  const updateQuizQuestion = (
    index: number,
    field: 'question' | 'answer',
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      quizQuestions: prev.quizQuestions.map((qq, i) =>
        i === index ? { ...qq, [field]: value } : qq,
      ),
    }));
    setIsDirty(true);
  };

  const removeQuizQuestion = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      quizQuestions: prev.quizQuestions.filter((_, i) => i !== index),
    }));
    setIsDirty(true);
  };

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <Link
          href={formData.categoryId ? `/categories/${formData.categoryId}` : '/categories'}
          className="inline-flex items-center text-[var(--accent)] hover:underline text-sm"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Subjects
        </Link>
      </div>

      <h1 className="text-3xl font-serif font-bold text-[var(--ink)] mb-8">Create New Topic</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="bg-[var(--accent)] bg-opacity-10 border border-[var(--accent)] text-[var(--accent)] px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Basic Info */}
        <div className="bg-[var(--paper)] border border-[var(--border)] p-6">
          <h2 className="text-lg font-semibold text-[var(--ink)] mb-4">Topic Information</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="id" className="block text-sm font-medium text-[var(--ink)] mb-2">
                ID (URL-friendly) <span className="text-[var(--accent)]"> *</span>
              </label>
              <input
                type="text"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
                placeholder="e.g., react-hooks"
                className="w-full px-4 py-3 border border-[var(--border)] bg-[var(--background)] text-[var(--ink)]"
              />
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-[var(--ink)] mb-2">
                Title <span className="text-[var(--accent)]"> *</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., React Hooks"
                className="w-full px-4 py-3 border border-[var(--border)] bg-[var(--background)] text-[var(--ink)]"
              />
            </div>

            <div>
              <MarkdownEditor
                id="description"
                label="Description"
                value={formData.description}
                onChange={handleDescriptionChange}
                rows={4}
                required
              />
            </div>

            <div>
              <label htmlFor="icon" className="block text-sm font-medium text-[var(--ink)] mb-2">
                Icon (Emoji)
              </label>
              <input
                type="text"
                id="icon"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                placeholder="e.g., ⚛️"
                className="w-full px-4 py-3 border border-[var(--border)] bg-[var(--background)] text-[var(--ink)]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="categoryId" className="block text-sm font-medium text-[var(--ink)] mb-2">
                  Subject <span className="text-[var(--accent)]"> *</span>
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[var(--border)] bg-[var(--background)] text-[var(--ink)] cursor-pointer"
                >
                  <option value="">Select a subject</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="confidence" className="block text-sm font-medium text-[var(--ink)] mb-2">
                  Your Confidence Level <span className="text-[var(--accent)]"> *</span>
                </label>
                <select
                  id="confidence"
                  name="confidence"
                  value={formData.confidence}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[var(--border)] bg-[var(--background)] text-[var(--ink)] cursor-pointer"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Key Points */}
        <div className="bg-[var(--paper)] border border-[var(--border)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[var(--ink)]">Key Points</h2>
            <Button type="button" tone="primary" size="sm" onClick={addKeyPoint}>
              Add Key Point
            </Button>
          </div>

          <div className="space-y-4">
            {formData.keyPoints.map((kp, index) => (
              <div key={index} className="border border-[var(--border)] p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 space-y-3">
                    <input
                      type="text"
                      value={kp.title}
                      onChange={(e) => updateKeyPoint(index, 'title', e.target.value)}
                      placeholder="Title"
                      className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--background)] text-[var(--ink)]"
                    />
                    <MarkdownEditor
                      id={`kp-${index}`}
                      value={kp.description}
                      onChange={(value) => updateKeyPoint(index, 'description', value)}
                      label="Description"
                      rows={3}
                    />
                  </div>
                  <Button
                    type="button"
                    tone="danger"
                    size="sm"
                    onClick={() => removeKeyPoint(index)}
                    className="mt-1"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Code Examples */}
        <div className="bg-[var(--paper)] border border-[var(--border)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[var(--ink)]">Code Examples</h2>
            <Button type="button" tone="primary" size="sm" onClick={addCodeExample}>
              Add Code Example
            </Button>
          </div>

          <div className="space-y-4">
            {formData.codeExamples.map((ce, index) => (
              <div key={index} className="border border-[var(--border)] p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 space-y-3">
                    <input
                      type="text"
                      value={ce.title}
                      onChange={(e) => updateCodeExample(index, 'title', e.target.value)}
                      placeholder="Title"
                      className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--background)] text-[var(--ink)]"
                    />
                    <input
                      type="text"
                      value={ce.language}
                      onChange={(e) => updateCodeExample(index, 'language', e.target.value)}
                      placeholder="Language"
                      className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--background)] text-[var(--ink)]"
                    />
                    <textarea
                      value={ce.code}
                      onChange={(e) => updateCodeExample(index, 'code', e.target.value)}
                      placeholder="Code"
                      rows={6}
                      className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--background)] text-[var(--ink)] font-mono text-sm"
                    />
                    <MarkdownEditor
                      id={`ce-${index}`}
                      value={ce.explanation}
                      onChange={(value) => updateCodeExample(index, 'explanation', value)}
                      label="Explanation"
                      rows={3}
                    />
                  </div>
                  <Button
                    type="button"
                    tone="danger"
                    size="sm"
                    onClick={() => removeCodeExample(index)}
                    className="mt-1"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz Questions */}
        <div className="bg-[var(--paper)] border border-[var(--border)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[var(--ink)]">Quiz Questions</h2>
            <Button type="button" tone="primary" size="sm" onClick={addQuizQuestion}>
              Add Question
            </Button>
          </div>

          <div className="space-y-4">
            {formData.quizQuestions.map((qq, index) => (
              <div key={index} className="border border-[var(--border)] p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 space-y-3">
                    <textarea
                      value={qq.question}
                      onChange={(e) => updateQuizQuestion(index, 'question', e.target.value)}
                      placeholder="Question"
                      rows={3}
                      className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--background)] text-[var(--ink)]"
                    />
                    <textarea
                      value={qq.answer}
                      onChange={(e) => updateQuizQuestion(index, 'answer', e.target.value)}
                      placeholder="Answer"
                      rows={3}
                      className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--background)] text-[var(--ink)]"
                    />
                  </div>
                  <Button
                    type="button"
                    tone="danger"
                    size="sm"
                    onClick={() => removeQuizQuestion(index)}
                    className="mt-1"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <Button type="submit" tone="primary" size="lg" disabled={loading} className="flex-1">
            {loading ? 'Creating...' : 'Create Topic'}
          </Button>
          <Link href={formData.categoryId ? `/categories/${formData.categoryId}` : '/categories'}>
            <Button type="button" size="lg">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
