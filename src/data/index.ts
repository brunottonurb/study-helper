import { Topic } from '@/types';

// Import categories
export { categories, getCategoryById } from './categories';

// Import all topics
export { topics } from './topics';

// Re-export individual topics for direct imports
export * from './topics';

// Import topics for helper functions
import { topics } from './topics';

export function getTopicsByCategory(categoryId: string): Topic[] {
  return topics.filter(topic => topic.category === categoryId);
}

export function getTopicById(id: string): Topic | undefined {
  return topics.find(topic => topic.id === id);
}

export function searchTopics(query: string): Topic[] {
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
