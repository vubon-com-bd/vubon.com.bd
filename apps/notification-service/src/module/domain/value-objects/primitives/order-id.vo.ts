/**
 * OrderId Value Object (Cross-Service Reference)
 * @module notification-service/domain/value-objects/primitives
 *
 * ⚠️ External Aggregate Reference — Order service এর Order।
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import type { OrderId } from '@vubon/shared-types/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MAX_LENGTH = 128;

export class OrderIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): OrderIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('OrderId cannot be empty', 'orderId');
    }
    const trimmed = raw.trim();
    if (trimmed.length > MAX_LENGTH) {
      throw new ValidationError(`OrderId exceeds ${MAX_LENGTH} chars`, 'orderId');
    }
    return new OrderIdVO(trimmed);
  }

  static reconstitute(raw: string): OrderIdVO {
    return new OrderIdVO(raw);
  }

  toBranded(): OrderId {
    return this.value as OrderId;
  }

  static fromBranded(branded: OrderId): OrderIdVO {
    return new OrderIdVO(branded as string);
  }
}
