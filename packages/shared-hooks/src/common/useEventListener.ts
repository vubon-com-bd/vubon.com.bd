import { useEffect, useRef, useCallback } from 'react';

export type EventTargetType = Window | Document | HTMLElement | null;

export interface UseEventListenerOptions {
  enabled?: boolean;
  capture?: boolean;
  passive?: boolean;
}

export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: Window | null,
  options?: UseEventListenerOptions
): void;

export function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  element?: Document | null,
  options?: UseEventListenerOptions
): void;

export function useEventListener<K extends keyof HTMLElementEventMap>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  element?: HTMLElement | null,
  options?: UseEventListenerOptions
): void;

export function useEventListener(
  eventName: string,
  handler: (event: Event) => void,
  element: EventTargetType = window,
  options: UseEventListenerOptions = {}
): void {
  const { enabled = true, capture = false, passive = false } = options;
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  const eventListener = useCallback(
    (event: Event) => {
      if (enabled) {
        handlerRef.current(event);
      }
    },
    [enabled]
  );

  useEffect(() => {
    if (!element || !enabled) return;

    element.addEventListener(eventName, eventListener, {
      capture,
      passive,
    });

    return () => {
      element.removeEventListener(eventName, eventListener, {
        capture,
      });
    };
  }, [eventName, element, enabled, capture, passive, eventListener]);
}

// Common event listener hooks
export function useWindowEvent<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: UseEventListenerOptions
): void {
  useEventListener(eventName, handler, window, options);
}

export function useDocumentEvent<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  options?: UseEventListenerOptions
): void {
  useEventListener(eventName, handler, document, options);
}

export function useResize(
  handler: (event: UIEvent) => void,
  options?: UseEventListenerOptions
): void {
  useWindowEvent('resize', handler, options);
}

export function useScroll(
  handler: (event: Event) => void,
  element?: Window | null,
  options?: UseEventListenerOptions
): void {
  useEventListener('scroll', handler, element || window, options);
}

export function useVisibilityChange(
  handler: (event: Event) => void,
  options?: UseEventListenerOptions
): void {
  useDocumentEvent('visibilitychange', handler, options);
}

export function useOnline(
  handler: (event: Event) => void,
  options?: UseEventListenerOptions
): void {
  useWindowEvent('online', handler, options);
}

export function useOffline(
  handler: (event: Event) => void,
  options?: UseEventListenerOptions
): void {
  useWindowEvent('offline', handler, options);
}
