/**
 * VoucherCode Value Object
 * @module cart-service/domain/value-objects/primitives
 *
 * Business Rule:
 * - 8-32 characters
 * - Uppercase alphanumeric + `_` + `-`
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 8;
const MAX_LENGTH = 32;
const CODE_PATTERN = /^[A-Z0-9_-]+$/;

export class VoucherCodeVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VoucherCodeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('VoucherCode must be a string', 'code');
    }
    const normalized = raw.trim().toUpperCase();
    if (normalized.length < MIN_LENGTH || normalized.length > MAX_LENGTH) {
      throw new ValidationError(
        `VoucherCode must be ${MIN_LENGTH}-${MAX_LENGTH} chars`,
        'code',
      );
    }
    if (!CODE_PATTERN.test(normalized)) {
      throw new ValidationError(
        'VoucherCode can only contain A-Z, 0-9, "_", "-"',
        'code',
      );
    }
    return new VoucherCodeVO(normalized);
  }

  static reconstitute(raw: string): VoucherCodeVO {
    return new VoucherCodeVO(raw);
  }

  get length(): number {
    return this.value.length;
  }
}
