import { useRef } from 'react';
import { useIntersectionObserver } from './use-intersection-observer';

/**
 * Returns `[ref, inView]` — attach ref to any element.
 * Convenience wrapper around useIntersectionObserver.
 */
export function useInView<T extends HTMLElement>(
  options: IntersectionObserverInit = {}
): readonly [{ readonly current: T | null }, boolean] {
  const ref = useRef<T>(null);
  const { isIntersecting } = useIntersectionObserver(ref, options);
  return [ref, isIntersecting] as const;
}
