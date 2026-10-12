/**
 * Order ID Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Cross-service Order reference।
 * Business Rule:
 * - UUID format
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import type { OrderId } from '@vubon/shared-types/common';

export class OrderIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): OrderIdVO {
    if (typeof raw !== 'string') {
      throw new Error('OrderId must be a string');
    }

    const trimmed = raw.trim();

    if (!REGEX.UUID.test(trimmed)) {
      throw new Error(`OrderId must be a valid UUID: "${trimmed}"`);
    }

    return new OrderIdVO(trimmed);
  }

  static fromBranded(id: OrderId): OrderIdVO {
    return OrderIdVO.create(id as unknown as string);
  }

  toBranded(): OrderId {
    return this.value as unknown as OrderId;
  }
}
