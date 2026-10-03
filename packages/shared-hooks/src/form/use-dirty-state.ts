import { useMemo } from 'react';

export function useDirtyState<T extends Record<string, unknown>>(
  values: T,
  initial: T
): {
  readonly dirty: boolean;
  readonly dirtyFields: readonly (keyof T)[];
} {
  const dirtyFields = useMemo(() => {
    const out: (keyof T)[] = [];
    for (const key of Object.keys(values) as (keyof T)[]) {
      if (values[key] !== initial[key]) out.push(key);
    }
    return out;
  }, [values, initial]);

  return { dirty: dirtyFields.length > 0, dirtyFields };
}
