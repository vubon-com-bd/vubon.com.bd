/**
 * OrderId Value Object (cross-service reference)
 * @module payment-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class OrderIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): OrderIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('OrderId cannot be empty', 'orderId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('OrderId must be a valid UUID', 'orderId');
    }
    return new OrderIdVO(trimmed);
  }

  static reconstitute(raw: string): OrderIdVO {
    return new OrderIdVO(raw);
  }
}
