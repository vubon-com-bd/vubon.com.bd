import { useTheme } from './use-theme';

/** Convenience — is dark mode active right now. */
export function useDarkMode(): boolean {
  return useTheme().resolved === 'dark';
}
