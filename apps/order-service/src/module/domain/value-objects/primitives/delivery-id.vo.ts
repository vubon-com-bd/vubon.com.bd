/**
 * DeliveryId Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class DeliveryIdVO extends BaseIdVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): DeliveryIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('DeliveryId cannot be empty', 'deliveryId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('DeliveryId must be a valid UUID', 'deliveryId');
    }
    return new DeliveryIdVO(trimmed);
  }

  static reconstitute(raw: string): DeliveryIdVO { return new DeliveryIdVO(raw); }
}
