import { useCallback } from 'react';

export interface FieldApi<TValue> {
  readonly value: TValue;
  readonly error: string | undefined;
  readonly touched: boolean;
  readonly onChange: (value: TValue) => void;
  readonly onBlur: () => void;
}

export function useFormField<TValues extends Record<string, unknown>, K extends keyof TValues>(
  form: {
    readonly values: TValues;
    readonly errors: Partial<Record<keyof TValues, string>>;
    readonly touched: Partial<Record<keyof TValues, boolean>>;
    readonly setFieldValue: (key: K, value: TValues[K]) => void;
    readonly setTouched: (key: K, touched?: boolean) => void;
  },
  key: K
): FieldApi<TValues[K]> {
  const onChange = useCallback((value: TValues[K]) => form.setFieldValue(key, value), [form, key]);
  const onBlur = useCallback(() => form.setTouched(key, true), [form, key]);

  return {
    value: form.values[key],
    error: form.errors[key],
    touched: form.touched[key] ?? false,
    onChange,
    onBlur,
  };
}
