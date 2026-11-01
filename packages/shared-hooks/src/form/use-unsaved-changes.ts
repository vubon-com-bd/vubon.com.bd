import { useEffect } from 'react';

/** Warns user on page unload when there are unsaved changes. */
export function useUnsavedChanges(dirty: boolean, message = 'You have unsaved changes'): void {
  useEffect(() => {
    if (!dirty || typeof window === 'undefined') return;
    const handler = (e: BeforeUnloadEvent): void => {
      e.preventDefault();
      e.returnValue = message;
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [dirty, message]);
}
