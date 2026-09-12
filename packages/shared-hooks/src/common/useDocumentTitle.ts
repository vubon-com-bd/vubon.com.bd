import { useEffect, useRef } from 'react';

export const useDocumentTitle = (title: string, restoreOnUnmount = false): void => {
  const originalTitle = useRef<string>('');

  useEffect(() => {
    if (typeof document === 'undefined') return;
    originalTitle.current = document.title;
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.title = title;
    return () => {
      if (restoreOnUnmount) document.title = originalTitle.current;
    };
  }, [title, restoreOnUnmount]);
};
