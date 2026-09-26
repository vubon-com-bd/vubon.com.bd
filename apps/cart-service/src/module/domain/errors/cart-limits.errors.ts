import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class CartLimitExceededError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;
  constructor(limit: number, actual: number) {
    super(`Cart limit exceeded: max ${limit}, got ${actual}`, { limit, actual });
  }
}
