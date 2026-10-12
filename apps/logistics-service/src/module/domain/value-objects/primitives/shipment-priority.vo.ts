/**
 * ShipmentPriority Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { SHIPMENT_PRIORITY } from '@vubon/shared-constants/logistics';
import { InvalidShipmentPriorityError } from '../../errors/shipment.errors.js';

const ALLOWED = Object.values(SHIPMENT_PRIORITY) as readonly string[];

export class ShipmentPriorityVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): ShipmentPriorityVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidShipmentPriorityError(String(raw));
    }
    return new ShipmentPriorityVO(raw);
  }

  static reconstitute(raw: string): ShipmentPriorityVO { return new ShipmentPriorityVO(raw); }

  static low(): ShipmentPriorityVO { return new ShipmentPriorityVO(SHIPMENT_PRIORITY.LOW); }
  static normal(): ShipmentPriorityVO { return new ShipmentPriorityVO(SHIPMENT_PRIORITY.NORMAL); }
  static high(): ShipmentPriorityVO { return new ShipmentPriorityVO(SHIPMENT_PRIORITY.HIGH); }
  static urgent(): ShipmentPriorityVO { return new ShipmentPriorityVO(SHIPMENT_PRIORITY.URGENT); }

  isLow(): boolean { return this.value === SHIPMENT_PRIORITY.LOW; }
  isNormal(): boolean { return this.value === SHIPMENT_PRIORITY.NORMAL; }
  isHigh(): boolean { return this.value === SHIPMENT_PRIORITY.HIGH; }
  isUrgent(): boolean { return this.value === SHIPMENT_PRIORITY.URGENT; }

  /** High or urgent — bypass normal queue. */
  isElevated(): boolean { return this.isHigh() || this.isUrgent(); }

  /** Numeric rank (higher = more urgent). */
  get rank(): number {
    const ranks: Record<string, number> = {
      [SHIPMENT_PRIORITY.LOW]: 0,
      [SHIPMENT_PRIORITY.NORMAL]: 1,
      [SHIPMENT_PRIORITY.HIGH]: 2,
      [SHIPMENT_PRIORITY.URGENT]: 3,
    };
    return ranks[this.value] ?? 1;
  }
}
