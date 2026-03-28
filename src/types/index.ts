export interface CodeExample {
  id?: string;
  title: string;
  language: string;
  code: string;
  explanation?: string;
}

export interface KeyPoint {
  id?: string;
  title: string;
  description: string;
}

export interface QuizQuestion {
  id?: string;
  question: string;
  answer: string;
}

export interface TopicCategory {
  id: string;
  name: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon?: string;
  categoryId: string;
  category?: TopicCategory;
  keyPoints: KeyPoint[];
  codeExamples: CodeExample[];
  quizQuestions?: QuizQuestion[];
  lastReviewed?: string;
  confidence: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface SearchTopicRef {
  id: string;
  title: string;
}

export interface KeyPointSearchResult {
  id: string;
  title: string;
  description: string;
  topic: SearchTopicRef;
}

export interface CodeExampleSearchResult {
  id: string;
  title: string;
  language: string;
  code: string;
  explanation?: string;
  topic: SearchTopicRef;
}

export interface QuizQuestionSearchResult {
  id: string;
  question: string;
  answer: string;
  topic: SearchTopicRef;
}

export interface SearchResults {
  topics: Topic[];
  keyPoints: KeyPointSearchResult[];
  codeExamples: CodeExampleSearchResult[];
  quizQuestions: QuizQuestionSearchResult[];
}
