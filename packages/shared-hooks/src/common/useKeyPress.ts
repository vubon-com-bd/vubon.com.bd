import { useEffect, useCallback, useRef } from 'react';

export interface UseKeyPressOptions {
  event?: 'keydown' | 'keyup' | 'keypress';
  preventDefault?: boolean;
  stopPropagation?: boolean;
}

export function useKeyPress(
  key: string | string[],
  handler: (event: KeyboardEvent) => void,
  options: UseKeyPressOptions = {}
): void {
  const { event = 'keydown', preventDefault = true, stopPropagation = false } = options;
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      const keys = Array.isArray(key) ? key : [key];
      if (keys.includes(e.key)) {
        if (preventDefault) {
          e.preventDefault();
        }
        if (stopPropagation) {
          e.stopPropagation();
        }
        handlerRef.current(e);
      }
    },
    [key, preventDefault, stopPropagation]
  );

  useEffect(() => {
    document.addEventListener(event, handleKeyPress);
    return () => {
      document.removeEventListener(event, handleKeyPress);
    };
  }, [event, handleKeyPress]);
}

export function useEscapeKey(
  handler: (event: KeyboardEvent) => void,
  options?: UseKeyPressOptions
): void {
  useKeyPress('Escape', handler, options);
}

export function useEnterKey(
  handler: (event: KeyboardEvent) => void,
  options?: UseKeyPressOptions
): void {
  useKeyPress('Enter', handler, options);
}

export function useCtrlEnterKey(
  handler: (event: KeyboardEvent) => void,
  options?: UseKeyPressOptions
): void {
  useKeyPress(
    'Enter',
    (e) => {
      if (e.ctrlKey || e.metaKey) {
        handler(e);
      }
    },
    options
  );
}

export function useArrowKeys(
  handler: (direction: 'up' | 'down' | 'left' | 'right') => void,
  options?: UseKeyPressOptions
): void {
  const handleArrowKey = (e: KeyboardEvent) => {
    const directionMap: Record<string, 'up' | 'down' | 'left' | 'right'> = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right',
    };
    const direction = directionMap[e.key];
    if (direction) {
      handler(direction);
    }
  };

  useKeyPress(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'], handleArrowKey, options);
}
