import { useEffect } from 'react';

/** Adds class to <body> while mounted, removes on unmount. */
export function useBodyClass(className: string, when = true): void {
  useEffect(() => {
    if (typeof document === 'undefined' || !when) return;
    document.body.classList.add(className);
    return () => {
      document.body.classList.remove(className);
    };
  }, [className, when]);
}
