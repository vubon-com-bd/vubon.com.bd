import { useRef } from 'react';

/** `true` on first render, `false` on every subsequent render. */
export function useIsFirstRender(): boolean {
  const ref = useRef(true);
  if (ref.current) {
    ref.current = false;
    return true;
  }
  return false;
}
