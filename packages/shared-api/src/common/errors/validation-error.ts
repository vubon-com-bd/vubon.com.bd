import { ApiError } from './api-error';

/** Response shape did not match schema, or request body invalid. */
export class ValidationError extends ApiError {
  public readonly issues: readonly unknown[];

  constructor(message: string, issues: readonly unknown[] = [], cause?: unknown) {
    super(message, { code: 'VALIDATION_ERROR', status: 422, cause });
    this.name = 'ValidationError';
    this.issues = issues;
  }
}
