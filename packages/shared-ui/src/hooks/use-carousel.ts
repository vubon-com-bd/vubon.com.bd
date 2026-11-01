'use client';
import { useCallback, useState } from 'react';

export interface UseCarouselResult {
  readonly index: number;
  readonly total: number;
  readonly isFirst: boolean;
  readonly isLast: boolean;
  readonly next: () => void;
  readonly prev: () => void;
  readonly goTo: (i: number) => void;
  readonly reset: () => void;
}

/** UI-only carousel state. */
export function useCarousel(totalSlides: number, initial = 0): UseCarouselResult {
  const [index, setIndex] = useState(initial);
  const total = Math.max(1, totalSlides);

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);
  const goTo = useCallback((i: number) => setIndex(Math.max(0, Math.min(i, total - 1))), [total]);
  const reset = useCallback(() => setIndex(initial), [initial]);

  return {
    index,
    total,
    isFirst: index === 0,
    isLast: index === total - 1,
    next,
    prev,
    goTo,
    reset,
  };
}
