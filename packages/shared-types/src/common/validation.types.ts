import { VALIDATION } from '@vubon/shared-constants/src/common/validation.constants';

/**
 * Validation rule interface
 */
export interface ValidationRule {
  field: string;
  rule: string;
  params?: unknown[];
  message?: string;
}

/**
 * Validation error interface
 */
export interface ValidationError {
  field: string;
  message: string;
  rule: string;
  value?: unknown;
}

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * Validation type
 */
export type ValidationType = keyof typeof VALIDATION;
