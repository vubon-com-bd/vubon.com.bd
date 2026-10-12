/**
 * TrackingNumber Value Object — SH+16 uppercase alnum
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { SHIPMENT } from '@vubon/shared-constants/logistics';
import { generateTrackingNumber } from '@vubon/shared-utils/generator';
import { isValidTrackingNumber } from '@vubon/shared-utils/validator';
import { InvalidTrackingNumberError } from '../../errors/shipment.errors.js';

export class TrackingNumberVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  /** Generate a fresh tracking number (SH + 14 chars). */
  static generate(prefix: string = SHIPMENT.TRACKING_NUMBER_PREFIX): TrackingNumberVO {
    const generated = generateTrackingNumber(prefix);
    return new TrackingNumberVO(generated);
  }

  static create(raw: string): TrackingNumberVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new InvalidTrackingNumberError(String(raw));
    }
    const cleaned = raw.trim().toUpperCase();
    if (!isValidTrackingNumber(cleaned)) {
      throw new InvalidTrackingNumberError(cleaned);
    }
    return new TrackingNumberVO(cleaned);
  }

  static reconstitute(raw: string): TrackingNumberVO { return new TrackingNumberVO(raw); }

  get length(): number { return this.value.length; }
  startsWithShipmentPrefix(): boolean { return this.value.startsWith(SHIPMENT.TRACKING_NUMBER_PREFIX); }
}
