import { useEffect, useRef } from 'react';

function isEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
    return false;
  }
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const ka = Object.keys(a as Record<string, unknown>);
  const kb = Object.keys(b as Record<string, unknown>);
  if (ka.length !== kb.length) return false;
  return ka.every((k) =>
    isEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k])
  );
}

/** `useEffect` that compares `deps` deeply (JSON-like). */
export function useDeepCompareEffect(
  effect: () => void | (() => void),
  deps: readonly unknown[]
): void {
  const ref = useRef<readonly unknown[]>(deps);
  if (!isEqual(ref.current, deps)) ref.current = deps;
  useEffect(effect, [ref.current]);
}
