/**
 * CartItemNote Value Object
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { VALIDATION } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MAX_LENGTH = 500;

export class CartItemNoteVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CartItemNoteVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Note must be a string', 'note');
    }
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new ValidationError('Note cannot be empty', 'note');
    }
    if (trimmed.length > MAX_LENGTH) {
      throw new ValidationError(`Note cannot exceed ${MAX_LENGTH} characters`, 'note');
    }
    if (trimmed.length > VALIDATION.DESCRIPTION_MAX_LENGTH) {
      throw new ValidationError(
        `Note exceeds validation max (${VALIDATION.DESCRIPTION_MAX_LENGTH})`,
        'note',
      );
    }
    return new CartItemNoteVO(trimmed);
  }

  static reconstitute(raw: string): CartItemNoteVO {
    return new CartItemNoteVO(raw);
  }

  isEmpty(): boolean {
    return this.value.length === 0;
  }
}
