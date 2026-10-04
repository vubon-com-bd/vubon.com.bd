import { useCallback, useState } from 'react';

export interface SubmitState<TResult> {
  readonly loading: boolean;
  readonly error: Error | null;
  readonly result: TResult | null;
  readonly submit: () => Promise<TResult | null>;
  readonly reset: () => void;
}

export function useFormSubmit<TResult>(fn: () => Promise<TResult>): SubmitState<TResult> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<TResult | null>(null);

  const submit = useCallback(async (): Promise<TResult | null> => {
    setLoading(true);
    setError(null);
    try {
      const value = await fn();
      setResult(value);
      return value;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Submit failed'));
      return null;
    } finally {
      setLoading(false);
    }
  }, [fn]);

  const reset = useCallback(() => {
    setError(null);
    setResult(null);
  }, []);

  return { loading, error, result, submit, reset };
}
