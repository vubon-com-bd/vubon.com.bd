/**
 * useClickOutside Hook - Detect clicks outside element
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-ui/src/hooks/useClickOutside
 *
 * FEATURES:
 * - Type-safe with generics
 * - Multiple event type support
 * - Exclude refs for nested elements (dropdowns, modals)
 * - Enable/disable toggle
 * - SSR safe (no document access during server rendering)
 * - Cleanup on unmount
 * - Stale closure prevention with useRef
 * - Support for shadow DOM
 *
 * RULES:
 * ✅ ONLY UI hook for click outside detection - NO business logic
 * ✅ NO API calls, auth logic
 * ✅ Pure UI hook
 * ✅ TypeScript strict
 */

import { useEffect, useRef, useCallback } from 'react';

// ==================== Types ====================

/**
 * Event types that can trigger outside click detection
 */
export type ClickOutsideEvent = 'mousedown' | 'mouseup' | 'click' | 'touchstart' | 'touchend';

/**
 * Configuration options for useClickOutside hook
 */
export interface UseClickOutsideOptions {
  /**
   * Callback function executed when click outside is detected
   */
  handler: () => void;

  /**
   * Whether the hook is enabled (useful for conditional activation)
   * @default true
   */
  enabled?: boolean;

  /**
   * Event types to listen for
   * @default ['mousedown', 'touchstart']
   */
  events?: ClickOutsideEvent[];

  /**
   * Additional refs to elements that should be excluded from outside detection
   * Useful for dropdown buttons, portal elements, etc.
   */
  excludeRefs?: React.RefObject<HTMLElement>[];

  /**
   * Whether to handle events during capture phase
   * @default false
   */
  useCapture?: boolean;

  /**
   * Whether to stop event propagation
   * @default false
   */
  stopPropagation?: boolean;

  /**
   * Whether to prevent default behavior
   * @default false
   */
  preventDefault?: boolean;
}

/**
 * Return type for useClickOutside hook
 */
export interface UseClickOutsideReturn<T extends HTMLElement = HTMLElement> {
  /** Ref to attach to the target element */
  ref: React.RefObject<T>;
  /** Function to manually update the ref (useful for dynamic elements) */
  updateRef: (newRef: React.RefObject<T>) => void;
}

// ==================== Default Options ====================

const DEFAULT_EVENTS: ClickOutsideEvent[] = ['mousedown', 'touchstart'];
const DEFAULT_USE_CAPTURE = false;
const DEFAULT_STOP_PROPAGATION = false;
const DEFAULT_PREVENT_DEFAULT = false;

// ==================== Private Helpers ====================

/**
 * Check if running in browser environment
 */
const isBrowser = (): boolean => typeof window !== 'undefined' && typeof document !== 'undefined';

/**
 * Check if element is scrollable
 */
const isScrollable = (element: HTMLElement): boolean => {
  const overflowY = window.getComputedStyle(element).overflowY;
  return overflowY === 'auto' || overflowY === 'scroll';
};

/**
 * Find scrollable parent
 */
const findScrollableParent = (element: HTMLElement | null): HTMLElement | null => {
  let current = element;
  while (current && current !== document.body) {
    if (isScrollable(current)) {
      return current;
    }
    current = current.parentElement;
  }
  return null;
};

// ==================== Hook ====================

/**
 * Hook for detecting clicks outside a referenced element
 *
 * @example
 * // Basic usage - Close modal when clicking outside
 * const Modal = () => {
 *   const { ref } = useClickOutside({ handler: () => closeModal() });
 *   return <div ref={ref}>Modal content</div>;
 * };
 *
 * @example
 * // With exclude refs - Dropdown menu that doesn't close when clicking the button
 * const Dropdown = () => {
 *   const buttonRef = useRef<HTMLButtonElement>(null);
 *   const { ref } = useClickOutside({
 *     handler: () => setIsOpen(false),
 *     excludeRefs: [buttonRef]
 *   });
 *   return (
 *     <div>
 *       <button ref={buttonRef}>Toggle</button>
 *       <div ref={ref}>Dropdown menu</div>
 *     </div>
 *   );
 * };
 *
 * @example
 * // Conditionally enabled
 * const { ref } = useClickOutside({
 *   handler: () => handleClickOutside(),
 *   enabled: isOpen
 * });
 *
 * @example
 * // With custom event and stop propagation
 * const { ref } = useClickOutside({
 *   handler: () => closePanel(),
 *   events: ['click'],
 *   stopPropagation: true
 * });
 */
export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  options: UseClickOutsideOptions
): UseClickOutsideReturn<T> => {
  const {
    handler,
    enabled = true,
    events = DEFAULT_EVENTS,
    excludeRefs = [],
    useCapture = DEFAULT_USE_CAPTURE,
    stopPropagation = DEFAULT_STOP_PROPAGATION,
    preventDefault = DEFAULT_PREVENT_DEFAULT,
  } = options;

  const ref = useRef<T>(null);
  const handlerRef = useRef(handler);
  const excludeRefsRef = useRef(excludeRefs);
  const isHandlingRef = useRef(false);

  // Update refs to avoid stale closures
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    excludeRefsRef.current = excludeRefs;
  }, [excludeRefs]);

  /**
   * Helper to update the main ref (useful for dynamic elements)
   */
  const updateRef = useCallback((newRef: React.RefObject<T>) => {
    const oldRef = ref.current;
    if (oldRef && 'current' in newRef) {
      (ref as React.MutableRefObject<T | null>).current = newRef.current;
    }
  }, []);

  /**
   * Handle click/touch outside detection
   */
  const handleOutsideClick = useCallback(
    (event: MouseEvent | TouchEvent) => {
      // Skip if not enabled
      if (!enabled) return;

      // Prevent multiple simultaneous handling
      if (isHandlingRef.current) return;

      const target = event.target as Node;
      if (!target) return;

      // Check if click is inside the main element
      if (ref.current && ref.current.contains(target)) {
        return;
      }

      // Check if click is inside any excluded refs (dropdown buttons, etc.)
      for (const excludeRef of excludeRefsRef.current) {
        if (excludeRef?.current && excludeRef.current.contains(target)) {
          return;
        }
      }

      // Check if target is within shadow DOM
      if (target instanceof Element && target.shadowRoot) {
        const composedPath = event.composedPath();
        for (const composedTarget of composedPath) {
          if (composedTarget === ref.current) {
            return;
          }
          for (const excludeRef of excludeRefsRef.current) {
            if (excludeRef?.current && composedTarget === excludeRef.current) {
              return;
            }
          }
        }
      }

      // Check if click is on scrollbar (not an actual element click)
      if (event instanceof MouseEvent && event.clientX === 0 && event.clientY === 0) {
        return;
      }

      // Check if target is a scrollbar element (for WebKit browsers)
      if (
        target instanceof Element &&
        (target.classList?.contains('scrollbar') ||
          target.getAttribute('role') === 'scrollbar')
      ) {
        return;
      }

      // Check if click originated from inside a scrollable container's scrollbar
      const scrollableParent = ref.current ? findScrollableParent(ref.current) : null;
      if (
        scrollableParent &&
        target instanceof Element &&
        (target === scrollableParent ||
          scrollableParent.contains(target) ||
          (event instanceof MouseEvent && (event.clientX > scrollableParent.clientWidth ||
            event.clientY > scrollableParent.clientHeight)))
      ) {
        return;
      }

      // Stop propagation if requested
      if (stopPropagation) {
        event.stopPropagation();
      }

      // Prevent default if requested
      if (preventDefault) {
        event.preventDefault();
      }

      // Mark as handling to prevent race conditions
      isHandlingRef.current = true;

      try {
        handlerRef.current();
      } finally {
        // Reset after microtask to allow next click
        setTimeout(() => {
          isHandlingRef.current = false;
        }, 0);
      }
    },
    [enabled, stopPropagation, preventDefault, useCapture]
  );

  // Set up event listeners
  useEffect(() => {
    if (!enabled || !isBrowser()) return;

    // Use requestAnimationFrame to ensure DOM is ready
    let rafId: number;

    const setupListeners = () => {
      for (const event of events) {
        document.addEventListener(event, handleOutsideClick, useCapture);
      }
    };

    rafId = requestAnimationFrame(setupListeners);

    return () => {
      cancelAnimationFrame(rafId);
      for (const event of events) {
        document.removeEventListener(event, handleOutsideClick, useCapture);
      }
    };
  }, [enabled, events, handleOutsideClick, useCapture]);

  // Clean up handler flag on unmount
  useEffect(() => {
    return () => {
      isHandlingRef.current = false;
    };
  }, []);

  return { ref, updateRef };
};

/**
 * Simplified version of useClickOutside for basic use cases
 *
 * @example
 * const ref = useSimpleClickOutside(() => closeModal());
 */
export const useSimpleClickOutside = <T extends HTMLElement = HTMLElement>(
  handler: () => void,
  enabled: boolean = true
): React.RefObject<T> => {
  const { ref } = useClickOutside<T>({ handler, enabled });
  return ref;
};

/**
 * Version with immediate execution (for click outside that should not wait)
 *
 * @example
 * const { ref } = useImmediateClickOutside({
 *   handler: () => closeImmediately()
 * });
 */
export const useImmediateClickOutside = <T extends HTMLElement = HTMLElement>(
  handler: () => void,
  enabled: boolean = true
): React.RefObject<T> => {
  const { ref } = useClickOutside<T>({
    handler,
    enabled,
    events: ['click', 'mousedown'],
    useCapture: true,
  });
  return ref;
};

/**
 * Version with delayed execution (useful for animations)
 *
 * @example
 * const { ref } = useDelayedClickOutside({
 *   handler: () => closeWithAnimation(),
 *   delay: 200
 * });
 */
export const useDelayedClickOutside = <T extends HTMLElement = HTMLElement>(
  handler: () => void,
  delay: number = 200,
  enabled: boolean = true
): React.RefObject<T> => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const delayedHandler = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      handler();
    }, delay);
  }, [handler, delay]);

  const { ref } = useClickOutside<T>({
    handler: delayedHandler,
    enabled,
  });

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return ref;
};

// ==================== Type Exports ====================

export type { UseClickOutsideOptions, UseClickOutsideReturn };
