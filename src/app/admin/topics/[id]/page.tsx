'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

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

export default function EditTopic() {
  const { status } = useSession();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    icon: '',
    categoryId: '',
    confidence: 'beginner',
    keyPoints: [] as KeyPoint[],
    codeExamples: [] as CodeExample[],
    quizQuestions: [] as QuizQuestion[],
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
        keyPoints: topicData.keyPoints || [],
        codeExamples: topicData.codeExamples || [],
        quizQuestions: topicData.quizQuestions || [],
        resources: (topicData.resources || []).map((r: any) => r.url),
      });
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
    } catch (err: any) {
      setError(err.message || 'Failed to update topic');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addKeyPoint = () => {
    setFormData({
      ...formData,
      keyPoints: [...formData.keyPoints, { title: '', description: '' }],
    });
  };

  const removeKeyPoint = (index: number) => {
    setFormData({
      ...formData,
      keyPoints: formData.keyPoints.filter((_, i) => i !== index),
    });
  };

  const updateKeyPoint = (index: number, field: keyof KeyPoint, value: string) => {
    const updated = [...formData.keyPoints];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, keyPoints: updated });
  };

  const addCodeExample = () => {
    setFormData({
      ...formData,
      codeExamples: [
        ...formData.codeExamples,
        { title: '', language: 'typescript', code: '', explanation: '' },
      ],
    });
  };

  const removeCodeExample = (index: number) => {
    setFormData({
      ...formData,
      codeExamples: formData.codeExamples.filter((_, i) => i !== index),
    });
  };

  const updateCodeExample = (index: number, field: keyof CodeExample, value: string) => {
    const updated = [...formData.codeExamples];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, codeExamples: updated });
  };

  const addQuizQuestion = () => {
    setFormData({
      ...formData,
      quizQuestions: [...formData.quizQuestions, { question: '', answer: '' }],
    });
  };

  const removeQuizQuestion = (index: number) => {
    setFormData({
      ...formData,
      quizQuestions: formData.quizQuestions.filter((_, i) => i !== index),
    });
  };

  const updateQuizQuestion = (index: number, field: keyof QuizQuestion, value: string) => {
    const updated = [...formData.quizQuestions];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, quizQuestions: updated });
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-gray-900 dark:text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Topic</h1>
            <Link
              href="/admin/topics"
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              ← Back
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Basic Information</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ID (Cannot be changed)
              </label>
              <input
                type="text"
                value={formData.id}
                readOnly
                disabled
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
              />
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="icon" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Icon (Emoji)
              </label>
              <input
                type="text"
                id="icon"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
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
              <label htmlFor="confidence" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confidence Level *
              </label>
              <select
                id="confidence"
                name="confidence"
                value={formData.confidence}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          </div>

          {/* Key Points */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Key Points</h2>
              <button
                type="button"
                onClick={addKeyPoint}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                + Add Key Point
              </button>
            </div>
            <div className="space-y-4">
              {formData.keyPoints.map((kp, index) => (
                <div key={index} className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Key Point #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeKeyPoint(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Title"
                    value={kp.title}
                    onChange={(e) => updateKeyPoint(index, 'title', e.target.value)}
                    className="w-full px-4 py-2 mb-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <textarea
                    placeholder="Description"
                    value={kp.description}
                    onChange={(e) => updateKeyPoint(index, 'description', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Code Examples */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Code Examples</h2>
              <button
                type="button"
                onClick={addCodeExample}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                + Add Code Example
              </button>
            </div>
            <div className="space-y-4">
              {formData.codeExamples.map((ce, index) => (
                <div key={index} className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Code Example #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeCodeExample(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Title"
                    value={ce.title}
                    onChange={(e) => updateCodeExample(index, 'title', e.target.value)}
                    className="w-full px-4 py-2 mb-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Language (e.g., typescript, javascript)"
                    value={ce.language}
                    onChange={(e) => updateCodeExample(index, 'language', e.target.value)}
                    className="w-full px-4 py-2 mb-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <textarea
                    placeholder="Code"
                    value={ce.code}
                    onChange={(e) => updateCodeExample(index, 'code', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-2 mb-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                  />
                  <textarea
                    placeholder="Explanation (optional)"
                    value={ce.explanation}
                    onChange={(e) => updateCodeExample(index, 'explanation', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Quiz Questions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Quiz Questions</h2>
              <button
                type="button"
                onClick={addQuizQuestion}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                + Add Question
              </button>
            </div>
            <div className="space-y-4">
              {formData.quizQuestions.map((qq, index) => (
                <div key={index} className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Question #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeQuizQuestion(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                  <textarea
                    placeholder="Question"
                    value={qq.question}
                    onChange={(e) => updateQuizQuestion(index, 'question', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 mb-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <textarea
                    placeholder="Answer"
                    value={qq.answer}
                    onChange={(e) => updateQuizQuestion(index, 'answer', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Resources</h2>
              <button
                type="button"
                onClick={addResource}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
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
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => removeResource(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <Link
                href="/admin/topics"
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition text-center"
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
