import { useEffect, useState } from 'react';

/** SSR-safe browser language. */
export function useLanguage(): string {
  const [language, setLanguage] = useState(() =>
    typeof navigator !== 'undefined' ? navigator.language : 'en'
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handler = (): void => setLanguage(navigator.language);
    window.addEventListener('languagechange', handler);
    return () => window.removeEventListener('languagechange', handler);
  }, []);

  return language;
}
