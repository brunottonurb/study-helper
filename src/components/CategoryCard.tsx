import Link from 'next/link';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  topicCount: number;
}

export default function CategoryCard({ category, topicCount }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.id}`}>
      <div className="group bg-[var(--paper)] border border-[var(--border)] p-6 hover:border-[var(--accent)] transition-all duration-200 paper-shadow h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <span className="text-2xl">{category.icon}</span>
          <span className="text-xs text-[var(--ink-light)] font-mono">{topicCount} notes</span>
        </div>
        
        <h3 className="text-lg font-serif font-semibold text-[var(--ink)] mb-2 group-hover:text-[var(--accent)] transition-colors">
          {category.name}
        </h3>
        <p className="text-[var(--ink-light)] text-sm leading-relaxed flex-grow">{category.description}</p>
        
        <div className="mt-4 pt-4 border-t border-[var(--border)]">
          <span className="text-xs text-[var(--accent)] group-hover:underline">
            Open notebook →
          </span>
        </div>
      </div>
    </Link>
  );
}
