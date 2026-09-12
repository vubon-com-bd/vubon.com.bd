import { useEffect, useRef } from 'react';

type EventTarget = Window | Document | HTMLElement;

export const useEventListener = <K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element: EventTarget | null = typeof window !== 'undefined' ? window : null
): void => {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!element) return;
    const eventListener = (event: Event) => savedHandler.current(event as WindowEventMap[K]);
    element.addEventListener(eventName, eventListener);
    return () => element.removeEventListener(eventName, eventListener);
  }, [eventName, element]);
};
