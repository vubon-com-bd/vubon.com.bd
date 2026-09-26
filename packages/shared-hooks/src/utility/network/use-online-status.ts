import { useEffect, useState } from 'react';

/** SSR-safe online/offline status. */
export function useOnlineStatus(): boolean {
  const [online, setOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const on = (): void => setOnline(true);
    const off = (): void => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

  return online;
}
