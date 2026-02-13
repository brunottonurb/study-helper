import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/topics/[id] - Get a single topic with all relations
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const topic = await prisma.topic.findUnique({
      where: { id },
      include: {
        keyPoints: { orderBy: { order: 'asc' } },
        codeExamples: { orderBy: { order: 'asc' } },
        quizQuestions: { orderBy: { order: 'asc' } },
        resources: { orderBy: { order: 'asc' } },
        category: true,
      },
    });

    if (!topic) {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }

    return NextResponse.json(topic);
  } catch (error) {
    console.error('Error fetching topic:', error);
    return NextResponse.json(
      { error: 'Failed to fetch topic' },
      { status: 500 }
    );
  }
}

// PUT /api/topics/[id] - Update a topic (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const {
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

    // Delete existing relations
    await prisma.keyPoint.deleteMany({ where: { topicId: id } });
    await prisma.codeExample.deleteMany({ where: { topicId: id } });
    await prisma.quizQuestion.deleteMany({ where: { topicId: id } });
    await prisma.resource.deleteMany({ where: { topicId: id } });

    // Update topic with new relations
    const topic = await prisma.topic.update({
      where: { id },
      data: {
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
        keyPoints: { orderBy: { order: 'asc' } },
        codeExamples: { orderBy: { order: 'asc' } },
        quizQuestions: { orderBy: { order: 'asc' } },
        resources: { orderBy: { order: 'asc' } },
        category: true,
      },
    });

    return NextResponse.json(topic);
  } catch (error) {
    console.error('Error updating topic:', error);
    return NextResponse.json(
      { error: 'Failed to update topic' },
      { status: 500 }
    );
  }
}

// DELETE /api/topics/[id] - Delete a topic (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.topic.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting topic:', error);
    return NextResponse.json(
      { error: 'Failed to delete topic' },
      { status: 500 }
    );
  }
}
