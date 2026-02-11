import { promises as fs } from 'fs';
import path from 'path';
import { Category, Topic } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');
const TOPICS_FILE = path.join(DATA_DIR, 'topics.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
}

// Initialize data files with default data if they don't exist
export async function initializeDataFiles(defaultCategories: Category[], defaultTopics: Topic[]) {
  await ensureDataDir();
  
  try {
    await fs.access(CATEGORIES_FILE);
  } catch {
    await fs.writeFile(CATEGORIES_FILE, JSON.stringify(defaultCategories, null, 2));
  }
  
  try {
    await fs.access(TOPICS_FILE);
  } catch {
    await fs.writeFile(TOPICS_FILE, JSON.stringify(defaultTopics, null, 2));
  }
}

// Categories
export async function readCategories(): Promise<Category[]> {
  try {
    const data = await fs.readFile(CATEGORIES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function writeCategories(categories: Category[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(CATEGORIES_FILE, JSON.stringify(categories, null, 2));
}

// Topics
export async function readTopics(): Promise<Topic[]> {
  try {
    const data = await fs.readFile(TOPICS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function writeTopics(topics: Topic[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(TOPICS_FILE, JSON.stringify(topics, null, 2));
}
