import { NextRequest, NextResponse } from 'next/server';
import { readCategories, writeCategories } from '@/lib/data-store';
import { Category } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET single category
export async function GET(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  
  try {
    const categories = await readCategories();
    const category = categories.find(c => c.id === id);
    
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
  }
}

// PUT update category
export async function PUT(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  
  try {
    const updatedCategory: Category = await request.json();
    
    // Validate required fields
    if (!updatedCategory.name || !updatedCategory.description || !updatedCategory.icon || !updatedCategory.color) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const categories = await readCategories();
    const index = categories.findIndex(c => c.id === id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    
    categories[index] = { ...updatedCategory, id }; // Preserve original ID
    await writeCategories(categories);
    
    return NextResponse.json(categories[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

// DELETE category
export async function DELETE(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  
  try {
    const categories = await readCategories();
    const filtered = categories.filter(c => c.id !== id);
    
    if (filtered.length === categories.length) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    
    await writeCategories(filtered);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
