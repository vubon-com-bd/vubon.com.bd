/**
 * Coupon application errors
 * @module cart-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class CouponNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(code: string) {
    super(`Coupon "${code}" not found`, { code });
    this.name = 'CouponNotFoundApplicationError';
  }
}

export class CouponNotApplicableError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 422;
  constructor(code: string, reason: string) {
    super(`Coupon "${code}" not applicable: ${reason}`, { code, reason });
    this.name = 'CouponNotApplicableError';
  }
}
