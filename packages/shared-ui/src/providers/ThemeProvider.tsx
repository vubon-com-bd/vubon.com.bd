'use client';
import { createContext, useContext, type ReactNode } from 'react';
import { useTheme, type ThemePreference, type UseThemeResult } from '../hooks/use-theme';

const ThemeContext = createContext<UseThemeResult | null>(null);

export interface ThemeProviderProps {
  readonly children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  const value = useTheme();
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext(): UseThemeResult {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeContext must be used within <ThemeProvider>');
  return ctx;
}

export type { ThemePreference };
