/**
 * ShipmentId Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { REGEX } from '@vubon/shared-constants/common';

export class ShipmentIdVO extends BaseIdVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): ShipmentIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('ShipmentId cannot be empty', 'shipmentId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('ShipmentId must be a valid UUID', 'shipmentId');
    }
    return new ShipmentIdVO(trimmed);
  }

  static reconstitute(raw: string): ShipmentIdVO { return new ShipmentIdVO(raw); }
}
