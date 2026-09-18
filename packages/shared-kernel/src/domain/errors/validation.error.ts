/**
 * Domain Validation Error
 * @module shared-kernel/domain/errors
 *
 * Values আসে shared-constants/common/error.constants থেকে (value)।
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { DomainError } from './domain.error';

export class ValidationError extends DomainError {
  readonly code = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 422;

  constructor(
    message: string,
    public readonly field?: string,
    context?: Readonly<Record<string, unknown>>
  ) {
    super(message, { ...context, field });
    this.name = 'ValidationError';
  }
}
