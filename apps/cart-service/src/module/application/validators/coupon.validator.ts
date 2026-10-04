/**
 * CouponValidator
 * @module cart-service/application/validators
 */
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors';
import { COUPON_LIMIT } from '@vubon/shared-constants/business/cart';

export interface CouponValidationInput {
  readonly code: string;
}

export class CouponValidator {
  static validateApply(input: CouponValidationInput): void {
    if (!input.code || input.code.trim().length === 0) {
      throw new ApplicationValidationError('Coupon code is required', 'code');
    }
    const normalized = input.code.trim().toUpperCase();
    if (normalized.length < COUPON_LIMIT.CODE_MIN_LENGTH) {
      throw new ApplicationValidationError(
        `Coupon code must be at least ${COUPON_LIMIT.CODE_MIN_LENGTH} characters`,
        'code',
      );
    }
    if (normalized.length > COUPON_LIMIT.CODE_MAX_LENGTH) {
      throw new ApplicationValidationError(
        `Coupon code cannot exceed ${COUPON_LIMIT.CODE_MAX_LENGTH} characters`,
        'code',
      );
    }
    if (!/^[A-Z0-9-]+$/.test(normalized)) {
      throw new ApplicationValidationError(
        'Coupon code contains invalid characters',
        'code',
      );
    }
  }
}
