import { Category, Topic } from '@/types';

// Client-side API calls for data management
export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch('/api/categories', { cache: 'no-store' });
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
}

export async function fetchCategory(id: string): Promise<Category> {
  const response = await fetch(`/api/categories/${id}`, { cache: 'no-store' });
  if (!response.ok) throw new Error('Failed to fetch category');
  return response.json();
}

export async function createCategory(category: Category): Promise<Category> {
  const response = await fetch('/api/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category),
  });
  if (!response.ok) throw new Error('Failed to create category');
  return response.json();
}

export async function updateCategory(id: string, category: Partial<Category>): Promise<Category> {
  const response = await fetch(`/api/categories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category),
  });
  if (!response.ok) throw new Error('Failed to update category');
  return response.json();
}

export async function deleteCategory(id: string): Promise<void> {
  const response = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete category');
}

export async function fetchTopics(): Promise<Topic[]> {
  const response = await fetch('/api/topics', { cache: 'no-store' });
  if (!response.ok) throw new Error('Failed to fetch topics');
  return response.json();
}

export async function fetchTopic(id: string): Promise<Topic> {
  const response = await fetch(`/api/topics/${id}`, { cache: 'no-store' });
  if (!response.ok) throw new Error('Failed to fetch topic');
  return response.json();
}

export async function createTopic(topic: Topic): Promise<Topic> {
  const response = await fetch('/api/topics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(topic),
  });
  if (!response.ok) throw new Error('Failed to create topic');
  return response.json();
}

export async function updateTopic(id: string, topic: Partial<Topic>): Promise<Topic> {
  const response = await fetch(`/api/topics/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(topic),
  });
  if (!response.ok) throw new Error('Failed to update topic');
  return response.json();
}

export async function deleteTopic(id: string): Promise<void> {
  const response = await fetch(`/api/topics/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete topic');
}

// Helper functions for server-side
export function getTopicsByCategory(topics: Topic[], categoryId: string): Topic[] {
  return topics.filter(topic => topic.category === categoryId);
}

export function getTopicById(topics: Topic[], id: string): Topic | undefined {
  return topics.find(topic => topic.id === id);
}

export function getCategoryById(categories: Category[], id: string): Category | undefined {
  return categories.find(cat => cat.id === id);
}

export function searchTopics(topics: Topic[], query: string): Topic[] {
  const lowerQuery = query.toLowerCase();
  return topics.filter(
    topic =>
      topic.title.toLowerCase().includes(lowerQuery) ||
      topic.description.toLowerCase().includes(lowerQuery) ||
      topic.keyPoints.some(kp => 
        kp.title.toLowerCase().includes(lowerQuery) ||
        kp.description.toLowerCase().includes(lowerQuery)
      )
  );
}
