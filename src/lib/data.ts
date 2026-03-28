import { prisma } from './prisma';
import type {
  Category,
  Topic,
  SearchResults,
  KeyPointSearchResult,
  CodeExampleSearchResult,
  QuizQuestionSearchResult,
} from '@/types';
import type { 
  Topic as PrismaTopic, 
  KeyPoint as PrismaKeyPoint,
  CodeExample as PrismaCodeExample,
  QuizQuestion as PrismaQuizQuestion,
  Category as PrismaCategory
} from '@prisma/client';

type TopicWithRelations = PrismaTopic & {
  keyPoints: PrismaKeyPoint[];
  codeExamples: PrismaCodeExample[];
  quizQuestions: PrismaQuizQuestion[];
  category?: PrismaCategory;
};

// Transform database results to match the existing Topic interface
function transformTopicFromDB(dbTopic: TopicWithRelations): Topic {
  return {
    id: dbTopic.id,
    title: dbTopic.title,
    description: dbTopic.description,
    icon: dbTopic.icon || undefined,
    categoryId: dbTopic.categoryId,
    category: dbTopic.category
      ? {
          id: dbTopic.category.id,
          name: dbTopic.category.name,
        }
      : undefined,
    confidence: dbTopic.confidence as 'beginner' | 'intermediate' | 'advanced' | 'expert',
    lastReviewed: dbTopic.lastReviewed || undefined,
    keyPoints: dbTopic.keyPoints.map((kp) => ({
      id: kp.id,
      title: kp.title,
      description: kp.description,
    })),
    codeExamples: dbTopic.codeExamples.map((ce) => ({
      id: ce.id,
      title: ce.title,
      language: ce.language,
      code: ce.code,
      explanation: ce.explanation || undefined,
    })),
    quizQuestions: dbTopic.quizQuestions.map((qq) => ({
      id: qq.id,
      question: qq.question,
      answer: qq.answer,
    })),
  };
}

// Transform database category to match the existing Category interface
function transformCategoryFromDB(dbCategory: PrismaCategory): Category {
  return {
    id: dbCategory.id,
    name: dbCategory.name,
    description: dbCategory.description,
    icon: dbCategory.icon,
  };
}

export async function getAllCategories(): Promise<Category[]> {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
  return categories.map(transformCategoryFromDB);
}

export async function getCategoryById(id: string): Promise<Category | null> {
  const category = await prisma.category.findUnique({
    where: { id },
  });
  return category ? transformCategoryFromDB(category) : null;
}

export async function getAllTopics(): Promise<Topic[]> {
  const topics = await prisma.topic.findMany({
    include: {
      category: true,
      keyPoints: { orderBy: { order: 'asc' } },
      codeExamples: { orderBy: { order: 'asc' } },
      quizQuestions: { orderBy: { order: 'asc' } },
    },
    orderBy: { title: 'asc' },
  });
  return topics.map(transformTopicFromDB);
}

export async function getTopicById(id: string): Promise<Topic | null> {
  const topic = await prisma.topic.findUnique({
    where: { id },
    include: {
      category: true,
      keyPoints: { orderBy: { order: 'asc' } },
      codeExamples: { orderBy: { order: 'asc' } },
      quizQuestions: { orderBy: { order: 'asc' } },
    },
  });
  return topic ? transformTopicFromDB(topic) : null;
}

export async function getTopicsByCategory(categoryId: string): Promise<Topic[]> {
  const topics = await prisma.topic.findMany({
    where: { categoryId },
    include: {
      category: true,
      keyPoints: { orderBy: { order: 'asc' } },
      codeExamples: { orderBy: { order: 'asc' } },
      quizQuestions: { orderBy: { order: 'asc' } },
    },
    orderBy: { title: 'asc' },
  });
  return topics.map(transformTopicFromDB);
}

export async function searchTopics(query: string): Promise<Topic[]> {
  const searchTerm = query.trim();

  if (!searchTerm) {
    return [];
  }

  const topics = await prisma.topic.findMany({
    where: {
      OR: [
        { title: { contains: searchTerm } },
        { description: { contains: searchTerm } },
      ],
    },
    include: {
      category: true,
      keyPoints: { orderBy: { order: 'asc' } },
      codeExamples: { orderBy: { order: 'asc' } },
      quizQuestions: { orderBy: { order: 'asc' } },
    },
    orderBy: { title: 'asc' },
  });
  return topics.map(transformTopicFromDB);
}

export async function searchAllContent(query: string): Promise<SearchResults> {
  const searchTerm = query.trim();

  if (!searchTerm) {
    return {
      topics: [],
      keyPoints: [],
      codeExamples: [],
      quizQuestions: [],
    };
  }

  const [topics, keyPoints, codeExamples, quizQuestions] = await Promise.all([
    prisma.topic.findMany({
      where: {
        OR: [
          { title: { contains: searchTerm } },
          { description: { contains: searchTerm } },
        ],
      },
      include: {
        category: true,
        keyPoints: { orderBy: { order: 'asc' } },
        codeExamples: { orderBy: { order: 'asc' } },
        quizQuestions: { orderBy: { order: 'asc' } },
      },
      orderBy: { title: 'asc' },
    }),
    prisma.keyPoint.findMany({
      where: {
        OR: [
          { title: { contains: searchTerm } },
          { description: { contains: searchTerm } },
        ],
      },
      include: {
        topic: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: [{ topic: { title: 'asc' } }, { order: 'asc' }],
    }),
    prisma.codeExample.findMany({
      where: {
        OR: [
          { title: { contains: searchTerm } },
          { language: { contains: searchTerm } },
          { code: { contains: searchTerm } },
          { explanation: { contains: searchTerm } },
        ],
      },
      include: {
        topic: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: [{ topic: { title: 'asc' } }, { order: 'asc' }],
    }),
    prisma.quizQuestion.findMany({
      where: {
        OR: [
          { question: { contains: searchTerm } },
          { answer: { contains: searchTerm } },
        ],
      },
      include: {
        topic: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: [{ topic: { title: 'asc' } }, { order: 'asc' }],
    }),
  ]);

  return {
    topics: topics.map(transformTopicFromDB),
    keyPoints: keyPoints.map<KeyPointSearchResult>((kp) => ({
      id: kp.id,
      title: kp.title,
      description: kp.description,
      topic: {
        id: kp.topic.id,
        title: kp.topic.title,
      },
    })),
    codeExamples: codeExamples.map<CodeExampleSearchResult>((ce) => ({
      id: ce.id,
      title: ce.title,
      language: ce.language,
      code: ce.code,
      explanation: ce.explanation || undefined,
      topic: {
        id: ce.topic.id,
        title: ce.topic.title,
      },
    })),
    quizQuestions: quizQuestions.map<QuizQuestionSearchResult>((qq) => ({
      id: qq.id,
      question: qq.question,
      answer: qq.answer,
      topic: {
        id: qq.topic.id,
        title: qq.topic.title,
      },
    })),
  };
}
