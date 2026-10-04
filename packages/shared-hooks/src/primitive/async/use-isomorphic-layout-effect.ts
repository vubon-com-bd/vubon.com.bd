import { useEffect, useLayoutEffect } from 'react';

/**
 * `useLayoutEffect` on client, `useEffect` on server.
 * Prevents SSR warning.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
