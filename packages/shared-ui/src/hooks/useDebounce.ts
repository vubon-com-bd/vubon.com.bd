/**
 * useDebounce Hook - Debounce value changes
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-ui/src/hooks/useDebounce
 *
 * RULES:
 * ✅ ONLY UI debounce hook - NO business logic
 * ✅ NO API calls, auth logic
 * ✅ Pure React hook with AbortController support
 * ✅ TypeScript strict
 */

import { useState, useEffect, useCallback, useRef } from 'react';

// ==================== Types ====================

export interface UseDebounceOptions {
  /** Debounce delay in milliseconds (default: 500) */
  delay?: number;
  /** Maximum wait time before value is forced to update (prevents indefinite waiting) */
  maxWait?: number;
  /** Leading edge execution (execute immediately then debounce) */
  leading?: boolean;
  /** Trailing edge execution (execute after delay) */
  trailing?: boolean;
  /** AbortSignal for cancelling pending debounce */
  signal?: AbortSignal;
}

export interface DebouncedFunction<T extends (...args: unknown[]) => unknown> {
  (...args: Parameters<T>): void;
  /** Cancel any pending debounced execution */
  cancel: () => void;
  /** Immediately execute any pending debounced execution */
  flush: () => void;
}

// ==================== useDebounce ====================

/**
 * Hook for debouncing a value
 * Useful for search inputs, form fields, etc.
 *
 * @example
 * // Search input with debounce
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearch = useDebounce(searchTerm, 500);
 *
 * useEffect(() => {
 *   if (debouncedSearch) {
 *     searchAPI(debouncedSearch);
 *   }
 * }, [debouncedSearch]);
 *
 * @example
 * // With AbortController for cleanup
 * const abortController = new AbortController();
 * const debouncedValue = useDebounce(value, { delay: 300, signal: abortController.signal });
 */
export function useDebounce<T>(value: T, delayOrOptions: number | UseDebounceOptions = 500): T {
  const options: UseDebounceOptions = typeof delayOrOptions === 'number'
    ? { delay: delayOrOptions, leading: false, trailing: true }
    : { delay: 500, leading: false, trailing: true, ...delayOrOptions };

  const { delay = 500, leading = false, trailing = true, maxWait, signal } = options;

  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const maxWaitTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const leadingCalledRef = useRef(false);
  const valueRef = useRef(value);

  // Update value ref
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  // Handle AbortSignal
  useEffect(() => {
    if (!signal) return;

    const abortHandler = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (maxWaitTimeoutRef.current) {
        clearTimeout(maxWaitTimeoutRef.current);
        maxWaitTimeoutRef.current = null;
      }
    };

    signal.addEventListener('abort', abortHandler);
    return () => signal.removeEventListener('abort', abortHandler);
  }, [signal]);

  // Handle maxWait timeout
  useEffect(() => {
    if (!maxWait) return;

    const maxWaitHandler = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (!leadingCalledRef.current || trailing) {
        setDebouncedValue(valueRef.current);
      }
      leadingCalledRef.current = false;
    };

    if (maxWaitTimeoutRef.current) {
      clearTimeout(maxWaitTimeoutRef.current);
    }

    // Don't set maxWait if signal is aborted
    if (signal?.aborted) return;

    maxWaitTimeoutRef.current = setTimeout(maxWaitHandler, maxWait);

    return () => {
      if (maxWaitTimeoutRef.current) {
        clearTimeout(maxWaitTimeoutRef.current);
      }
    };
  }, [value, maxWait, trailing, signal]);

  useEffect(() => {
    // Don't proceed if signal is aborted
    if (signal?.aborted) return;

    // Leading edge execution
    if (leading && !leadingCalledRef.current) {
      setDebouncedValue(value);
      leadingCalledRef.current = true;

      const resetTimer = setTimeout(() => {
        leadingCalledRef.current = false;
      }, delay);

      return () => clearTimeout(resetTimer);
    }

    // Trailing edge execution (standard debounce)
    if (trailing) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (signal?.aborted) return;
        setDebouncedValue(value);
        leadingCalledRef.current = false;
        timeoutRef.current = null;
      }, delay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay, leading, trailing, signal]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (maxWaitTimeoutRef.current) {
        clearTimeout(maxWaitTimeoutRef.current);
      }
    };
  }, []);

  return debouncedValue;
}

// ==================== useDebouncedCallback ====================

/**
 * Hook for debouncing a callback function
 *
 * @example
 * const debouncedSearch = useDebouncedCallback((query: string) => {
 *   searchAPI(query);
 * }, 500);
 *
 * // Usage
 * onChange={(e) => debouncedSearch(e.target.value)}
 *
 * // With cancel and flush
 * const debounced = useDebouncedCallback(apiCall, 300);
 * debounced('test');
 * debounced.cancel(); // Cancel pending execution
 * debounced.flush(); // Immediately execute pending
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delayOrOptions: number | UseDebounceOptions = 500
): DebouncedFunction<T> {
  const options: UseDebounceOptions = typeof delayOrOptions === 'number'
    ? { delay: delayOrOptions, leading: false, trailing: true }
    : { delay: 500, leading: false, trailing: true, ...delayOrOptions };

  const { delay = 500, leading = false, trailing = true, maxWait, signal } = options;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const maxWaitTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const leadingCalledRef = useRef(false);
  const lastArgsRef = useRef<Parameters<T>>();
  const callbackRef = useRef(callback);

  // Update callback ref
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const invokeCallback = useCallback(() => {
    if (lastArgsRef.current && !signal?.aborted) {
      callbackRef.current(...lastArgsRef.current);
      lastArgsRef.current = undefined;
    }
    leadingCalledRef.current = false;
  }, [signal]);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (maxWaitTimeoutRef.current) {
      clearTimeout(maxWaitTimeoutRef.current);
      maxWaitTimeoutRef.current = null;
    }
    lastArgsRef.current = undefined;
    leadingCalledRef.current = false;
  }, []);

  const flush = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (lastArgsRef.current) {
      invokeCallback();
    }
  }, [invokeCallback]);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      // Don't proceed if signal is aborted
      if (signal?.aborted) return;

      lastArgsRef.current = args;

      // Leading edge execution
      if (leading && !leadingCalledRef.current) {
        callbackRef.current(...args);
        leadingCalledRef.current = true;
        lastArgsRef.current = undefined;

        const resetTimer = setTimeout(() => {
          leadingCalledRef.current = false;
        }, delay);

        timeoutRef.current = resetTimer as unknown as NodeJS.Timeout;
        return;
      }

      // Trailing edge execution
      if (trailing) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(invokeCallback, delay);
      }
    },
    [leading, trailing, delay, invokeCallback, signal]
  );

  // Handle maxWait
  useEffect(() => {
    if (!maxWait || signal?.aborted) return;

    const maxWaitHandler = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      invokeCallback();
    };

    if (maxWaitTimeoutRef.current) {
      clearTimeout(maxWaitTimeoutRef.current);
    }
    maxWaitTimeoutRef.current = setTimeout(maxWaitHandler, maxWait);

    return () => {
      if (maxWaitTimeoutRef.current) {
        clearTimeout(maxWaitTimeoutRef.current);
      }
    };
  }, [maxWait, invokeCallback, signal]);

  // Handle AbortSignal
  useEffect(() => {
    if (!signal) return;

    const abortHandler = () => {
      cancel();
    };

    signal.addEventListener('abort', abortHandler);
    return () => signal.removeEventListener('abort', abortHandler);
  }, [signal, cancel]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (maxWaitTimeoutRef.current) {
        clearTimeout(maxWaitTimeoutRef.current);
      }
    };
  }, []);

  // Attach cancel and flush to the debounced function
  const debounced = debouncedCallback as DebouncedFunction<T>;
  debounced.cancel = cancel;
  debounced.flush = flush;

  return debounced;
}

// ==================== useThrottle ====================

export interface UseThrottleOptions {
  /** Throttle delay in milliseconds */
  delay?: number;
  /** Leading edge execution */
  leading?: boolean;
  /** Trailing edge execution */
  trailing?: boolean;
  /** AbortSignal for cancelling pending throttle */
  signal?: AbortSignal;
}

/**
 * Hook for throttling a value (limits update frequency)
 *
 * @example
 * const throttledPosition = useThrottle(scrollPosition, 100);
 */
export function useThrottle<T>(value: T, delay: number = 500, signal?: AbortSignal): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRun = useRef<number>(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (signal?.aborted) return;

    const now = Date.now();
    const timeSinceLastRun = now - lastRun.current;

    if (timeSinceLastRun >= delay) {
      setThrottledValue(value);
      lastRun.current = now;
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        if (signal?.aborted) return;
        setThrottledValue(value);
        lastRun.current = Date.now();
        timeoutRef.current = null;
      }, delay - timeSinceLastRun);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay, signal]);

  return throttledValue;
}

/**
 * Hook for throttling a callback function
 *
 * @example
 * const throttledScroll = useThrottleCallback(() => {
 *   console.log('Scroll position:', window.scrollY);
 * }, 100);
 *
 * window.addEventListener('scroll', throttledScroll);
 */
export function useThrottleCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number = 500,
  options?: { leading?: boolean; trailing?: boolean; signal?: AbortSignal }
): DebouncedFunction<T> {
  const { leading = true, trailing = false, signal } = options || {};

  const lastRun = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastArgsRef = useRef<Parameters<T>>();
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const invokeCallback = useCallback(() => {
    if (lastArgsRef.current && !signal?.aborted) {
      callbackRef.current(...lastArgsRef.current);
      lastArgsRef.current = undefined;
    }
  }, [signal]);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    lastArgsRef.current = undefined;
  }, []);

  const flush = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (lastArgsRef.current) {
      invokeCallback();
    }
  }, [invokeCallback]);

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      if (signal?.aborted) return;

      const now = Date.now();
      const timeSinceLastRun = now - lastRun.current;

      lastArgsRef.current = args;

      if (timeSinceLastRun >= delay) {
        if (leading) {
          callbackRef.current(...args);
          lastArgsRef.current = undefined;
        }
        lastRun.current = now;

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }

        if (trailing) {
          timeoutRef.current = setTimeout(() => {
            invokeCallback();
            lastRun.current = Date.now();
            timeoutRef.current = null;
          }, delay);
        }
      } else if (trailing && !timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          invokeCallback();
          lastRun.current = Date.now();
          timeoutRef.current = null;
        }, delay - timeSinceLastRun);
      }
    },
    [delay, leading, trailing, invokeCallback, signal]
  );

  // Handle AbortSignal
  useEffect(() => {
    if (!signal) return;

    const abortHandler = () => {
      cancel();
    };

    signal.addEventListener('abort', abortHandler);
    return () => signal.removeEventListener('abort', abortHandler);
  }, [signal, cancel]);

  const throttled = throttledCallback as DebouncedFunction<T>;
  throttled.cancel = cancel;
  throttled.flush = flush;

  return throttled;
}

// ==================== Type Exports ====================

export type { UseDebounceOptions, DebouncedFunction };
