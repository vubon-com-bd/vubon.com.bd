import { useCallback, useMemo, useState } from 'react';
import type { FormErrors, FormOptions, FormState } from './form.types';

export function useForm<TValues extends Record<string, unknown>>(
  options: FormOptions<TValues>
): FormState<TValues> & {
  readonly setFieldValue: <K extends keyof TValues>(key: K, value: TValues[K]) => void;
  readonly setFieldError: <K extends keyof TValues>(key: K, error: string | undefined) => void;
  readonly setTouched: <K extends keyof TValues>(key: K, touched?: boolean) => void;
  readonly handleSubmit: (e?: { preventDefault: () => void }) => Promise<void>;
  readonly reset: (nextValues?: TValues) => void;
  readonly setValues: (values: TValues) => void;
} {
  const [values, setValues] = useState<TValues>(options.initialValues);
  const [errors, setErrors] = useState<FormErrors<TValues>>({});
  const [touched, setTouchedState] = useState<Partial<Record<keyof TValues, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  const dirty = useMemo(() => {
    const d: Partial<Record<keyof TValues, boolean>> = {};
    for (const key of Object.keys(values) as (keyof TValues)[]) {
      d[key] = values[key] !== options.initialValues[key];
    }
    return d;
  }, [values, options.initialValues]);

  const setFieldValue = useCallback(<K extends keyof TValues>(key: K, value: TValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setFieldError = useCallback(
    <K extends keyof TValues>(key: K, error: string | undefined) => {
      setErrors((prev) => {
        const next = { ...prev };
        if (error === undefined) delete next[key];
        else next[key] = error;
        return next;
      });
    },
    []
  );

  const setTouched = useCallback(<K extends keyof TValues>(key: K, isTouched = true) => {
    setTouchedState((prev) => ({ ...prev, [key]: isTouched }));
  }, []);

  const handleSubmit = useCallback(
    async (e?: { preventDefault: () => void }) => {
      e?.preventDefault();
      setIsSubmitting(true);
      setSubmitCount((n) => n + 1);
      try {
        if (options.validate) {
          const nextErrors = await options.validate(values);
          setErrors(nextErrors);
          if (Object.keys(nextErrors).length > 0) return;
        }
        await options.onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, options]
  );

  const reset = useCallback(
    (nextValues?: TValues) => {
      setValues(nextValues ?? options.initialValues);
      setErrors({});
      setTouchedState({});
      setSubmitCount(0);
    },
    [options.initialValues]
  );

  return {
    values,
    errors,
    touched,
    dirty,
    isSubmitting,
    submitCount,
    setFieldValue,
    setFieldError,
    setTouched,
    handleSubmit,
    reset,
    setValues,
  };
}
