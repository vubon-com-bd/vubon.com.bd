import { useEffect, useState } from 'react';

/** Page visibility state. */
export function useVisibility(): 'visible' | 'hidden' {
  const [state, setState] = useState<'visible' | 'hidden'>(
    typeof document !== 'undefined' ? (document.visibilityState as 'visible' | 'hidden') : 'visible'
  );

  useEffect(() => {
    const handler = (): void => {
      setState(document.visibilityState as 'visible' | 'hidden');
    };
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, []);

  return state;
}
