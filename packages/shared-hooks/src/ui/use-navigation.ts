import { useCallback, useEffect, useState } from 'react';

export interface NavigationState {
  readonly current: string;
  readonly history: readonly string[];
  readonly push: (path: string) => void;
  readonly replace: (path: string) => void;
  readonly back: () => void;
}

/**
 * Navigation state mirror for the current tab.
 * ⚠️ For actual routing, integrate with your router (Next.js, React Router).
 */
export function useNavigation(initial = '/'): NavigationState {
  const [history, setHistory] = useState<readonly string[]>([initial]);
  const [current, setCurrent] = useState(initial);

  const push = useCallback((path: string) => {
    setHistory((h) => [...h, path]);
    setCurrent(path);
  }, []);
  const replace = useCallback((path: string) => {
    setHistory((h) => (h.length === 0 ? [path] : [...h.slice(0, -1), path]));
    setCurrent(path);
  }, []);
  const back = useCallback(() => {
    setHistory((h) => {
      if (h.length <= 1) return h;
      const next = h.slice(0, -1);
      setCurrent(next[next.length - 1] ?? '/');
      return next;
    });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setCurrent(window.location.pathname);
  }, []);

  return { current, history, push, replace, back };
}
