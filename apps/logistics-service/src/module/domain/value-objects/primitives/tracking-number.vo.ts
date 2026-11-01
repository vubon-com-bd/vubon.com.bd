/**
 * TrackingNumber Value Object
 * @module logistics-service/domain/value-objects/primitives
 *
 * Format: SH + 14 chars (matches ShipmentNumber format)
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SHIPMENT } from '@vubon/shared-constants/logistics';

const PREFIX = SHIPMENT.TRACKING_NUMBER_PREFIX;
const TOTAL_LENGTH = SHIPMENT.TRACKING_NUMBER_LENGTH;
const BODY_LENGTH = TOTAL_LENGTH - PREFIX.length;
const PATTERN = new RegExp(`^${PREFIX}[A-Z0-9]{${BODY_LENGTH}}$`);

export class TrackingNumberVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TrackingNumberVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('TrackingNumber cannot be empty', 'trackingNumber');
    }
    const normalized = raw.trim().toUpperCase();
    if (!PATTERN.test(normalized)) {
      throw new ValidationError(
        `TrackingNumber must match ${PREFIX}[A-Z0-9]{${BODY_LENGTH}} (16 chars total)`,
        'trackingNumber',
      );
    }
    return new TrackingNumberVO(normalized);
  }

  static reconstitute(raw: string): TrackingNumberVO {
    return new TrackingNumberVO(raw);
  }
}
