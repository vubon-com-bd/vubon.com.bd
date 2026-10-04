/**
 * CartItemId Value Object
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class CartItemIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CartItemIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('CartItemId cannot be empty', 'cartItemId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError(`Invalid CartItemId format: ${trimmed}`, 'cartItemId');
    }
    return new CartItemIdVO(trimmed);
  }

  static reconstitute(raw: string): CartItemIdVO {
    return new CartItemIdVO(raw);
  }
}
