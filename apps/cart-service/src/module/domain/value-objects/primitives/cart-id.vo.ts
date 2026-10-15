/**
 * CartId Value Object
 * @module cart-service/domain/value-objects/primitives
 *
 * Business Rule:
 * - UUID v4 format
 * - Immutable
 * - DB থেকে reconstitute করার সময় validation skip
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class CartIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CartIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('CartId cannot be empty', 'cartId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('CartId must be a valid UUID', 'cartId');
    }
    return new CartIdVO(trimmed);
  }

  static reconstitute(raw: string): CartIdVO {
    return new CartIdVO(raw);
  }
}
