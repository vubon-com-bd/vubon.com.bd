import { useCallback, useEffect, useState } from 'react';
import { usePrefersColorScheme } from '../media/use-prefers-color-scheme';

export type Theme = 'light' | 'dark' | 'system';
const STORAGE_KEY = 'vubon:theme';

export interface ThemeState {
  readonly theme: Theme;
  readonly resolved: 'light' | 'dark';
  readonly setTheme: (theme: Theme) => void;
}

/** Manages user's theme preference with system fallback. */
export function useTheme(): ThemeState {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system';
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
  });
  const system = usePrefersColorScheme();
  const resolved: 'light' | 'dark' = theme === 'system' ? system : theme;

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.dataset.theme = resolved;
  }, [resolved]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, next);
      }
    } catch {
      // ignore
    }
  }, []);

  return { theme, resolved, setTheme };
}
