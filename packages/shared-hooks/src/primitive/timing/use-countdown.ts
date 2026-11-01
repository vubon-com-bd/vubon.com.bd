import { useCallback, useEffect, useState } from 'react';

export interface Countdown {
  readonly remaining: number;
  readonly isRunning: boolean;
  readonly start: (seconds?: number) => void;
  readonly pause: () => void;
  readonly reset: () => void;
}

export function useCountdown(initialSeconds = 0): Countdown {
  const [remaining, setRemaining] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    if (remaining <= 0) {
      setIsRunning(false);
      return;
    }
    const id = setTimeout(() => setRemaining((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [isRunning, remaining]);

  const start = useCallback((seconds?: number) => {
    if (seconds !== undefined) setRemaining(seconds);
    setIsRunning(true);
  }, []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setRemaining(initialSeconds);
    setIsRunning(false);
  }, [initialSeconds]);

  return { remaining, isRunning, start, pause, reset };
}
