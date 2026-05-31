/**
 * useDebounce Hook - Debounce value changes
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/src/hooks/useDebounce
 * 
 * RULES:
 * ✅ ONLY UI debounce hook - NO business logic
 * ✅ NO API calls, auth logic
 * ✅ Pure React hook
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
 * // With custom options
 * const debouncedValue = useDebounce(value, { delay: 300, leading: true });
 */
export function useDebounce<T>(value: T, delayOrOptions: number | UseDebounceOptions = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  const options: UseDebounceOptions = typeof delayOrOptions === 'number'
    ? { delay: delayOrOptions, leading: false, trailing: true }
    : { delay: 500, leading: false, trailing: true, ...delayOrOptions };
  
  const { delay = 500, leading = false, trailing = true, maxWait } = options;
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const maxWaitTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const leadingCalledRef = useRef(false);
  const valueRef = useRef(value);

  // Update value ref
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

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
    maxWaitTimeoutRef.current = setTimeout(maxWaitHandler, maxWait);
    
    return () => {
      if (maxWaitTimeoutRef.current) {
        clearTimeout(maxWaitTimeoutRef.current);
      }
    };
  }, [value, maxWait, trailing]);

  useEffect(() => {
    // Leading edge execution
    if (leading && !leadingCalledRef.current) {
      setDebouncedValue(value);
      leadingCalledRef.current = true;
      
      // Reset leading flag after delay
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
  }, [value, delay, leading, trailing]);

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
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delayOrOptions: number | UseDebounceOptions = 500
): (...args: Parameters<T>) => void {
  const options: UseDebounceOptions = typeof delayOrOptions === 'number'
    ? { delay: delayOrOptions, leading: false, trailing: true }
    : { delay: 500, leading: false, trailing: true, ...delayOrOptions };
  
  const { delay = 500, leading = false, trailing = true, maxWait } = options;
  
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
    if (lastArgsRef.current) {
      callbackRef.current(...lastArgsRef.current);
      lastArgsRef.current = undefined;
    }
    leadingCalledRef.current = false;
  }, []);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
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
    [leading, trailing, delay, invokeCallback]
  );

  // Handle maxWait
  useEffect(() => {
    if (!maxWait) return;
    
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
  }, [maxWait, invokeCallback]);

  // Cleanup
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

  return debouncedCallback;
}

// ==================== useThrottle ====================

export interface UseThrottleOptions {
  /** Throttle delay in milliseconds */
  delay?: number;
  /** Leading edge execution */
  leading?: boolean;
  /** Trailing edge execution */
  trailing?: boolean;
}

/**
 * Hook for throttling a value (limits update frequency)
 * 
 * @example
 * const throttledPosition = useThrottle(scrollPosition, 100);
 */
export function useThrottle<T>(value: T, delay: number = 500): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRun = useRef<number>(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
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
  }, [value, delay]);

  return throttledValue;
}

// ==================== Type Exports ====================

export type { UseDebounceOptions };
