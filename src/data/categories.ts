import { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'theoretical-cs',
    name: 'Theoretical Computer Science',
    description: 'Foundations of computation and algorithms',
    icon: '🧮',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'technical-cs',
    name: 'Technical Computer Science',
    description: 'Hardware, architecture, and low-level systems',
    icon: '🔧',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'databases',
    name: 'Databases',
    description: 'Data storage, retrieval, and management',
    icon: '🗄️',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'networks',
    name: 'Computer Networks',
    description: 'Network protocols and communication',
    icon: '🌐',
    color: 'from-orange-500 to-red-500',
  },
  // Work Experience
  {
    id: 'languages',
    name: 'Programming Languages',
    description: 'JavaScript and TypeScript expertise from professional experience',
    icon: '📝',
    color: 'from-yellow-500 to-amber-500',
  },
  {
    id: 'frontend',
    name: 'Frontend Development',
    description: 'React and modern frontend development',
    icon: '⚛️',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'backend',
    name: 'Backend Development',
    description: 'Node.js server-side development',
    icon: '🖥️',
    color: 'from-green-500 to-teal-500',
  },
  {
    id: 'desktop',
    name: 'Desktop Applications',
    description: 'Cross-platform desktop apps with Electron.js',
    icon: '💻',
    color: 'from-violet-500 to-purple-500',
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find(cat => cat.id === id);
}
