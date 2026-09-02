import { useEffect, useCallback } from 'react';

export function useKeyPress(
  key: string | string[],
  handler: (event: KeyboardEvent) => void,
  options: { event?: 'keydown' | 'keyup' | 'keypress'; preventDefault?: boolean } = {}
): void {
  const { event = 'keydown', preventDefault = true } = options;

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      const keys = Array.isArray(key) ? key : [key];
      if (keys.includes(e.key)) {
        if (preventDefault) {
          e.preventDefault();
        }
        handler(e);
      }
    },
    [key, handler, preventDefault]
  );

  useEffect(() => {
    document.addEventListener(event, handleKeyPress);
    return () => {
      document.removeEventListener(event, handleKeyPress);
    };
  }, [event, handleKeyPress]);
}

export function useEscapeKey(handler: (event: KeyboardEvent) => void): void {
  useKeyPress('Escape', handler);
}

export function useEnterKey(handler: (event: KeyboardEvent) => void): void {
  useKeyPress('Enter', handler);
}

export function useCtrlEnterKey(handler: (event: KeyboardEvent) => void): void {
  useKeyPress('Enter', (e) => {
    if (e.ctrlKey || e.metaKey) {
      handler(e);
    }
  });
}
