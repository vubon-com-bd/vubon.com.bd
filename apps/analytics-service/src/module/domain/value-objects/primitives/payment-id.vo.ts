/**
 * Payment ID Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Cross-service Payment reference।
 * Business Rule:
 * - UUID format
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import type { PaymentId } from '@vubon/shared-types/common';

export class PaymentIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PaymentIdVO {
    if (typeof raw !== 'string') {
      throw new Error('PaymentId must be a string');
    }

    const trimmed = raw.trim();

    if (!REGEX.UUID.test(trimmed)) {
      throw new Error(`PaymentId must be a valid UUID: "${trimmed}"`);
    }

    return new PaymentIdVO(trimmed);
  }

  static fromBranded(id: PaymentId): PaymentIdVO {
    return PaymentIdVO.create(id as unknown as string);
  }

  toBranded(): PaymentId {
    return this.value as unknown as PaymentId;
  }
}
