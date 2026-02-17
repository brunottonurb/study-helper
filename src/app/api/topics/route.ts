import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getAllTopics, searchTopics } from '@/lib/data';
import { prisma } from '@/lib/prisma';

// GET /api/topics - Get all topics or search topics
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const searchQuery = searchParams.get('search');

    let topics;
    if (searchQuery) {
      topics = await searchTopics(searchQuery);
    } else {
      topics = await getAllTopics();
    }

    return NextResponse.json(topics);
  } catch (error) {
    console.error('Error fetching topics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch topics' },
      { status: 500 }
    );
  }
}

// POST /api/topics - Create a new topic (admin only)
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      id,
      title,
      description,
      icon,
      categoryId,
      confidence,
      lastReviewed,
      keyPoints,
      codeExamples,
      quizQuestions,
      resources,
    } = body;

    if (!id || !title || !description || !categoryId || !confidence) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const topic = await prisma.topic.create({
      data: {
        id,
        title,
        description,
        icon: icon || '',
        categoryId,
        confidence,
        lastReviewed,
        keyPoints: {
          create: keyPoints?.map((kp: any, index: number) => ({
            title: kp.title,
            description: kp.description,
            order: index,
          })) || [],
        },
        codeExamples: {
          create: codeExamples?.map((ce: any, index: number) => ({
            title: ce.title,
            language: ce.language,
            code: ce.code,
            explanation: ce.explanation,
            order: index,
          })) || [],
        },
        quizQuestions: {
          create: quizQuestions?.map((qq: any, index: number) => ({
            question: qq.question,
            answer: qq.answer,
            order: index,
          })) || [],
        },
        resources: {
          create: resources?.map((url: string, index: number) => ({
            url,
            order: index,
          })) || [],
        },
      },
      include: {
        keyPoints: true,
        codeExamples: true,
        quizQuestions: true,
        resources: true,
        category: true,
      },
    });

    return NextResponse.json(topic, { status: 201 });
  } catch (error) {
    console.error('Error creating topic:', error);
    return NextResponse.json(
      { error: 'Failed to create topic' },
      { status: 500 }
    );
  }
}
