import { useState, useCallback } from 'react';
import { useSelection, type UseSelectionOptions } from './useSelection';

export interface UseBulkActionOptions<
  T extends { id?: string | number },
> extends UseSelectionOptions<T> {
  onSuccess?: (action: string, ids: (string | number)[]) => void;
  onError?: (error: Error) => void;
}

export interface UseBulkActionReturn<T extends { id?: string | number }> extends ReturnType<
  typeof useSelection<T>
> {
  loading: boolean;
  error: Error | null;
  execute: (action: string, actionFn: (ids: (string | number)[]) => Promise<void>) => Promise<void>;
}

export const useBulkAction = <T extends { id?: string | number }>(
  options: UseBulkActionOptions<T> = {}
): UseBulkActionReturn<T> => {
  const { onSuccess, onError, ...selectionOptions } = options;
  const selection = useSelection<T>(selectionOptions);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (
      action: string,
      actionFn: (ids: (string | number)[]) => Promise<void>
    ): Promise<void> => {
      if (selection.selectedIds.length === 0) return;
      setLoading(true);
      setError(null);
      try {
        await actionFn(selection.selectedIds);
        onSuccess?.(action, selection.selectedIds);
        selection.deselectAll();
      } catch (err) {
        const e = err as Error;
        setError(e);
        onError?.(e);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [selection, onSuccess, onError]
  );

  return { ...selection, loading, error, execute };
};
