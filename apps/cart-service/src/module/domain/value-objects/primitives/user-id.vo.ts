/**
 * CartUserId Value Object (reference to user-service)
 * @module cart-service/domain/value-objects/primitives
 *
 * NOTE: Cannot extend shared-kernel UserIdVO (its constructor is private).
 * Instead extends BaseIdVO<string>.
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class CartUserIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CartUserIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('UserId cannot be empty', 'userId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('UserId must be a valid UUID', 'userId');
    }
    return new CartUserIdVO(trimmed);
  }

  static reconstitute(raw: string): CartUserIdVO {
    return new CartUserIdVO(raw);
  }
}
