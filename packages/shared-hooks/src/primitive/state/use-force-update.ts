import { useReducer } from 'react';

/** Force re-render. Use sparingly. */
export function useForceUpdate(): () => void {
  const [, force] = useReducer((n: number) => n + 1, 0);
  return force;
}
