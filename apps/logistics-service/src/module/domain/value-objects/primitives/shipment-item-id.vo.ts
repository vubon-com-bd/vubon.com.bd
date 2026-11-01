/**
 * ShipmentItemId Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class ShipmentItemIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ShipmentItemIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('ShipmentItemId cannot be empty', 'shipmentItemId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('ShipmentItemId must be a valid UUID', 'shipmentItemId');
    }
    return new ShipmentItemIdVO(trimmed);
  }

  static reconstitute(raw: string): ShipmentItemIdVO {
    return new ShipmentItemIdVO(raw);
  }
}
