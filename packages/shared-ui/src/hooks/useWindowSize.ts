/**
 * useWindowSize Hook - Window dimensions helper
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/src/hooks/useWindowSize
 * 
 * RULES:
 * ✅ ONLY window dimension tracking - NO business logic
 * ✅ NO API calls, auth logic
 * ✅ Pure UI hook
 * ✅ TypeScript strict
 * ✅ SSR-safe with debouncing
 */

import { useState, useEffect, useCallback, useRef } from 'react';

// ==================== Types ====================

export interface WindowSize {
  /** Window width in pixels */
  width: number;
  /** Window height in pixels */
  height: number;
}

export interface WindowSizeOptions {
  /** Debounce delay in milliseconds (default: 150) */
  debounceMs?: number;
  /** Whether to enable throttling instead of debouncing (default: false) */
  throttle?: boolean;
  /** Throttle interval in milliseconds (default: 150) */
  throttleMs?: number;
  /** Whether to include scrollbar dimensions (default: true) */
  includeScrollbar?: boolean;
}

export interface WindowSizeReturn extends WindowSize {
  /** Whether the window size is being measured (for SSR) */
  isMeasuring: boolean;
  /** Breakpoint helper methods */
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  isUltraWide: boolean;
}

// ==================== Breakpoints (consistent with Tailwind) ====================

const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  largeDesktop: 1280,
  ultraWide: 1536,
} as const;

// ==================== SSR Safe Initial State ====================

const getInitialSize = (): WindowSize => ({
  width: 0,
  height: 0,
});

// ==================== Hook ====================

/**
 * Hook for tracking window size with debouncing/throttling
 * 
 * @example
 * // Basic usage
 * const { width, height } = useWindowSize();
 * 
 * @example
 * // With debouncing
 * const { width } = useWindowSize({ debounceMs: 200 });
 * 
 * @example
 * // With throttling for performance
 * const { width, isMobile } = useWindowSize({ throttle: true, throttleMs: 100 });
 * 
 * @example
 * // With breakpoint helpers
 * const { isMobile, isDesktop, isTablet } = useWindowSize();
 */
export const useWindowSize = (options: WindowSizeOptions = {}): WindowSizeReturn => {
  const {
    debounceMs = 150,
    throttle = false,
    throttleMs = 150,
    includeScrollbar = true,
  } = options;

  const [windowSize, setWindowSize] = useState<WindowSize>(getInitialSize);
  const [isMeasuring, setIsMeasuring] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastRunRef = useRef<number>(0);

  const getWindowSize = useCallback((): WindowSize => {
    if (typeof window === 'undefined') {
      return { width: 0, height: 0 };
    }

    const width = includeScrollbar
      ? window.innerWidth
      : document.documentElement.clientWidth;
    const height = includeScrollbar
      ? window.innerHeight
      : document.documentElement.clientHeight;

    return { width, height };
  }, [includeScrollbar]);

  const updateSize = useCallback(() => {
    setWindowSize(getWindowSize());
    setIsMeasuring(false);
  }, [getWindowSize]);

  // Debounced resize handler
  const handleResizeDebounced = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(updateSize, debounceMs);
  }, [updateSize, debounceMs]);

  // Throttled resize handler
  const handleResizeThrottled = useCallback(() => {
    const now = Date.now();
    if (now - lastRunRef.current >= throttleMs) {
      lastRunRef.current = now;
      updateSize();
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        updateSize();
        lastRunRef.current = Date.now();
      }, throttleMs - (now - lastRunRef.current));
    }
  }, [updateSize, throttleMs]);

  const handleResize = throttle ? handleResizeThrottled : handleResizeDebounced;

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsMeasuring(false);
      return;
    }

    // Initial size
    updateSize();

    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Also listen for orientation change on mobile
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleResize, updateSize]);

  const { width, height } = windowSize;
  
  const isMobile = width > 0 && width < BREAKPOINTS.mobile;
  const isTablet = width >= BREAKPOINTS.mobile && width < BREAKPOINTS.desktop;
  const isDesktop = width >= BREAKPOINTS.desktop && width < BREAKPOINTS.largeDesktop;
  const isLargeDesktop = width >= BREAKPOINTS.largeDesktop && width < BREAKPOINTS.ultraWide;
  const isUltraWide = width >= BREAKPOINTS.ultraWide;

  return {
    width,
    height,
    isMeasuring,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isUltraWide,
  };
};

// ==================== useWindowSizeLite ====================

/**
 * Lightweight version without breakpoint helpers (better performance)
 */
export const useWindowSizeLite = (options?: WindowSizeOptions): WindowSize => {
  const { debounceMs = 150, throttle = false, throttleMs = 150, includeScrollbar = true } = options || {};
  const [windowSize, setWindowSize] = useState<WindowSize>(getInitialSize);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastRunRef = useRef<number>(0);

  const getWindowSize = useCallback((): WindowSize => {
    if (typeof window === 'undefined') {
      return { width: 0, height: 0 };
    }
    return {
      width: includeScrollbar ? window.innerWidth : document.documentElement.clientWidth,
      height: includeScrollbar ? window.innerHeight : document.documentElement.clientHeight,
    };
  }, [includeScrollbar]);

  const updateSize = useCallback(() => {
    setWindowSize(getWindowSize());
  }, [getWindowSize]);

  const handleResizeDebounced = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(updateSize, debounceMs);
  }, [updateSize, debounceMs]);

  const handleResizeThrottled = useCallback(() => {
    const now = Date.now();
    if (now - lastRunRef.current >= throttleMs) {
      lastRunRef.current = now;
      updateSize();
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        updateSize();
        lastRunRef.current = Date.now();
      }, throttleMs - (now - lastRunRef.current));
    }
  }, [updateSize, throttleMs]);

  const handleResize = throttle ? handleResizeThrottled : handleResizeDebounced;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    updateSize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [handleResize, updateSize]);

  return windowSize;
};

// ==================== useElementSize ====================

/**
 * Hook for tracking a DOM element's size
 * 
 * @example
 * const [ref, size] = useElementSize();
 * 
 * <div ref={ref}>
 *   Width: {size.width}, Height: {size.height}
 * </div>
 */
export const useElementSize = <T extends HTMLElement = HTMLDivElement>(): [
  React.RefObject<T>,
  WindowSize
] => {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<WindowSize>({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return [ref, size];
};

// ==================== Type Exports ====================

export type { WindowSizeOptions, WindowSizeReturn };
