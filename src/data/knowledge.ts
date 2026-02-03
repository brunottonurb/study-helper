// Re-export everything from the new modular structure for backward compatibility
export {
  categories,
  getCategoryById,
} from './categories';

export {
  topics,
} from './topics';

export {
  getTopicsByCategory,
  getTopicById,
  searchTopics,
} from './index';
