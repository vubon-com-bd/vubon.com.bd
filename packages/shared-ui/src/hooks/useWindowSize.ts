/**
 * useWindowSize Hook - Window dimensions helper
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * IMPROVEMENTS:
 * - Configurable breakpoints (can be passed as options)
 * - Better SSR handling with hydration safety
 * - ResizeObserver polyfill warning
 * - Improved memory cleanup
 * - Type-safe breakpoint configuration
 *
 * @module shared-ui/src/hooks/useWindowSize
 */

import { useState, useEffect, useCallback, useRef } from 'react';

// ==================== Types ====================

export interface WindowSize {
  /** Window width in pixels */
  width: number;
  /** Window height in pixels */
  height: number;
}

export interface BreakpointConfig {
  mobile: number;
  tablet: number;
  desktop: number;
  largeDesktop: number;
  ultraWide: number;
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
  /** Custom breakpoint configuration (default: Tailwind defaults) */
  breakpoints?: Partial<BreakpointConfig>;
  /** Whether to enable ResizeObserver for element tracking (default: true) */
  enableResizeObserver?: boolean;
  /** Callback when window size changes */
  onResize?: (size: WindowSize) => void;
}

export interface WindowSizeReturn extends WindowSize {
  /** Whether the window size is being measured (for SSR) */
  isMeasuring: boolean;
  /** Whether the component is hydrated (client-side) */
  isHydrated: boolean;
  /** Breakpoint helper methods */
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  isUltraWide: boolean;
}

// ==================== Default Breakpoints (Tailwind defaults) ====================

const DEFAULT_BREAKPOINTS: BreakpointConfig = {
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
 * Hook for tracking window size with debouncing/throttling and breakpoint helpers
 *
 * @example
 * // Basic usage
 * const { width, height } = useWindowSize();
 *
 * @example
 * // With custom breakpoints
 * const { isMobile, isDesktop } = useWindowSize({
 *   breakpoints: { mobile: 500, desktop: 900 }
 * });
 *
 * @example
 * // With throttling for performance
 * const { width, isMobile } = useWindowSize({ throttle: true, throttleMs: 100 });
 *
 * @example
 * // With resize callback
 * const { width } = useWindowSize({
 *   onResize: ({ width, height }) => {
 *     console.log(`Resized to ${width}x${height}`);
 *   }
 * });
 */
export const useWindowSize = (options: WindowSizeOptions = {}): WindowSizeReturn => {
  const {
    debounceMs = 150,
    throttle = false,
    throttleMs = 150,
    includeScrollbar = true,
    breakpoints: customBreakpoints,
    onResize,
  } = options;

  const breakpoints = { ...DEFAULT_BREAKPOINTS, ...customBreakpoints };

  const [windowSize, setWindowSize] = useState<WindowSize>(getInitialSize);
  const [isMeasuring, setIsMeasuring] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastRunRef = useRef<number>(0);
  const previousSizeRef = useRef<WindowSize>(getInitialSize);

  // Mark as hydrated after mount (SSR safety)
  useEffect(() => {
    setIsHydrated(true);
  }, []);

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
    const newSize = getWindowSize();
    const prevSize = previousSizeRef.current;

    setWindowSize(newSize);
    setIsMeasuring(false);

    // Trigger callback if size changed
    if (onResize && (newSize.width !== prevSize.width || newSize.height !== prevSize.height)) {
      onResize(newSize);
    }

    previousSizeRef.current = newSize;
  }, [getWindowSize, onResize]);

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

    // Visual Viewport API for better mobile support (if available)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleResize, updateSize]);

  const { width, height } = windowSize;

  // Use hydrated dimensions for breakpoint calculations (avoid hydration mismatch)
  const effectiveWidth = isHydrated ? width : 0;

  const isMobile = effectiveWidth > 0 && effectiveWidth < breakpoints.mobile;
  const isTablet = effectiveWidth >= breakpoints.mobile && effectiveWidth < breakpoints.desktop;
  const isDesktop = effectiveWidth >= breakpoints.desktop && effectiveWidth < breakpoints.largeDesktop;
  const isLargeDesktop = effectiveWidth >= breakpoints.largeDesktop && effectiveWidth < breakpoints.ultraWide;
  const isUltraWide = effectiveWidth >= breakpoints.ultraWide;

  return {
    width,
    height,
    isMeasuring,
    isHydrated,
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
 *
 * @example
 * const { width, height } = useWindowSizeLite({ debounceMs: 100 });
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
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      }
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [handleResize, updateSize]);

  return windowSize;
};

// ==================== useElementSize ====================

/**
 * Hook for tracking a DOM element's size using ResizeObserver
 *
 * @example
 * const [ref, size] = useElementSize();
 *
 * <div ref={ref}>
 *   Width: {size.width}, Height: {size.height}
 * </div>
 */
export const useElementSize = <T extends HTMLElement = HTMLDivElement>(options?: {
  /** Whether to observe size changes (default: true) */
  enabled?: boolean;
  /** Callback when size changes */
  onResize?: (size: WindowSize) => void;
}): [React.RefObject<T>, WindowSize] => {
  const { enabled = true, onResize } = options || {};
  const ref = useRef<T>(null);
  const [size, setSize] = useState<WindowSize>({ width: 0, height: 0 });

  useEffect(() => {
    if (!enabled || !ref.current) return;

    // Check if ResizeObserver is available
    if (typeof ResizeObserver === 'undefined') {
      console.warn(
        '[useElementSize] ResizeObserver is not supported in this browser. ' +
        'Please add a polyfill for better experience.'
      );
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const { width, height } = entry.contentRect;
        const newSize = { width, height };
        setSize(newSize);
        onResize?.(newSize);
      }
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [enabled, onResize]);

  return [ref, size];
};

// ==================== useResponsiveValue ====================

export interface ResponsiveValues<T> {
  base: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
}

/**
 * Hook for getting responsive values based on current window size
 *
 * @example
 * const padding = useResponsiveValue({
 *   base: 'p-2',
 *   sm: 'p-4',
 *   md: 'p-6',
 *   lg: 'p-8',
 * });
 */
export function useResponsiveValue<T>(
  values: ResponsiveValues<T>,
  options?: WindowSizeOptions
): T {
  const { isMobile, isTablet, isDesktop, isLargeDesktop, isUltraWide } = useWindowSize(options);

  if (isUltraWide && values['2xl'] !== undefined) return values['2xl'];
  if (isLargeDesktop && values.xl !== undefined) return values.xl;
  if (isDesktop && values.lg !== undefined) return values.lg;
  if (isTablet && values.md !== undefined) return values.md;
  if (isMobile && values.sm !== undefined) return values.sm;

  return values.base;
}

// ==================== Type Exports ====================

export type { WindowSizeOptions, WindowSizeReturn, BreakpointConfig, ResponsiveValues };
