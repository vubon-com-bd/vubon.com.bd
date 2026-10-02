/**
 * CartShippingId Value Object
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class CartShippingIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CartShippingIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('CartShippingId cannot be empty', 'shippingId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('CartShippingId must be a valid UUID', 'shippingId');
    }
    return new CartShippingIdVO(trimmed);
  }

  static reconstitute(raw: string): CartShippingIdVO {
    return new CartShippingIdVO(raw);
  }
}
