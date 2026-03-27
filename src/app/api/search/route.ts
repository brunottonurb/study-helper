import { NextRequest, NextResponse } from 'next/server';
import { searchAllContent } from '@/lib/data';

// GET /api/search?q=... - Search across all content types
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';

    const results = await searchAllContent(query);
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error searching content:', error);
    return NextResponse.json(
      { error: 'Failed to search content' },
      { status: 500 }
    );
  }
}
