'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
}

export default function EditTopic() {
  const { status } = useSession();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [keyPointsCount, setKeyPointsCount] = useState(0);
  const [codeExamplesCount, setCodeExamplesCount] = useState(0);
  const [quizQuestionsCount, setQuizQuestionsCount] = useState(0);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    icon: '',
    categoryId: '',
    confidence: 'beginner',
    resources: [] as string[],
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated' && id) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, id]);

  const fetchData = async () => {
    try {
      const [categoriesRes, topicRes] = await Promise.all([
        fetch('/api/categories'),
        fetch(`/api/topics/${id}`),
      ]);

      if (!categoriesRes.ok || !topicRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const categoriesData = await categoriesRes.json();
      const topicData = await topicRes.json();

      setCategories(categoriesData);
      setFormData({
        id: topicData.id,
        title: topicData.title,
        description: topicData.description,
        icon: topicData.icon || '',
        categoryId: topicData.categoryId,
        confidence: topicData.confidence,
        resources: (topicData.resources || []).map((r: { url: string }) => r.url),
      });
      setKeyPointsCount(topicData.keyPoints?.length || 0);
      setCodeExamplesCount(topicData.codeExamples?.length || 0);
      setQuizQuestionsCount(topicData.quizQuestions?.length || 0);
    } catch (err) {
      setError('Failed to load data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const response = await fetch(`/api/topics/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update topic');
      }

      router.push('/admin/topics');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update topic');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };





  const addResource = () => {
    setFormData({
      ...formData,
      resources: [...formData.resources, ''],
    });
  };

  const removeResource = (index: number) => {
    setFormData({
      ...formData,
      resources: formData.resources.filter((_, i) => i !== index),
    });
  };

  const updateResource = (index: number, value: string) => {
    const updated = [...formData.resources];
    updated[index] = value;
    setFormData({ ...formData, resources: updated });
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[var(--ink)] text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-[var(--paper)] border border-[var(--border)] p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[var(--ink)]">Edit Topic</h1>
            <Link
              href="/admin/topics"
              className="px-4 py-2 border border-[var(--border)] text-[var(--ink)] hover:opacity-80 transition cursor-pointer"
            >
              ← Back
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 border border-[var(--border)] bg-[var(--paper)]">
            <p className="text-[var(--ink)]">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-[var(--paper)] border border-[var(--border)] p-6 space-y-6">
            <h2 className="text-xl font-bold text-[var(--ink)]">Basic Information</h2>

            <div>
              <label className="block text-sm font-medium text-[var(--ink)] mb-2">
                ID (Cannot be changed)
              </label>
              <input
                type="text"
                value={formData.id}
                readOnly
                disabled
                className="w-full px-4 py-3 border border-[var(--border)] bg-[var(--background)] text-[var(--ink-light)]"
              />
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-[var(--ink)] mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[var(--border)] bg-[var(--background)] text-[var(--ink)]"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-[var(--ink)] mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-[var(--border)] bg-[var(--background)] text-[var(--ink)]"
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
                className="w-full px-4 py-3 border border-[var(--border)] bg-[var(--background)] text-[var(--ink)]"
              />
            </div>

            <div>
              <label htmlFor="categoryId" className="block text-sm font-medium text-[var(--ink)] mb-2">
                Category *
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[var(--border)] bg-[var(--background)] text-[var(--ink)] cursor-pointer"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="confidence" className="block text-sm font-medium text-[var(--ink)] mb-2">
                Confidence Level *
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

          {/* Key Points */}
          <div className="bg-[var(--paper)] border border-[var(--border)] p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-[var(--ink)] mb-2">Key Points</h2>
                <p className="text-[var(--ink-light)] text-sm">{keyPointsCount} key point{keyPointsCount !== 1 ? 's' : ''}</p>
              </div>
              <Link
                href={`/admin/topics/${id}/key-points`}
                className="px-4 py-2 bg-[var(--ink)] text-[var(--background)] hover:opacity-80 transition"
              >
                Edit Key Points →
              </Link>
            </div>
          </div>

          {/* Code Examples */}
          <div className="bg-[var(--paper)] border border-[var(--border)] p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-[var(--ink)] mb-2">Code Examples</h2>
                <p className="text-[var(--ink-light)] text-sm">{codeExamplesCount} code example{codeExamplesCount !== 1 ? 's' : ''}</p>
              </div>
              <Link
                href={`/admin/topics/${id}/code-examples`}
                className="px-4 py-2 bg-[var(--ink)] text-[var(--background)] hover:opacity-80 transition"
              >
                Edit Code Examples →
              </Link>
            </div>
          </div>

          {/* Quiz Questions */}
          <div className="bg-[var(--paper)] border border-[var(--border)] p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-[var(--ink)] mb-2">Quiz Questions</h2>
                <p className="text-[var(--ink-light)] text-sm">{quizQuestionsCount} question{quizQuestionsCount !== 1 ? 's' : ''}</p>
              </div>
              <Link
                href={`/admin/topics/${id}/quiz-questions`}
                className="px-4 py-2 bg-[var(--ink)] text-[var(--background)] hover:opacity-80 transition"
              >
                Edit Questions →
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div className="bg-[var(--paper)] border border-[var(--border)] p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[var(--ink)]">Resources</h2>
              <button
                type="button"
                onClick={addResource}
                className="px-4 py-2 bg-[var(--ink)] text-[var(--background)] hover:opacity-80 transition cursor-pointer"
              >
                + Add Resource
              </button>
            </div>
            <div className="space-y-3">
              {formData.resources.map((resource, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://..."
                    value={resource}
                    onChange={(e) => updateResource(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-[var(--border)] bg-[var(--background)] text-[var(--ink)]"
                  />
                  <button
                    type="button"
                    onClick={() => removeResource(index)}
                    className="px-4 py-2 border border-[var(--border)] text-[var(--ink)] hover:opacity-80 transition cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="bg-[var(--paper)] border border-[var(--border)] p-6">
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-[var(--ink)] text-[var(--background)] py-3 px-4 font-semibold hover:opacity-80 transition disabled:opacity-50 cursor-pointer"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <Link
                href="/admin/topics"
                className="px-6 py-3 border border-[var(--border)] text-[var(--ink)] hover:opacity-80 transition text-center cursor-pointer"
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
