/**
 * useMediaQuery Hook - Responsive design helper
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/src/hooks/useMediaQuery
 * 
 * RULES:
 * ✅ ONLY UI media query hook - NO business logic
 * ✅ NO API calls, auth logic
 * ✅ Pure React hook for responsive design
 * ✅ TypeScript strict
 * ✅ SSR-safe with fallback
 */

import { useState, useEffect, useCallback } from 'react';

// ==================== Types ====================

export interface MediaQueryOptions {
  /** Default value for SSR (default: false) */
  defaultValue?: boolean;
  /** Whether to listen for changes (default: true) */
  listen?: boolean;
  /** Debounce delay for resize events (ms) */
  debounceMs?: number;
}

export interface MediaQueryReturn {
  /** Whether the media query matches */
  matches: boolean;
  /** Force refresh the query */
  refresh: () => void;
}

// ==================== Breakpoints (Tailwind defaults) ====================

export const BREAKPOINTS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

// ==================== Core Hook ====================

/**
 * Hook for matching media queries
 * 
 * @example
 * // Basic usage
 * const isMobile = useMediaQuery('(max-width: 640px)');
 * 
 * @example
 * // With SSR default
 * const isLarge = useMediaQuery('(min-width: 1024px)', { defaultValue: false });
 * 
 * @example
 * // Using predefined breakpoint
 * const isDesktop = useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
 */
export const useMediaQuery = (
  query: string,
  options: MediaQueryOptions = {}
): MediaQueryReturn => {
  const { defaultValue = false, listen = true, debounceMs = 100 } = options;
  
  const [matches, setMatches] = useState<boolean>(defaultValue);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = useCallback(() => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !listen) return;

    let timeoutId: NodeJS.Timeout;
    let mediaQueryList: MediaQueryList | null = null;

    const updateMatches = () => {
      try {
        const mql = window.matchMedia(query);
        setMatches(mql.matches);
      } catch (error) {
        console.warn(`Error evaluating media query "${query}":`, error);
        setMatches(defaultValue);
      }
    };

    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateMatches, debounceMs);
    };

    try {
      mediaQueryList = window.matchMedia(query);
      setMatches(mediaQueryList.matches);

      if (listen) {
        // Modern API
        if (mediaQueryList.addEventListener) {
          mediaQueryList.addEventListener('change', debouncedUpdate);
        } 
        // Legacy API for older browsers
        else {
          mediaQueryList.addListener(debouncedUpdate);
        }
      }
    } catch (error) {
      console.warn(`Media query not supported: "${query}"`, error);
      setMatches(defaultValue);
    }

    return () => {
      clearTimeout(timeoutId);
      if (mediaQueryList) {
        if (mediaQueryList.removeEventListener) {
          mediaQueryList.removeEventListener('change', debouncedUpdate);
        } else {
          mediaQueryList.removeListener(debouncedUpdate);
        }
      }
    };
  }, [query, listen, defaultValue, debounceMs, refreshKey]);

  return { matches, refresh };
};

// ==================== Convenience Hooks ====================

/**
 * Hook for checking if screen is mobile (max-width: 640px)
 */
export const useIsMobile = (options?: MediaQueryOptions): boolean => {
  const { matches } = useMediaQuery(`(max-width: ${BREAKPOINTS.sm}px)`, options);
  return matches;
};

/**
 * Hook for checking if screen is tablet (641px - 1024px)
 */
export const useIsTablet = (options?: MediaQueryOptions): boolean => {
  const isMobile = useIsMobile(options);
  const isDesktop = useIsDesktop(options);
  return !isMobile && !isDesktop;
};

/**
 * Hook for checking if screen is desktop (min-width: 1025px)
 */
export const useIsDesktop = (options?: MediaQueryOptions): boolean => {
  const { matches } = useMediaQuery(`(min-width: ${BREAKPOINTS.lg + 1}px)`, options);
  return matches;
};

/**
 * Hook for checking if screen is large desktop (min-width: 1280px)
 */
export const useIsLargeDesktop = (options?: MediaQueryOptions): boolean => {
  const { matches } = useMediaQuery(`(min-width: ${BREAKPOINTS.xl}px)`, options);
  return matches;
};

/**
 * Hook for checking if screen is ultra-wide (min-width: 1536px)
 */
export const useIsUltraWide = (options?: MediaQueryOptions): boolean => {
  const { matches } = useMediaQuery(`(min-width: ${BREAKPOINTS['2xl']}px)`, options);
  return matches;
};

/**
 * Hook for checking if dark mode is preferred
 */
export const useIsDarkMode = (options?: MediaQueryOptions): boolean => {
  const { matches } = useMediaQuery('(prefers-color-scheme: dark)', options);
  return matches;
};

/**
 * Hook for checking if reduced motion is preferred
 */
export const usePrefersReducedMotion = (options?: MediaQueryOptions): boolean => {
  const { matches } = useMediaQuery('(prefers-reduced-motion: reduce)', options);
  return matches;
};

/**
 * Hook for checking if high contrast is preferred
 */
export const usePrefersHighContrast = (options?: MediaQueryOptions): boolean => {
  const { matches } = useMediaQuery('(prefers-contrast: high)', options);
  return matches;
};

// ==================== Responsive Value Hook ====================

export interface ResponsiveValues<T> {
  base: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
}

/**
 * Hook for getting responsive values based on current breakpoint
 * 
 * @example
 * const padding = useResponsiveValue({
 *   base: 'p-2',
 *   sm: 'p-4',
 *   md: 'p-6',
 *   lg: 'p-8',
 * });
 * 
 * @example
 * const columns = useResponsiveValue({
 *   base: 1,
 *   sm: 2,
 *   md: 3,
 *   lg: 4,
 * });
 */
export function useResponsiveValue<T>(values: ResponsiveValues<T>): T {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();
  const isLargeDesktop = useIsLargeDesktop();
  const isUltraWide = useIsUltraWide();

  if (isUltraWide && values['2xl'] !== undefined) return values['2xl'];
  if (isLargeDesktop && values.xl !== undefined) return values.xl;
  if (isDesktop && values.lg !== undefined) return values.lg;
  if (isTablet && values.md !== undefined) return values.md;
  if (isMobile && values.sm !== undefined) return values.sm;
  
  return values.base;
}

// ==================== Orientation Hooks ====================

/**
 * Hook for checking if screen is portrait orientation
 */
export const useIsPortrait = (options?: MediaQueryOptions): boolean => {
  const { matches } = useMediaQuery('(orientation: portrait)', options);
  return matches;
};

/**
 * Hook for checking if screen is landscape orientation
 */
export const useIsLandscape = (options?: MediaQueryOptions): boolean => {
  const { matches } = useMediaQuery('(orientation: landscape)', options);
  return matches;
};

// ==================== Device Type Hooks ====================

/**
 * Hook for checking if device is touch-capable
 */
export const useIsTouchDevice = (options?: MediaQueryOptions): boolean => {
  const { matches } = useMediaQuery('(pointer: coarse)', options);
  return matches;
};

/**
 * Hook for checking if device has fine pointer (mouse)
 */
export const useHasFinePointer = (options?: MediaQueryOptions): boolean => {
  const { matches } = useMediaQuery('(pointer: fine)', options);
  return matches;
};

// ==================== Type Exports ====================

export type { MediaQueryOptions, MediaQueryReturn, ResponsiveValues };
