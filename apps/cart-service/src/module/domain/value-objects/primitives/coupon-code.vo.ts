/**
 * CouponCode Value Object
 * @module cart-service/domain/value-objects/primitives
 *
 * Business Rule:
 * - 4-32 characters
 * - Uppercase alphanumeric + `_` + `-`
 * - Normalized to uppercase
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 4;
const MAX_LENGTH = 32;
const CODE_PATTERN = /^[A-Z0-9_-]+$/;

export class CouponCodeVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CouponCodeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('CouponCode must be a string', 'code');
    }
    const normalized = raw.trim().toUpperCase();
    if (normalized.length < MIN_LENGTH || normalized.length > MAX_LENGTH) {
      throw new ValidationError(
        `CouponCode must be ${MIN_LENGTH}-${MAX_LENGTH} chars`,
        'code',
      );
    }
    if (!CODE_PATTERN.test(normalized)) {
      throw new ValidationError(
        'CouponCode can only contain A-Z, 0-9, "_", "-"',
        'code',
      );
    }
    return new CouponCodeVO(normalized);
  }

  static reconstitute(raw: string): CouponCodeVO {
    return new CouponCodeVO(raw);
  }

  get length(): number {
    return this.value.length;
  }
}
