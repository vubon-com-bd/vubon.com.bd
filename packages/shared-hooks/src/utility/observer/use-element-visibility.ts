import { useIntersectionObserver } from './use-intersection-observer';
import type { RefObject } from 'react';

/** Fraction of the element currently visible (0–1). */
export function useElementVisibility<T extends HTMLElement>(ref: RefObject<T>): number {
  const { entry } = useIntersectionObserver(ref, { threshold: [0, 0.25, 0.5, 0.75, 1] });
  return entry?.intersectionRatio ?? 0;
}
