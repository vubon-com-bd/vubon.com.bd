/**
 * CartItemNote Value Object
 * @module cart-service/domain/value-objects/primitives
 *
 * Business Rule:
 * - Max 500 characters
 * - Trimmed
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MAX_LENGTH = 500;

export class CartItemNoteVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CartItemNoteVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('CartItemNote must be a string', 'note');
    }
    const trimmed = raw.trim();
    if (trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `CartItemNote exceeds max length ${MAX_LENGTH}`,
        'note',
      );
    }
    return new CartItemNoteVO(trimmed);
  }

  static empty(): CartItemNoteVO {
    return new CartItemNoteVO('');
  }

  static reconstitute(raw: string): CartItemNoteVO {
    return new CartItemNoteVO(raw);
  }

  isEmpty(): boolean {
    return this.value.length === 0;
  }

  get length(): number {
    return this.value.length;
  }
}
