/**
 * DeliveryMethodId Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class DeliveryMethodIdVO extends BaseIdVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): DeliveryMethodIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('DeliveryMethodId cannot be empty', 'deliveryMethodId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('DeliveryMethodId must be a valid UUID', 'deliveryMethodId');
    }
    return new DeliveryMethodIdVO(trimmed);
  }

  static reconstitute(raw: string): DeliveryMethodIdVO {
    return new DeliveryMethodIdVO(raw);
  }
}
