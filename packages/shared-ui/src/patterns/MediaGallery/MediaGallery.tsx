'use client';
import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface MediaItem {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
  readonly caption?: string;
}

export interface MediaGalleryProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  readonly items: readonly MediaItem[];
  readonly columns?: 2 | 3 | 4;
  readonly onSelect?: (item: MediaItem, index: number) => void;
}

const columnClasses = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 md:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-4',
} as const;

export const MediaGallery = forwardRef<HTMLDivElement, MediaGalleryProps>(function MediaGallery(
  { items, columns = 3, onSelect, className, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cn('grid gap-2', columnClasses[columns], className)} {...rest}>
      {items.map((item, i) => (
        <figure key={item.id} className="relative overflow-hidden rounded-md">
          <button
            type="button"
            onClick={() => onSelect?.(item, i)}
            aria-label={item.alt}
            className="block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full object-cover transition-transform hover:scale-105"
            />
          </button>
          {item.caption && (
            <figcaption className="absolute inset-x-0 bottom-0 bg-black/50 px-2 py-1 text-xs text-white">
              {item.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
});

MediaGallery.displayName = 'MediaGallery';
