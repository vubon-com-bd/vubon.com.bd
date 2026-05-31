/**
 * useClickOutside Hook - Detect clicks outside element
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/src/hooks/useClickOutside
 * 
 * RULES:
 * ✅ ONLY UI hook for click outside detection - NO business logic
 * ✅ NO API calls, auth logic
 * ✅ Pure UI hook
 * ✅ TypeScript strict
 */

import { useEffect, useRef, useCallback } from 'react';

// ==================== Types ====================

export interface UseClickOutsideOptions {
  /** Callback when click outside is detected */
  handler: () => void;
  /** Whether the hook is enabled */
  enabled ? : boolean;
  /** Event types to listen to (default: ['mousedown', 'touchstart']) */
  events ? : ('mousedown' | 'mouseup' | 'click' | 'touchstart' | 'touchend')[];
  /** Additional refs to exclude from outside detection */
  excludeRefs ? : React.RefObject < HTMLElement > [];
}

export interface UseClickOutsideReturn < T extends HTMLElement = HTMLElement > {
  /** Ref to attach to the element */
  ref: React.RefObject < T > ;
}

// ==================== Hook ====================

/**
 * Hook for detecting clicks outside a referenced element
 * 
 * @example
 * // Basic usage
 * const Modal = () => {
 *   const { ref } = useClickOutside({ handler: () => closeModal() });
 *   return <div ref={ref}>Modal content</div>;
 * };
 * 
 * @example
 * // With exclude refs (dropdown menu)
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
 * // Disabled temporarily
 * const { ref } = useClickOutside({
 *   handler: () => handleClickOutside(),
 *   enabled: isOpen
 * });
 */
export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  options: UseClickOutsideOptions
): UseClickOutsideReturn<T> => {
  const { handler, enabled = true, events = ['mousedown', 'touchstart'], excludeRefs = [] } = options;
  const ref = useRef<T>(null);
  const handlerRef = useRef(handler);

  // Update handler ref to avoid stale closure
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  const handleOutsideClick = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!enabled) return;
      
      const target = event.target as Node;
      if (!target) return;
      
      // Check if click is inside the main element
      if (ref.current && ref.current.contains(target)) {
        return;
      }
      
      // Check if click is inside any excluded refs
      for (const excludeRef of excludeRefs) {
        if (excludeRef.current && excludeRef.current.contains(target)) {
          return;
        }
      }
      
      handlerRef.current();
    },
    [enabled, excludeRefs]
  );

  useEffect(() => {
    if (!enabled) return;

    events.forEach((event) => {
      document.addEventListener(event, handleOutsideClick);
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleOutsideClick);
      });
    };
  }, [enabled, events, handleOutsideClick]);

  return { ref };
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

// ==================== Type Exports ====================

export type { UseClickOutsideOptions, UseClickOutsideReturn };
