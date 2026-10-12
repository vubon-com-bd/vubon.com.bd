/**
 * ShipmentType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { SHIPMENT_TYPE } from '@vubon/shared-constants/logistics';
import { InvalidShipmentTypeError } from '../../errors/shipment.errors.js';

const ALLOWED = Object.values(SHIPMENT_TYPE) as readonly string[];

export class ShipmentTypeVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): ShipmentTypeVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidShipmentTypeError(String(raw));
    }
    return new ShipmentTypeVO(raw);
  }

  static reconstitute(raw: string): ShipmentTypeVO { return new ShipmentTypeVO(raw); }

  static standard(): ShipmentTypeVO { return new ShipmentTypeVO(SHIPMENT_TYPE.STANDARD); }
  static express(): ShipmentTypeVO { return new ShipmentTypeVO(SHIPMENT_TYPE.EXPRESS); }
  static sameDay(): ShipmentTypeVO { return new ShipmentTypeVO(SHIPMENT_TYPE.SAME_DAY); }
  static nextDay(): ShipmentTypeVO { return new ShipmentTypeVO(SHIPMENT_TYPE.NEXT_DAY); }
  static overnight(): ShipmentTypeVO { return new ShipmentTypeVO(SHIPMENT_TYPE.OVERNIGHT); }
  static international(): ShipmentTypeVO { return new ShipmentTypeVO(SHIPMENT_TYPE.INTERNATIONAL); }
  static freight(): ShipmentTypeVO { return new ShipmentTypeVO(SHIPMENT_TYPE.FREIGHT); }
  static bulk(): ShipmentTypeVO { return new ShipmentTypeVO(SHIPMENT_TYPE.BULK); }

  isStandard(): boolean { return this.value === SHIPMENT_TYPE.STANDARD; }
  isExpress(): boolean {
    return [SHIPMENT_TYPE.EXPRESS, SHIPMENT_TYPE.SAME_DAY, SHIPMENT_TYPE.NEXT_DAY, SHIPMENT_TYPE.OVERNIGHT].includes(this.value as never);
  }
  isInternational(): boolean { return this.value === SHIPMENT_TYPE.INTERNATIONAL; }
  isFreight(): boolean { return this.value === SHIPMENT_TYPE.FREIGHT; }
  isBulk(): boolean { return this.value === SHIPMENT_TYPE.BULK; }
  isSameDay(): boolean { return this.value === SHIPMENT_TYPE.SAME_DAY; }

  /** Express-class shipments require priority handling. */
  requiresPriorityHandling(): boolean { return this.isExpress(); }

  /** Estimated delivery days for this type (heuristic). */
  get defaultDeliveryDays(): number {
    const map: Record<string, number> = {
      [SHIPMENT_TYPE.SAME_DAY]: 0,
      [SHIPMENT_TYPE.OVERNIGHT]: 1,
      [SHIPMENT_TYPE.NEXT_DAY]: 1,
      [SHIPMENT_TYPE.EXPRESS]: 2,
      [SHIPMENT_TYPE.STANDARD]: 3,
      [SHIPMENT_TYPE.BULK]: 5,
      [SHIPMENT_TYPE.FREIGHT]: 7,
      [SHIPMENT_TYPE.INTERNATIONAL]: 10,
    };
    return map[this.value] ?? 3;
  }
}
