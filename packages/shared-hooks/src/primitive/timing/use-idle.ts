import { useEffect, useState } from 'react';

/** True if user has been idle for `timeoutMs`. */
export function useIdle(timeoutMs = 60_000): boolean {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const reset = (): void => {
      setIdle(false);
      clearTimeout(timer);
      timer = setTimeout(() => setIdle(true), timeoutMs);
    };
    const events = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'];
    for (const ev of events) window.addEventListener(ev, reset, { passive: true });
    reset();
    return () => {
      clearTimeout(timer);
      for (const ev of events) window.removeEventListener(ev, reset);
    };
  }, [timeoutMs]);

  return idle;
}
