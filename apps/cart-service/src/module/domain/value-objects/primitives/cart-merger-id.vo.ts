/**
 * CartMergerId Value Object
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class CartMergerIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CartMergerIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('CartMergerId cannot be empty', 'cartMergerId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('CartMergerId must be a valid UUID', 'cartMergerId');
    }
    return new CartMergerIdVO(trimmed);
  }

  static reconstitute(raw: string): CartMergerIdVO {
    return new CartMergerIdVO(raw);
  }
}
