/**
 * DeliveryType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { DELIVERY_TYPE } from '@vubon/shared-constants/logistics';

export type DeliveryTypeValue =
  (typeof DELIVERY_TYPE)[keyof typeof DELIVERY_TYPE];

const VALID_TYPES: readonly string[] = Object.values(DELIVERY_TYPE);

export class DeliveryTypeVO extends BaseVO<DeliveryTypeValue> {
  private constructor(value: DeliveryTypeValue) {
    super(value);
  }

  static create(raw: string): DeliveryTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('DeliveryType must be a string', 'type');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.includes(normalized)) {
      throw new ValidationError(
        `Invalid DeliveryType: "${normalized}". Allowed: ${VALID_TYPES.join(', ')}`,
        'type',
      );
    }
    return new DeliveryTypeVO(normalized as DeliveryTypeValue);
  }

  static reconstitute(raw: string): DeliveryTypeVO {
    return new DeliveryTypeVO(raw as DeliveryTypeValue);
  }

  isStandard(): boolean { return this.value === DELIVERY_TYPE.STANDARD; }
  isExpress(): boolean { return this.value === DELIVERY_TYPE.EXPRESS; }
  isSameDay(): boolean { return this.value === DELIVERY_TYPE.SAME_DAY; }
  isScheduled(): boolean { return this.value === DELIVERY_TYPE.SCHEDULED; }
  isContactless(): boolean { return this.value === DELIVERY_TYPE.CONTACTLESS; }
  isPickupPoint(): boolean { return this.value === DELIVERY_TYPE.PICKUP_POINT; }
  isLocker(): boolean { return this.value === DELIVERY_TYPE.LOCKER; }
  isDoor(): boolean { return this.value === DELIVERY_TYPE.DOOR; }

  requiresSignature(): boolean {
    return this.isStandard() || this.isExpress() || this.isSameDay() || this.isDoor();
  }

  isPickup(): boolean {
    return this.isPickupPoint() || this.isLocker();
  }
}
