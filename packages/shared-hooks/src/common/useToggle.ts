import { useState, useCallback } from 'react';

export function useToggle(initialValue: boolean = false): [boolean, (nextValue?: boolean) => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback((nextValue?: boolean) => {
    setValue((prev) => (nextValue !== undefined ? nextValue : !prev));
  }, []);

  return [value, toggle];
}

export function useToggleWithState<T = unknown>(initialState: T, toggleState: T): [T, () => void] {
  const [value, setValue] = useState<T>(initialState);

  const toggle = useCallback(() => {
    setValue((prev) => (prev === initialState ? toggleState : initialState));
  }, [initialState, toggleState]);

  return [value, toggle];
}
