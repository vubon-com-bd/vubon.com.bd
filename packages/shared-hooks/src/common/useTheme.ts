import { useState, useEffect, useCallback } from 'react';
import { STORAGE_KEYS } from '@vubon/shared-constants/src/common/use.constants';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export interface UseThemeReturn {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  toggleTheme: () => void;
  setLightTheme: () => void;
  setDarkTheme: () => void;
  setSystemTheme: () => void;
  setTheme: (t: Theme) => void;
}

export const useTheme = (): UseThemeReturn => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system';
    const stored = window.localStorage.getItem(STORAGE_KEYS.THEME);
    return (stored as Theme) ?? 'system';
  });
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = window.document.documentElement;
    const systemTheme: ResolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    const resolved: ResolvedTheme = theme === 'system' ? systemTheme : theme;
    setResolvedTheme(resolved);
    root.classList.remove('light', 'dark');
    root.classList.add(resolved);
    window.localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : prev === 'dark' ? 'system' : 'light'));
  }, []);

  return {
    theme,
    resolvedTheme,
    toggleTheme,
    setLightTheme: () => setTheme('light'),
    setDarkTheme: () => setTheme('dark'),
    setSystemTheme: () => setTheme('system'),
    setTheme,
  };
};
