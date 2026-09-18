/**
 * Domain Conflict Error
 * @module shared-kernel/domain/errors
 *
 * Values আসে shared-constants/common/error.constants থেকে (value)।
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { DomainError } from './domain.error';

export class ConflictError extends DomainError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(
    message: string,
    public readonly conflictingField?: string,
    context?: Readonly<Record<string, unknown>>
  ) {
    super(message, { ...context, conflictingField });
    this.name = 'ConflictError';
  }
}
