/**
 * Coupon domain errors
 * @module cart-service/domain/errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';

export class CouponNotFoundError extends NotFoundError {
  constructor(code: string) {
    super('Coupon', code);
    this.name = 'CouponNotFoundError';
  }
}

export class CouponExpiredError extends ConflictError {
  constructor(code: string) {
    super(`Coupon "${code}" has expired`, 'expiresAt');
    this.name = 'CouponExpiredError';
  }
}

export class CouponAlreadyUsedError extends ConflictError {
  constructor(code: string) {
    super(`Coupon "${code}" has already been used`, 'usedCount');
    this.name = 'CouponAlreadyUsedError';
  }
}

export class InvalidCouponCodeError extends ValidationError {
  constructor(value: string) {
    super(`Invalid coupon code "${value}"`, 'code');
    this.name = 'InvalidCouponCodeError';
  }
}

export class InvalidCouponStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid coupon status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidCouponStatusError';
  }
}
