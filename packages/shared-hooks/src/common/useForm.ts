import { useState, useCallback, useMemo } from 'react';
import type { ValidationRule } from '@vubon/shared-types';

export interface UseFormOptions<T extends Record<string, unknown>> {
  initialValues: T;
  validationRules?: Partial<Record<keyof T, ValidationRule[]>>;
  onSubmit?: (values: T) => void | Promise<void>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

export interface UseFormReturn<T extends Record<string, unknown>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
  setValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setValues: (values: T) => void;
  setFieldTouched: (field: keyof T) => void;
  handleBlur: (field: keyof T) => void;
  handleSubmit: (e?: { preventDefault: () => void }) => Promise<void>;
  validateAll: () => boolean;
  validateField: (field: keyof T, value: T[keyof T]) => string | undefined;
  reset: () => void;
}

export const useForm = <T extends Record<string, unknown>>(
  options: UseFormOptions<T>
): UseFormReturn<T> => {
  const {
    initialValues,
    validationRules = {} as Partial<Record<keyof T, ValidationRule[]>>,
    onSubmit,
    validateOnChange = true,
    validateOnBlur = true,
  } = options;

  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback(
    (field: keyof T, value: T[keyof T]): string | undefined => {
      const rules = validationRules[field];
      if (!rules) return undefined;
      for (const rule of rules) {
        if (rule.rule === 'required' && !value) {
          return rule.message ?? `${String(field)} is required`;
        }
        if (
          rule.rule === 'min' &&
          rule.params?.[0] !== undefined &&
          typeof value === 'string' &&
          value.length < (rule.params[0] as number)
        ) {
          return rule.message ?? `${String(field)} must be at least ${rule.params[0]}`;
        }
        if (
          rule.rule === 'max' &&
          rule.params?.[0] !== undefined &&
          typeof value === 'string' &&
          value.length > (rule.params[0] as number)
        ) {
          return rule.message ?? `${String(field)} must be at most ${rule.params[0]}`;
        }
        if (
          rule.rule === 'email' &&
          typeof value === 'string' &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ) {
          return rule.message ?? 'Invalid email';
        }
      }
      return undefined;
    },
    [validationRules]
  );

  const validateAll = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let valid = true;
    for (const key in values) {
      const err = validateField(key, values[key]);
      if (err) {
        newErrors[key] = err;
        valid = false;
      }
    }
    setErrors(newErrors);
    return valid;
  }, [values, validateField]);

  const setValue = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      if (validateOnChange) {
        const err = validateField(field, value);
        setErrors((prev) => ({ ...prev, [field]: err }));
      }
    },
    [validateOnChange, validateField]
  );

  const setValuesFn = useCallback((v: T) => setValues(v), []);

  const setFieldTouched = useCallback((field: keyof T) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const handleBlur = useCallback(
    (field: keyof T) => {
      setFieldTouched(field);
      if (validateOnBlur) {
        const err = validateField(field, values[field]);
        setErrors((prev) => ({ ...prev, [field]: err }));
      }
    },
    [validateOnBlur, validateField, values]
  );

  const handleSubmit = useCallback(
    async (e?: { preventDefault: () => void }): Promise<void> => {
      e?.preventDefault();
      if (!validateAll()) return;
      setIsSubmitting(true);
      try {
        await onSubmit?.(values);
      } finally {
        setIsSubmitting(false);
      }
    },
    [validateAll, onSubmit, values]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    setValue,
    setValues: setValuesFn,
    setFieldTouched,
    handleBlur,
    handleSubmit,
    validateAll,
    validateField,
    reset,
  };
};
