/**
 * OrderNote Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { ORDER_NOTE } from '@vubon/shared-constants/business/order';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class OrderNoteVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): OrderNoteVO {
    const trimmed = (raw ?? '').trim();
    if (trimmed.length > ORDER_NOTE.MAX_LENGTH) {
      throw new ValidationError(
        `Note cannot exceed ${ORDER_NOTE.MAX_LENGTH} characters`,
        'note',
      );
    }
    return new OrderNoteVO(trimmed);
  }

  static empty(): OrderNoteVO {
    return new OrderNoteVO('');
  }

  static reconstitute(raw: string): OrderNoteVO {
    return new OrderNoteVO(raw ?? '');
  }

  get isEmpty(): boolean {
    return this.value.length === 0;
  }
}
