/**
 * CouponCode Value Object
 * @module cart-service/domain/value-objects/primitives
 *
 * Business rules:
 * - Uppercase A-Z, digits, dash — normalized
 * - Length 4–32 chars
 * - Case-insensitive equality (handled via normalization)
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { COUPON_LIMIT } from '@vubon/shared-constants/business/cart';
import { InvalidCouponCodeError } from '../../errors/coupon.errors.js';

const CODE_PATTERN = /^[A-Z0-9][A-Z0-9-]*[A-Z0-9]$/;

export class CouponCodeVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CouponCodeVO {
    if (typeof raw !== 'string') {
      throw new InvalidCouponCodeError(String(raw));
    }
    const normalized = raw.trim().toUpperCase();
    if (normalized.length < COUPON_LIMIT.CODE_MIN_LENGTH) {
      throw new InvalidCouponCodeError(
        `${normalized} (min ${COUPON_LIMIT.CODE_MIN_LENGTH} chars)`,
      );
    }
    if (normalized.length > COUPON_LIMIT.CODE_MAX_LENGTH) {
      throw new InvalidCouponCodeError(
        `${normalized} (max ${COUPON_LIMIT.CODE_MAX_LENGTH} chars)`,
      );
    }
    if (!CODE_PATTERN.test(normalized)) {
      throw new InvalidCouponCodeError(`${normalized} (invalid format)`);
    }
    return new CouponCodeVO(normalized);
  }

  static reconstitute(raw: string): CouponCodeVO {
    return new CouponCodeVO(raw);
  }

  isWellFormed(): boolean {
    return CODE_PATTERN.test(this.value);
  }

  hasPrefix(prefix: string): boolean {
    return this.value.startsWith(prefix.toUpperCase());
  }

  matches(other: CouponCodeVO): boolean {
    return this.value === other.value;
  }
}
