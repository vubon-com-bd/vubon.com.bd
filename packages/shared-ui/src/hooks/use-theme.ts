'use client';
import { useCallback, useEffect, useState } from 'react';
import { usePrefersColorScheme } from '@vubon/shared-hooks/utility';
import { applyTheme, getCurrentTheme } from '../utils/theme';
import type { ThemeName } from '../styles/themes';

export type ThemePreference = ThemeName | 'system';

const STORAGE_KEY = 'vubon:ui:theme';

export interface UseThemeResult {
  readonly preference: ThemePreference;
  readonly resolved: ThemeName;
  readonly setTheme: (theme: ThemePreference) => void;
  readonly toggleDark: () => void;
}

/**
 * UI-only theme hook.
 * ⚠️ Re-uses shared-hooks' `usePrefersColorScheme`.
 */
export function useTheme(): UseThemeResult {
  const system = usePrefersColorScheme();
  const [preference, setPreference] = useState<ThemePreference>(() => {
    if (typeof window === 'undefined') return 'system';
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (
      stored === 'light' ||
      stored === 'dark' ||
      stored === 'high-contrast' ||
      stored === 'admin' ||
      stored === 'seller' ||
      stored === 'customer' ||
      stored === 'system'
    ) {
      return stored;
    }
    return 'system';
  });

  const resolved: ThemeName = preference === 'system' ? system : preference;

  useEffect(() => {
    applyTheme(resolved);
  }, [resolved]);

  const setTheme = useCallback((theme: ThemePreference) => {
    setPreference(theme);
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, theme);
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleDark = useCallback(() => {
    setTheme(resolved === 'dark' ? 'light' : 'dark');
  }, [resolved, setTheme]);

  useEffect(() => {
    const current = getCurrentTheme();
    if (current && preference !== 'system' && current !== resolved) {
      applyTheme(resolved);
    }
  }, [preference, resolved]);

  return { preference, resolved, setTheme, toggleDark };
}
