import { useCallback, useRef, useState } from 'react';

export interface AsyncValidationState {
  readonly validating: boolean;
  readonly error: string | null;
  readonly validate: (value: string) => Promise<boolean>;
  readonly reset: () => void;
}

/**
 * Debounced async field validation.
 * ⚠️ Cancels previous in-flight validations.
 */
export function useAsyncValidation(
  validateFn: (value: string, signal: AbortSignal) => Promise<string | null>,
  delayMs = 400
): AsyncValidationState {
  const [validating, setValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ctrl = useRef<AbortController | null>(null);

  const validate = useCallback(
    (value: string): Promise<boolean> => {
      return new Promise((resolve) => {
        if (timer.current) clearTimeout(timer.current);
        ctrl.current?.abort();
        const controller = new AbortController();
        ctrl.current = controller;

        timer.current = setTimeout(async () => {
          setValidating(true);
          try {
            const err = await validateFn(value, controller.signal);
            if (controller.signal.aborted) {
              resolve(false);
              return;
            }
            setError(err);
            resolve(err === null);
          } catch {
            resolve(false);
          } finally {
            setValidating(false);
          }
        }, delayMs);
      });
    },
    [validateFn, delayMs]
  );

  const reset = useCallback(() => {
    setError(null);
    setValidating(false);
    ctrl.current?.abort();
  }, []);

  return { validating, error, validate, reset };
}
