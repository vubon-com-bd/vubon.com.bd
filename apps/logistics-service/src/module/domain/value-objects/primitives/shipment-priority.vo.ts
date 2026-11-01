/**
 * ShipmentPriority Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SHIPMENT_PRIORITY } from '@vubon/shared-constants/logistics';

export type ShipmentPriorityValue =
  (typeof SHIPMENT_PRIORITY)[keyof typeof SHIPMENT_PRIORITY];

const VALID_PRIORITIES: readonly string[] = Object.values(SHIPMENT_PRIORITY);

const PRIORITY_RANK: Readonly<Record<ShipmentPriorityValue, number>> = {
  low: 1,
  normal: 2,
  high: 3,
  urgent: 4,
};

export class ShipmentPriorityVO extends BaseVO<ShipmentPriorityValue> {
  private constructor(value: ShipmentPriorityValue) {
    super(value);
  }

  static create(raw: string): ShipmentPriorityVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ShipmentPriority must be a string', 'priority');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_PRIORITIES.includes(normalized)) {
      throw new ValidationError(
        `Invalid ShipmentPriority: "${normalized}". Allowed: ${VALID_PRIORITIES.join(', ')}`,
        'priority',
      );
    }
    return new ShipmentPriorityVO(normalized as ShipmentPriorityValue);
  }

  static reconstitute(raw: string): ShipmentPriorityVO {
    return new ShipmentPriorityVO(raw as ShipmentPriorityValue);
  }

  static low(): ShipmentPriorityVO {
    return new ShipmentPriorityVO(SHIPMENT_PRIORITY.LOW);
  }
  static normal(): ShipmentPriorityVO {
    return new ShipmentPriorityVO(SHIPMENT_PRIORITY.NORMAL);
  }
  static high(): ShipmentPriorityVO {
    return new ShipmentPriorityVO(SHIPMENT_PRIORITY.HIGH);
  }
  static urgent(): ShipmentPriorityVO {
    return new ShipmentPriorityVO(SHIPMENT_PRIORITY.URGENT);
  }

  // ─── Predicates ───────────────────────────
  isLow(): boolean {
    return this.value === SHIPMENT_PRIORITY.LOW;
  }
  isNormal(): boolean {
    return this.value === SHIPMENT_PRIORITY.NORMAL;
  }
  isHigh(): boolean {
    return this.value === SHIPMENT_PRIORITY.HIGH;
  }
  isUrgent(): boolean {
    return this.value === SHIPMENT_PRIORITY.URGENT;
  }

  isAtLeast(other: ShipmentPriorityVO): boolean {
    return PRIORITY_RANK[this.value] >= PRIORITY_RANK[other.value];
  }

  get rank(): number {
    return PRIORITY_RANK[this.value];
  }
}
