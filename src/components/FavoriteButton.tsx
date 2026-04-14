'use client';

import { useUserData } from './UserDataProvider';
import cx from 'classnames';

interface FavoriteButtonProps {
  topicId: string;
  className?: string;
}

const buttonClasses = (className?: string) => cx('inline-flex items-center justify-center border border-[var(--border)] bg-[var(--paper)] px-2 py-1 transition-colors cursor-pointer hover:bg-[var(--background)]', className);

export default function FavoriteButton({ topicId, className = '' }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useUserData();
  const favorited = isFavorite(topicId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(topicId);
      }}
      className={buttonClasses(className)}
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      title={favorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      {favorited ? (
        <svg className="w-4 h-4 text-[var(--accent)]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ) : (
        <svg className="w-4 h-4 text-[var(--ink-light)] hover:text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )}
    </button>
  );
}
