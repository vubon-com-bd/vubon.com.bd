import { useCallback, useState } from 'react';

/**
 * Boolean toggle state.
 * Returns `[value, toggle, set]` tuple — `as const`.
 */
export function useToggle(
  initial = false
): readonly [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle, setValue] as const;
}
