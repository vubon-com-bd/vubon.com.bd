/**
 * DeliveryType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { DELIVERY_TYPE } from '@vubon/shared-constants/logistics';
import { InvalidDeliveryTypeError } from '../../errors/delivery.errors.js';

const ALLOWED = Object.values(DELIVERY_TYPE) as readonly string[];

export class DeliveryTypeVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): DeliveryTypeVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidDeliveryTypeError(String(raw));
    }
    return new DeliveryTypeVO(raw);
  }

  static reconstitute(raw: string): DeliveryTypeVO { return new DeliveryTypeVO(raw); }

  static standard(): DeliveryTypeVO { return new DeliveryTypeVO(DELIVERY_TYPE.STANDARD); }
  static express(): DeliveryTypeVO { return new DeliveryTypeVO(DELIVERY_TYPE.EXPRESS); }
  static sameDay(): DeliveryTypeVO { return new DeliveryTypeVO(DELIVERY_TYPE.SAME_DAY); }
  static scheduled(): DeliveryTypeVO { return new DeliveryTypeVO(DELIVERY_TYPE.SCHEDULED); }
  static contactless(): DeliveryTypeVO { return new DeliveryTypeVO(DELIVERY_TYPE.CONTACTLESS); }
  static pickupPoint(): DeliveryTypeVO { return new DeliveryTypeVO(DELIVERY_TYPE.PICKUP_POINT); }
  static locker(): DeliveryTypeVO { return new DeliveryTypeVO(DELIVERY_TYPE.LOCKER); }
  static door(): DeliveryTypeVO { return new DeliveryTypeVO(DELIVERY_TYPE.DOOR); }

  isStandard(): boolean { return this.value === DELIVERY_TYPE.STANDARD; }
  isExpress(): boolean { return this.value === DELIVERY_TYPE.EXPRESS; }
  isSameDay(): boolean { return this.value === DELIVERY_TYPE.SAME_DAY; }
  isScheduled(): boolean { return this.value === DELIVERY_TYPE.SCHEDULED; }
  isContactless(): boolean { return this.value === DELIVERY_TYPE.CONTACTLESS; }
  isPickupPoint(): boolean {
    return [DELIVERY_TYPE.PICKUP_POINT, DELIVERY_TYPE.LOCKER].includes(this.value as never);
  }
  isDoor(): boolean { return this.value === DELIVERY_TYPE.DOOR; }

  /** Requires a scheduled time slot. */
  requiresSchedule(): boolean { return this.isScheduled(); }

  /** Requires customer signature. */
  requiresSignature(): boolean { return this.isDoor() || this.isStandard(); }

  /** Customer collects from a fixed point. */
  isSelfPickup(): boolean { return this.isPickupPoint(); }

  /** Estimated delivery window in days. */
  get estimatedDays(): number {
    const map: Record<string, number> = {
      [DELIVERY_TYPE.SAME_DAY]: 0,
      [DELIVERY_TYPE.EXPRESS]: 1,
      [DELIVERY_TYPE.STANDARD]: 3,
      [DELIVERY_TYPE.SCHEDULED]: 3,
      [DELIVERY_TYPE.CONTACTLESS]: 3,
      [DELIVERY_TYPE.PICKUP_POINT]: 3,
      [DELIVERY_TYPE.LOCKER]: 3,
      [DELIVERY_TYPE.DOOR]: 3,
    };
    return map[this.value] ?? 3;
  }
}
