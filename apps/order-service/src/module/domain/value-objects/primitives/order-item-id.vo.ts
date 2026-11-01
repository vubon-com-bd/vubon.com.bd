/**
 * OrderItemId Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class OrderItemIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): OrderItemIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('OrderItemId cannot be empty', 'orderItemId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('OrderItemId must be a valid UUID', 'orderItemId');
    }
    return new OrderItemIdVO(trimmed);
  }

  static reconstitute(raw: string): OrderItemIdVO {
    return new OrderItemIdVO(raw);
  }
}
