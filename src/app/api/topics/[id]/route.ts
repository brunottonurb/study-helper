import { NextRequest, NextResponse } from 'next/server';
import { readTopics, writeTopics } from '@/lib/data-store';
import { Topic } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET single topic
export async function GET(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  
  try {
    const topics = await readTopics();
    const topic = topics.find(t => t.id === id);
    
    if (!topic) {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }
    
    return NextResponse.json(topic);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch topic' }, { status: 500 });
  }
}

// PUT update topic
export async function PUT(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  
  try {
    const updatedTopic: Topic = await request.json();
    
    // Validate required fields
    if (!updatedTopic.title || !updatedTopic.description || !updatedTopic.category || !updatedTopic.confidence) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const topics = await readTopics();
    const index = topics.findIndex(t => t.id === id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }
    
    topics[index] = { ...updatedTopic, id }; // Preserve original ID
    await writeTopics(topics);
    
    return NextResponse.json(topics[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update topic' }, { status: 500 });
  }
}

// DELETE topic
export async function DELETE(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  
  try {
    const topics = await readTopics();
    const filtered = topics.filter(t => t.id !== id);
    
    if (filtered.length === topics.length) {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }
    
    await writeTopics(filtered);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete topic' }, { status: 500 });
  }
}
