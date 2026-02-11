'use client';

import { useState } from 'react';
import { Category } from '@/types';

interface CategoryFormProps {
  category?: Category;
  onSave: (category: Category) => Promise<void>;
  onCancel: () => void;
}

export function CategoryForm({ category, onSave, onCancel }: CategoryFormProps) {
  const [formData, setFormData] = useState<Category>(
    category || {
      id: '',
      name: '',
      description: '',
      icon: '📚',
      color: 'from-blue-500 to-cyan-500',
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
      setError(err instanceof Error ? err.message : 'Failed to save category');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-[var(--ink)] mb-1">
          ID {!category && <span className="text-red-500">*</span>}
        </label>
        <input
          type="text"
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          disabled={!!category}
          required
          className="w-full px-3 py-2 border border-[var(--border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--accent)] disabled:bg-gray-100"
          placeholder="unique-id"
        />
        {!category && (
          <p className="text-xs text-[var(--ink-light)] mt-1">
            Lowercase, hyphen-separated (e.g., machine-learning)
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--ink)] mb-1">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full px-3 py-2 border border-[var(--border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          placeholder="Category Name"
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
          placeholder="Brief description of this category"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--ink)] mb-1">
          Icon <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.icon}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          required
          className="w-full px-3 py-2 border border-[var(--border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          placeholder="📚"
        />
        <p className="text-xs text-[var(--ink-light)] mt-1">
          Use an emoji character
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--ink)] mb-1">
          Color <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.color}
          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          required
          className="w-full px-3 py-2 border border-[var(--border)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        >
          <option value="from-blue-500 to-cyan-500">Blue to Cyan</option>
          <option value="from-purple-500 to-pink-500">Purple to Pink</option>
          <option value="from-green-500 to-emerald-500">Green to Emerald</option>
          <option value="from-orange-500 to-red-500">Orange to Red</option>
          <option value="from-yellow-500 to-amber-500">Yellow to Amber</option>
          <option value="from-cyan-500 to-blue-500">Cyan to Blue</option>
          <option value="from-green-500 to-teal-500">Green to Teal</option>
          <option value="from-violet-500 to-purple-500">Violet to Purple</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
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
          {saving ? 'Saving...' : category ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
}
