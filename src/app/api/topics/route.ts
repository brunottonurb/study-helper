import { NextRequest, NextResponse } from 'next/server';
import { readTopics, writeTopics } from '@/lib/data-store';
import { Topic } from '@/types';

// GET all topics
export async function GET() {
  try {
    const topics = await readTopics();
    return NextResponse.json(topics);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch topics' }, { status: 500 });
  }
}

// POST new topic
export async function POST(request: NextRequest) {
  try {
    const newTopic: Topic = await request.json();
    
    // Validate required fields
    if (!newTopic.id || !newTopic.title || !newTopic.description || !newTopic.category || !newTopic.confidence) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const topics = await readTopics();
    
    // Check if ID already exists
    if (topics.some(t => t.id === newTopic.id)) {
      return NextResponse.json({ error: 'Topic ID already exists' }, { status: 409 });
    }
    
    topics.push(newTopic);
    await writeTopics(topics);
    
    return NextResponse.json(newTopic, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create topic' }, { status: 500 });
  }
}
