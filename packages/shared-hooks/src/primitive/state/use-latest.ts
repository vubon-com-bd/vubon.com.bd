import { useRef } from 'react';

/**
 * Returns a ref that always holds the latest value.
 * Useful for stable callbacks without re-subscribing.
 */
export function useLatest<T>(value: T): { readonly current: T } {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}
