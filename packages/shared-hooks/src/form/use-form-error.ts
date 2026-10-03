import { useCallback, useState } from 'react';
import type { FormErrors } from './form.types';

export function useFormError<TValues extends Record<string, unknown>>(): {
  readonly errors: FormErrors<TValues>;
  readonly setError: <K extends keyof TValues>(key: K, message: string) => void;
  readonly clearError: <K extends keyof TValues>(key: K) => void;
  readonly clearAll: () => void;
  readonly hasError: <K extends keyof TValues>(key: K) => boolean;
} {
  const [errors, setErrors] = useState<FormErrors<TValues>>({});

  const setError = useCallback(<K extends keyof TValues>(key: K, message: string) => {
    setErrors((prev) => ({ ...prev, [key]: message }));
  }, []);
  const clearError = useCallback(<K extends keyof TValues>(key: K) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);
  const clearAll = useCallback(() => setErrors({}), []);
  const hasError = useCallback(<K extends keyof TValues>(key: K) => Boolean(errors[key]), [errors]);

  return { errors, setError, clearError, clearAll, hasError };
}
