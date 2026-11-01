/**
 * OrderNote Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ORDER_NOTE } from '@vubon/shared-constants/business/order';

export class OrderNoteVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): OrderNoteVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('OrderNote must be a string', 'note');
    }
    const trimmed = raw.trim();
    if (trimmed.length > ORDER_NOTE.MAX_LENGTH) {
      throw new ValidationError(
        `OrderNote exceeds max length ${ORDER_NOTE.MAX_LENGTH}`,
        'note',
      );
    }
    return new OrderNoteVO(trimmed);
  }

  static empty(): OrderNoteVO {
    return new OrderNoteVO('');
  }

  static reconstitute(raw: string): OrderNoteVO {
    return new OrderNoteVO(raw);
  }

  isEmpty(): boolean { return this.value.length === 0; }
}
