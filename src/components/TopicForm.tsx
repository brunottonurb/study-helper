'use client';

import { useState } from 'react';
import { Topic, KeyPoint, CodeExample } from '@/types';
import { Category } from '@/types';

interface TopicFormProps {
  topic?: Topic;
  categories: Category[];
  onSave: (topic: Topic) => Promise<void>;
  onCancel: () => void;
}

export function TopicForm({ topic, categories, onSave, onCancel }: TopicFormProps) {
  const [formData, setFormData] = useState<Topic>(
    topic || {
      id: '',
      title: '',
      description: '',
      category: categories[0]?.id || '',
      confidence: 'beginner',
      keyPoints: [],
      codeExamples: [],
      resources: [],
    }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      await onSave(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save topic');
    } finally {
      setSaving(false);
    }
  };

  const addKeyPoint = () => {
    setFormData({
      ...formData,
      keyPoints: [...formData.keyPoints, { title: '', description: '' }],
    });
  };

  const updateKeyPoint = (index: number, field: keyof KeyPoint, value: string) => {
    const newKeyPoints = [...formData.keyPoints];
    newKeyPoints[index] = { ...newKeyPoints[index], [field]: value };
    setFormData({ ...formData, keyPoints: newKeyPoints });
  };

  const removeKeyPoint = (index: number) => {
    setFormData({
      ...formData,
      keyPoints: formData.keyPoints.filter((_, i) => i !== index),
    });
  };

  const addCodeExample = () => {
    setFormData({
      ...formData,
      codeExamples: [...formData.codeExamples, { title: '', language: 'javascript', code: '', explanation: '' }],
    });
  };

  const updateCodeExample = (index: number, field: keyof CodeExample, value: string) => {
    const newCodeExamples = [...formData.codeExamples];
    newCodeExamples[index] = { ...newCodeExamples[index], [field]: value };
    setFormData({ ...formData, codeExamples: newCodeExamples });
  };

  const removeCodeExample = (index: number) => {
    setFormData({
      ...formData,
      codeExamples: formData.codeExamples.filter((_, i) => i !== index),
    });
  };

  const addResource = () => {
    setFormData({
      ...formData,
      resources: [...(formData.resources || []), ''],
    });
  };

  const updateResource = (index: number, value: string) => {
    const newResources = [...(formData.resources || [])];
    newResources[index] = value;
    setFormData({ ...formData, resources: newResources });
  };

  const removeResource = (index: number) => {
    setFormData({
      ...formData,
      resources: (formData.resources || []).filter((_, i) => i !== index),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--ink)] border-b border-[var(--border)] pb-2">
          Basic Information
        </h3>

        <div>
          <label className="block text-sm font-medium text-[var(--ink)] mb-1">
            ID {!topic && <span className="text-red-500">*</span>}
          </label>
          <input
            type="text"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            disabled={!!topic}
            required
            className="w-full px-3 py-2 border border-[var(--border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--accent)] disabled:bg-gray-100"
            placeholder="unique-topic-id"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--ink)] mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full px-3 py-2 border border-[var(--border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--ink)] mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={3}
            className="w-full px-3 py-2 border border-[var(--border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--ink)] mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              className="w-full px-3 py-2 border border-[var(--border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--ink)] mb-1">
              Confidence <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.confidence}
              onChange={(e) => setFormData({ ...formData, confidence: e.target.value as Topic['confidence'] })}
              required
              className="w-full px-3 py-2 border border-[var(--border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--ink)] mb-1">
            Icon (optional)
          </label>
          <input
            type="text"
            value={formData.icon || ''}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            className="w-full px-3 py-2 border border-[var(--border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            placeholder="📝"
          />
        </div>
      </div>

      {/* Key Points */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
          <h3 className="text-lg font-semibold text-[var(--ink)]">Key Points</h3>
          <button
            type="button"
            onClick={addKeyPoint}
            className="text-sm text-[var(--accent)] hover:underline"
          >
            + Add Key Point
          </button>
        </div>

        {formData.keyPoints.map((point, index) => (
          <div key={index} className="border border-[var(--border)] rounded p-4 space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-[var(--ink-light)]">Key Point {index + 1}</span>
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
              value={point.title}
              onChange={(e) => updateKeyPoint(index, 'title', e.target.value)}
              placeholder="Title"
              className="w-full px-3 py-2 border border-[var(--border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
            <textarea
              value={point.description}
              onChange={(e) => updateKeyPoint(index, 'description', e.target.value)}
              placeholder="Description"
              rows={2}
              className="w-full px-3 py-2 border border-[var(--border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
          </div>
        ))}
      </div>

      {/* Code Examples */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
          <h3 className="text-lg font-semibold text-[var(--ink)]">Code Examples</h3>
          <button
            type="button"
            onClick={addCodeExample}
            className="text-sm text-[var(--accent)] hover:underline"
          >
            + Add Code Example
          </button>
        </div>

        {formData.codeExamples.map((example, index) => (
          <div key={index} className="border border-[var(--border)] rounded p-4 space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-[var(--ink-light)]">Example {index + 1}</span>
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
              value={example.title}
              onChange={(e) => updateCodeExample(index, 'title', e.target.value)}
              placeholder="Title"
              className="w-full px-3 py-2 border border-[var(--border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
            <select
              value={example.language}
              onChange={(e) => updateCodeExample(index, 'language', e.target.value)}
              className="w-full px-3 py-2 border border-[var(--border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="csharp">C#</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
              <option value="sql">SQL</option>
              <option value="bash">Bash</option>
            </select>
            <textarea
              value={example.code}
              onChange={(e) => updateCodeExample(index, 'code', e.target.value)}
              placeholder="Code"
              rows={5}
              className="w-full px-3 py-2 border border-[var(--border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--accent)] font-mono text-sm"
            />
            <textarea
              value={example.explanation || ''}
              onChange={(e) => updateCodeExample(index, 'explanation', e.target.value)}
              placeholder="Explanation (optional)"
              rows={2}
              className="w-full px-3 py-2 border border-[var(--border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
          </div>
        ))}
      </div>

      {/* Resources */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
          <h3 className="text-lg font-semibold text-[var(--ink)]">Resources</h3>
          <button
            type="button"
            onClick={addResource}
            className="text-sm text-[var(--accent)] hover:underline"
          >
            + Add Resource
          </button>
        </div>

        {(formData.resources || []).map((resource, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={resource}
              onChange={(e) => updateResource(index, e.target.value)}
              placeholder="Resource URL or description"
              className="flex-1 px-3 py-2 border border-[var(--border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
            <button
              type="button"
              onClick={() => removeResource(index)}
              className="px-3 text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-[var(--border)]">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="px-4 py-2 text-sm text-[var(--ink)] bg-gray-100 hover:bg-gray-200 rounded transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 text-sm text-white bg-[var(--accent)] hover:bg-[var(--accent-dark)] rounded transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : topic ? 'Update Topic' : 'Create Topic'}
        </button>
      </div>
    </form>
  );
}
