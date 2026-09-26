import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class MergeConflictError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;
  constructor(itemCount: number) {
    super(`Merge conflicts detected: ${itemCount} items`, { itemCount });
  }
}

export class MergeNotAllowedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_FORBIDDEN;
  readonly httpStatus = 400;
  constructor(reason: string) {
    super(`Merge not allowed: ${reason}`, { reason });
  }
}
