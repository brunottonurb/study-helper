import { NextRequest, NextResponse } from 'next/server';
import { readCategories, writeCategories, initializeDataFiles } from '@/lib/data-store';
import { categories as defaultCategories } from '@/data/categories';
import { topics as defaultTopics } from '@/data/topics';
import { Category } from '@/types';

// Initialize data files on first load
initializeDataFiles(defaultCategories, defaultTopics);

// GET all categories
export async function GET() {
  try {
    const categories = await readCategories();
    return NextResponse.json(categories);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

// POST new category
export async function POST(request: NextRequest) {
  try {
    const newCategory: Category = await request.json();
    
    // Validate required fields
    if (!newCategory.id || !newCategory.name || !newCategory.description || !newCategory.icon || !newCategory.color) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const categories = await readCategories();
    
    // Check if ID already exists
    if (categories.some(c => c.id === newCategory.id)) {
      return NextResponse.json({ error: 'Category ID already exists' }, { status: 409 });
    }
    
    categories.push(newCategory);
    await writeCategories(categories);
    
    return NextResponse.json(newCategory, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
