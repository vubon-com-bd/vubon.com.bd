import { useCallback } from 'react';

export function useFormReset<T>(
  resetFn: (values?: T) => void,
  initial: T
): {
  readonly resetToInitial: () => void;
  readonly resetTo: (values: T) => void;
} {
  const resetToInitial = useCallback(() => resetFn(initial), [resetFn, initial]);
  const resetTo = useCallback((values: T) => resetFn(values), [resetFn]);
  return { resetToInitial, resetTo };
}
