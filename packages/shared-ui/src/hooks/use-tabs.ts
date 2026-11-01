'use client';
import { useCallback, useState } from 'react';

export interface UseTabsResult<T extends string> {
  readonly value: T;
  readonly setValue: (value: T) => void;
  readonly isActive: (value: T) => boolean;
  readonly next: () => void;
  readonly prev: () => void;
}

/** UI-only tabs state. */
export function useTabs<T extends string>(values: readonly T[], initial?: T): UseTabsResult<T> {
  const [value, setValue] = useState<T>(initial ?? values[0] ?? ('' as T));

  const isActive = useCallback((v: T) => v === value, [value]);

  const next = useCallback(() => {
    const idx = values.indexOf(value);
    if (idx === -1) return;
    setValue(values[(idx + 1) % values.length] ?? value);
  }, [values, value]);

  const prev = useCallback(() => {
    const idx = values.indexOf(value);
    if (idx === -1) return;
    setValue(values[(idx - 1 + values.length) % values.length] ?? value);
  }, [values, value]);

  return { value, setValue, isActive, next, prev };
}
