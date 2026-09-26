import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class CouponNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(code: string) {
    super(`Coupon not found: ${code}`, { code });
  }
}

export class CouponInvalidError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;
  constructor(code: string, reason: string) {
    super(`Coupon invalid [${code}]: ${reason}`, { code, reason });
  }
}

export class CouponAlreadyAppliedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;
  constructor(code: string) {
    super(`Coupon already applied: ${code}`, { code });
  }
}
