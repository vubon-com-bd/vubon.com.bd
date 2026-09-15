import { useCallback, useEffect, useRef, useState } from 'react';

export interface Stopwatch {
  readonly elapsedMs: number;
  readonly isRunning: boolean;
  readonly start: () => void;
  readonly stop: () => void;
  readonly reset: () => void;
}

export function useStopwatch(): Stopwatch {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const startRef = useRef(0);

  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => {
      setElapsedMs(Date.now() - startRef.current);
    }, 100);
    return () => clearInterval(id);
  }, [isRunning]);

  const start = useCallback(() => {
    startRef.current = Date.now() - elapsedMs;
    setIsRunning(true);
  }, [elapsedMs]);

  const stop = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setElapsedMs(0);
    setIsRunning(false);
  }, []);

  return { elapsedMs, isRunning, start, stop, reset };
}
