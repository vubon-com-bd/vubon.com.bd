import { useEffect, useRef, useCallback, useState } from 'react';

export interface UseTimeoutOptions {
  autoStart?: boolean;
}

export function useTimeout(
  callback: () => void,
  delay: number | null,
  options: UseTimeoutOptions = {}
): {
  start: () => void;
  stop: () => void;
  isRunning: boolean;
} {
  const { autoStart = true } = options;
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const start = useCallback(() => {
    if (timeoutRef.current || delay === null) return;

    timeoutRef.current = setTimeout(() => {
      callbackRef.current();
      setIsRunning(false);
      timeoutRef.current = null;
    }, delay);

    setIsRunning(true);
  }, [delay]);

  const stop = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
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
