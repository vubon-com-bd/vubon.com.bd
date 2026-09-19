import { useCallback } from 'react';
import { useTheme } from './use-theme';

export function useThemeToggle(): {
  readonly theme: 'light' | 'dark' | 'system';
  readonly resolved: 'light' | 'dark';
  readonly toggle: () => void;
  readonly setLight: () => void;
  readonly setDark: () => void;
  readonly setSystem: () => void;
} {
  const { theme, resolved, setTheme } = useTheme();

  const toggle = useCallback(() => {
    setTheme(resolved === 'dark' ? 'light' : 'dark');
  }, [resolved, setTheme]);
  const setLight = useCallback(() => setTheme('light'), [setTheme]);
  const setDark = useCallback(() => setTheme('dark'), [setTheme]);
  const setSystem = useCallback(() => setTheme('system'), [setTheme]);

  return { theme, resolved, toggle, setLight, setDark, setSystem };
}
