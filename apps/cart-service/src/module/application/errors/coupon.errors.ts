/**
 * Coupon Application Errors
 * @module cart-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

// ─── Not Found (404) ──────────────────────
export class CouponNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(code: string) {
    super('Coupon', code);
    this.name = 'CouponNotFoundApplicationError';
  }
}

// ─── Conflict (409) ───────────────────────
export class CouponAlreadyAppliedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(cartId: string, code: string) {
    super(`Coupon "${code}" already applied to cart "${cartId}"`, { cartId, code });
    this.name = 'CouponAlreadyAppliedApplicationError';
  }
}

// ─── Command (400) ────────────────────────
export class ApplyCouponError extends CommandError {
  constructor(code: string, reason: string) {
    super(`Failed to apply coupon "${code}": ${reason}`, 'ApplyCoupon', undefined);
    void code;
    this.name = 'ApplyCouponError';
  }
}

export class RemoveCouponError extends CommandError {
  constructor(code: string, reason: string) {
    super(`Failed to remove coupon "${code}": ${reason}`, 'RemoveCoupon', undefined);
    void code;
    this.name = 'RemoveCouponError';
  }
}

// ─── Business rules (400) ─────────────────
export class CouponExpiredApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(code: string, expiredAt: string) {
    super(`Coupon "${code}" expired at ${expiredAt}`, { code, expiredAt });
    this.name = 'CouponExpiredApplicationError';
  }
}

export class CouponMinOrderNotMetApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(code: string, minOrder: number, current: number) {
    super(
      `Coupon "${code}" requires minimum order ${minOrder}, current ${current}`,
      { code, minOrder, current },
    );
    this.name = 'CouponMinOrderNotMetApplicationError';
  }
}

export class CouponNotApplicableApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(code: string, reason: string) {
    super(`Coupon "${code}" not applicable: ${reason}`, { code, reason });
    this.name = 'CouponNotApplicableApplicationError';
  }
}

export class CouponLimitReachedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(cartId: string, max: number) {
    super(`Cart "${cartId}" coupon limit reached (max ${max})`, { cartId, max });
    this.name = 'CouponLimitReachedApplicationError';
  }
}

// ─── Validation (422) ─────────────────────
export class CouponValidationApplicationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'CouponValidationApplicationError';
  }
}
