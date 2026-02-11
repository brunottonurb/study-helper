import { Topic, Category } from '@/types';

// Shared utility functions for filtering and searching data
// These are pure functions that can be used on both client and server

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
