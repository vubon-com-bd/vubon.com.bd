/**
 * Validation Error Types
 * @module shared-types/common/errors
 */

import type { ErrorCode, DomainErrorDetail } from './base-error.types';

export interface ValidationError {
  readonly name: 'ValidationError';
  readonly code: ErrorCode | 'VALIDATION_ERROR';
  readonly message: string;
  readonly details: readonly DomainErrorDetail[];
  readonly field?: string;
  readonly value?: unknown;
}

export interface FieldValidationError extends ValidationError {
  readonly field: string;
  readonly value: unknown;
}

export interface MultiFieldValidationError extends ValidationError {
  readonly details: readonly FieldValidationError[];
}
