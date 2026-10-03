import { useEffect } from 'react';

/** Sets document.title while mounted, restores on unmount. */
export function useDocumentTitle(title: string): void {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const prev = document.title;
    document.title = title;
    return () => {
      document.title = prev;
    };
  }, [title]);
}
