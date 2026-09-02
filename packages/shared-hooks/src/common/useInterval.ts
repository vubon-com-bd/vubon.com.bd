import { useEffect, useRef, useCallback, useState } from 'react';

export interface UseIntervalOptions {
  autoStart?: boolean;
  immediate?: boolean;
}

export function useInterval(
  callback: () => void,
  delay: number | null,
  options: UseIntervalOptions = {}
): {
  start: () => void;
  stop: () => void;
  isRunning: boolean;
} {
  const { autoStart = true, immediate = false } = options;
  const callbackRef = useRef(callback);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const start = useCallback(() => {
    if (intervalRef.current || delay === null) return;

    if (immediate) {
      callbackRef.current();
    }

    intervalRef.current = setInterval(() => {
      callbackRef.current();
    }, delay);

    setIsRunning(true);
  }, [delay, immediate]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);
    }
  }, []);

  useEffect(() => {
    if (autoStart && delay !== null) {
      start();
    }

    return () => {
      stop();
    };
  }, [autoStart, delay, start, stop]);

  return {
    start,
    stop,
    isRunning,
  };
}
