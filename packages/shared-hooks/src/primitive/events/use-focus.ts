import { useCallback, useState } from 'react';

export interface FocusHandlers {
  readonly onFocus: () => void;
  readonly onBlur: () => void;
}

export function useFocus(): readonly [boolean, FocusHandlers] {
  const [focused, setFocused] = useState(false);
  const onFocus = useCallback(() => setFocused(true), []);
  const onBlur = useCallback(() => setFocused(false), []);
  return [focused, { onFocus, onBlur }] as const;
}
