/**
 * ShipmentType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SHIPMENT_TYPE } from '@vubon/shared-constants/logistics';

export type ShipmentTypeValue = (typeof SHIPMENT_TYPE)[keyof typeof SHIPMENT_TYPE];

const VALID_TYPES: readonly string[] = Object.values(SHIPMENT_TYPE);

export class ShipmentTypeVO extends BaseVO<ShipmentTypeValue> {
  private constructor(value: ShipmentTypeValue) {
    super(value);
  }

  static create(raw: string): ShipmentTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ShipmentType must be a string', 'type');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.includes(normalized)) {
      throw new ValidationError(
        `Invalid ShipmentType: "${normalized}". Allowed: ${VALID_TYPES.join(', ')}`,
        'type',
      );
    }
    return new ShipmentTypeVO(normalized as ShipmentTypeValue);
  }

  static reconstitute(raw: string): ShipmentTypeVO {
    return new ShipmentTypeVO(raw as ShipmentTypeValue);
  }

  // ─── Predicates ───────────────────────────
  isStandard(): boolean {
    return this.value === SHIPMENT_TYPE.STANDARD;
  }
  isExpress(): boolean {
    return this.value === SHIPMENT_TYPE.EXPRESS;
  }
  isSameDay(): boolean {
    return this.value === SHIPMENT_TYPE.SAME_DAY;
  }
  isInternational(): boolean {
    return this.value === SHIPMENT_TYPE.INTERNATIONAL;
  }
  isFreight(): boolean {
    return this.value === SHIPMENT_TYPE.FREIGHT;
  }

  /** Fast shipment (same_day, next_day, overnight) */
  isFast(): boolean {
    return (
      this.value === SHIPMENT_TYPE.SAME_DAY ||
      this.value === SHIPMENT_TYPE.NEXT_DAY ||
      this.value === SHIPMENT_TYPE.OVERNIGHT
    );
  }
}
