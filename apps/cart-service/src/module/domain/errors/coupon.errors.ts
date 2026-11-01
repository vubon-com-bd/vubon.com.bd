/**
 * Coupon Domain Errors
 * @module cart-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class CouponNotFoundError extends NotFoundError {
  constructor(code: string) {
    super('Coupon', code);
    this.name = 'CouponNotFoundError';
  }
}

export class CouponAlreadyAppliedError extends ConflictError {
  constructor(cartId: string, code: string) {
    super(`Coupon "${code}" already applied to cart "${cartId}"`, 'code');
    this.name = 'CouponAlreadyAppliedError';
  }
}

export class InvalidCouponCodeError extends ValidationError {
  constructor(code: string) {
    super(`Invalid coupon code format: "${code}"`, 'code');
    this.name = 'InvalidCouponCodeError';
  }
}

export class CouponExpiredError extends BusinessRuleError {
  constructor(code: string, expiredAt: string) {
    super(`Coupon "${code}" expired at ${expiredAt}`, 'COUPON_EXPIRED', {
      code,
      expiredAt,
    });
    this.name = 'CouponExpiredError';
  }
}

export class CouponNotYetActiveError extends BusinessRuleError {
  constructor(code: string, startAt: string) {
    super(`Coupon "${code}" not active until ${startAt}`, 'COUPON_NOT_YET_ACTIVE', {
      code,
      startAt,
    });
    this.name = 'CouponNotYetActiveError';
  }
}

export class CouponMinOrderNotMetError extends BusinessRuleError {
  constructor(code: string, minOrder: number, current: number) {
    super(
      `Coupon "${code}" requires minimum order ${minOrder}, current ${current}`,
      'COUPON_MIN_ORDER_NOT_MET',
      { code, minOrder, current },
    );
    this.name = 'CouponMinOrderNotMetError';
  }
}

export class CouponUsageLimitExceededError extends BusinessRuleError {
  constructor(code: string) {
    super(`Coupon "${code}" usage limit exceeded`, 'COUPON_USAGE_LIMIT_EXCEEDED', {
      code,
    });
    this.name = 'CouponUsageLimitExceededError';
  }
}

export class CouponUserLimitExceededError extends BusinessRuleError {
  constructor(code: string, userId: string) {
    super(
      `Coupon "${code}" user usage limit exceeded for user "${userId}"`,
      'COUPON_USER_LIMIT_EXCEEDED',
      { code, userId },
    );
    this.name = 'CouponUserLimitExceededError';
  }
}

export class CouponNotApplicableError extends BusinessRuleError {
  constructor(code: string, reason: string) {
    super(`Coupon "${code}" not applicable: ${reason}`, 'COUPON_NOT_APPLICABLE', {
      code,
      reason,
    });
    this.name = 'CouponNotApplicableError';
  }
}

export class CouponNotStackableError extends BusinessRuleError {
  constructor(code: string) {
    super(`Coupon "${code}" cannot be stacked with other discounts`, 'COUPON_NOT_STACKABLE', {
      code,
    });
    this.name = 'CouponNotStackableError';
  }
}
