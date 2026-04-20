import { getAllCategories, getAllTopics } from '@/lib/data';
import BrowserView from '@/components/BrowserView';

export default async function OverviewPage() {
  const categories = await getAllCategories();
  const topics = await getAllTopics();

  return (
    <div className="min-h-screen py-12 lg:flex lg:h-[calc(100dvh-var(--app-header-height))] lg:min-h-0 lg:flex-col lg:overflow-hidden lg:px-6 lg:py-6 lg:box-border">
      {/* Mobile/Tablet View */}
      <div className="lg:hidden max-w-4xl mx-auto px-6">
        <div className="mb-10">
          <h1 className="text-2xl font-serif font-bold text-[var(--ink)] mb-3">
            Browse Subjects & Topics
          </h1>
          <p className="text-[var(--ink-light)] leading-relaxed">
            This view is optimized for desktop displays. Please open this page on a wider screen to use the three-column navigator.
          </p>
        </div>
      </div>

      {/* Desktop Three-Column View */}
      <div className="hidden lg:flex lg:flex-1 lg:min-h-0 lg:flex-col">
        <h1 className="text-2xl font-serif font-bold text-[var(--ink)] mb-6">Browse Content</h1>
        <div className="flex-1 min-h-0">
          <BrowserView categories={categories} topics={topics} />
        </div>
      </div>
    </div>
  );
}
