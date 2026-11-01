/**
 * ShipmentNumber Value Object
 * @module logistics-service/domain/value-objects/primitives
 *
 * Format: SH + 14 chars (digits/uppercase) = 16 chars total
 * Example: SH20251030123456
 * Business Rule: shipment.constants.ts → SHIPMENT.TRACKING_NUMBER_PREFIX = 'SH', LENGTH = 16
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SHIPMENT } from '@vubon/shared-constants/logistics';

const PREFIX = SHIPMENT.TRACKING_NUMBER_PREFIX; // 'SH'
const TOTAL_LENGTH = SHIPMENT.TRACKING_NUMBER_LENGTH; // 16
const BODY_LENGTH = TOTAL_LENGTH - PREFIX.length; // 14
const PATTERN = new RegExp(`^${PREFIX}[A-Z0-9]{${BODY_LENGTH}}$`);

export class ShipmentNumberVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ShipmentNumberVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('ShipmentNumber cannot be empty', 'shipmentNumber');
    }
    const normalized = raw.trim().toUpperCase();
    if (!PATTERN.test(normalized)) {
      throw new ValidationError(
        `ShipmentNumber must match ${PREFIX}[A-Z0-9]{${BODY_LENGTH}} (16 chars total)`,
        'shipmentNumber',
      );
    }
    return new ShipmentNumberVO(normalized);
  }

  static reconstitute(raw: string): ShipmentNumberVO {
    return new ShipmentNumberVO(raw);
  }

  get body(): string {
    return this.value.slice(PREFIX.length);
  }

  get prefix(): string {
    return PREFIX;
  }
}
