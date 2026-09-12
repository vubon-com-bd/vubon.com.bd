import { useState, useCallback } from 'react';
import type { ValidationRule, ValidationResult, ValidationError } from '@vubon/shared-types';

export interface UseValidationReturn {
  errors: ValidationError[];
  isValid: boolean;
  validate: (value: unknown) => ValidationResult;
  clearErrors: () => void;
}

export const useValidation = (rules: ValidationRule[]): UseValidationReturn => {
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isValid, setIsValid] = useState(true);

  const validate = useCallback(
    (value: unknown): ValidationResult => {
      const validationErrors: ValidationError[] = [];
      for (const rule of rules) {
        if (rule.rule === 'required' && !value) {
          validationErrors.push({
            field: rule.field,
            message: rule.message ?? `${rule.field} is required`,
            rule: rule.rule,
            value,
          });
        }
        if (
          rule.rule === 'min' &&
          rule.params?.[0] !== undefined &&
          typeof value === 'string' &&
          value.length < (rule.params[0] as number)
        ) {
          validationErrors.push({
            field: rule.field,
            message: rule.message ?? `Minimum length is ${rule.params[0]}`,
            rule: rule.rule,
            value,
          });
        }
        if (
          rule.rule === 'max' &&
          rule.params?.[0] !== undefined &&
          typeof value === 'string' &&
          value.length > (rule.params[0] as number)
        ) {
          validationErrors.push({
            field: rule.field,
            message: rule.message ?? `Maximum length is ${rule.params[0]}`,
            rule: rule.rule,
            value,
          });
        }
      }
      const result: ValidationResult = {
        isValid: validationErrors.length === 0,
        errors: validationErrors,
      };
      setErrors(validationErrors);
      setIsValid(result.isValid);
      return result;
    },
    [rules]
  );

  const clearErrors = useCallback(() => {
    setErrors([]);
    setIsValid(true);
  }, []);

  return { errors, isValid, validate, clearErrors };
};
