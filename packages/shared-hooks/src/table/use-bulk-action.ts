import { useCallback, useState } from 'react';

export interface BulkActionState {
  readonly loading: boolean;
  readonly error: Error | null;
  readonly lastResult: unknown;
}

export function useBulkAction<TId extends string | number, TResult = void>(
  run: (ids: readonly TId[]) => Promise<TResult>
): BulkActionState & {
  readonly execute: (ids: readonly TId[]) => Promise<TResult | null>;
  readonly reset: () => void;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastResult, setLastResult] = useState<unknown>(null);

  const execute = useCallback(
    async (ids: readonly TId[]): Promise<TResult | null> => {
      setLoading(true);
      setError(null);
      try {
        const result = await run(ids);
        setLastResult(result);
        return result;
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Bulk action failed'));
        return null;
      } finally {
        setLoading(false);
      }
    },
    [run]
  );

  const reset = useCallback(() => {
    setError(null);
    setLastResult(null);
  }, []);

  return { loading, error, lastResult, execute, reset };
}
