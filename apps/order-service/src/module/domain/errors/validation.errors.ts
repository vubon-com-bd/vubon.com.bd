import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

/**
 * Generic value-object validation error.
 * Use for VO-level format/range/required checks.
 */
export class ValidationError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(field: string, reason: string) {
    super(`Validation failed for ${field}: ${reason}`, { field, reason });
  }
}
