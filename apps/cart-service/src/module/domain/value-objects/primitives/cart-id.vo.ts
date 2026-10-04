/**
 * CartId Value Object
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { InvalidCartTypeError } from '../../errors/cart.errors.js';

export class CartIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CartIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new InvalidCartTypeError(raw, ['non-empty string']);
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new InvalidCartTypeError(trimmed, ['UUID v4']);
    }
    return new CartIdVO(trimmed);
  }

  static reconstitute(raw: string): CartIdVO {
    return new CartIdVO(raw);
  }
}
