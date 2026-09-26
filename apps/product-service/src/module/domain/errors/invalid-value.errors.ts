import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

/**
 * InvalidValueError
 *
 * Generic invalid-value error for Value Objects.
 * Use when no specific domain error fits.
 */
export class InvalidValueError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(field: string, reason: string) {
    super(`Invalid ${field}: ${reason}`, { field, reason });
  }
}
