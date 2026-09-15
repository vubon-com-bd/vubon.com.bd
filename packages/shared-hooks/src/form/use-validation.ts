import { useCallback, useState } from 'react';
import type { FormErrors, FormValidator } from './form.types';

export function useValidation<TValues extends Record<string, unknown>>(
  validator: FormValidator<TValues>
): {
  readonly errors: FormErrors<TValues>;
  readonly validate: (values: TValues) => Promise<FormErrors<TValues>>;
  readonly clear: () => void;
} {
  const [errors, setErrors] = useState<FormErrors<TValues>>({});

  const validate = useCallback(
    async (values: TValues): Promise<FormErrors<TValues>> => {
      const next = await validator(values);
      setErrors(next);
      return next;
    },
    [validator]
  );

  const clear = useCallback(() => setErrors({}), []);

  return { errors, validate, clear };
}
