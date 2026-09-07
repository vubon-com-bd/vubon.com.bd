import { VALIDATION } from '@vubon/shared-constants';

export interface ValidationRule {
  field: string;
  rule: string;
  params?: unknown[];
  message?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  rule: string;
  value?: unknown;
}

export type ValidationType = keyof typeof VALIDATION;
