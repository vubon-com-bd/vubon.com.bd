/**
 * ShippingMethodType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SHIPPING_METHOD } from '@vubon/shared-constants/logistics';

export type ShippingMethodTypeValue =
  (typeof SHIPPING_METHOD)[keyof typeof SHIPPING_METHOD];

const VALID_TYPES: readonly string[] = Object.values(SHIPPING_METHOD);

export class ShippingMethodTypeVO extends BaseVO<ShippingMethodTypeValue> {
  private constructor(value: ShippingMethodTypeValue) {
    super(value);
  }

  static create(raw: string): ShippingMethodTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ShippingMethodType must be a string', 'type');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.includes(normalized)) {
      throw new ValidationError(
        `Invalid ShippingMethodType: "${normalized}". Allowed: ${VALID_TYPES.join(', ')}`,
        'type',
      );
    }
    return new ShippingMethodTypeVO(normalized as ShippingMethodTypeValue);
  }

  static reconstitute(raw: string): ShippingMethodTypeVO {
    return new ShippingMethodTypeVO(raw as ShippingMethodTypeValue);
  }

  isStandard(): boolean { return this.value === SHIPPING_METHOD.STANDARD; }
  isExpress(): boolean { return this.value === SHIPPING_METHOD.EXPRESS; }
  isSameDay(): boolean { return this.value === SHIPPING_METHOD.SAME_DAY; }
  isNextDay(): boolean { return this.value === SHIPPING_METHOD.NEXT_DAY; }
  isOvernight(): boolean { return this.value === SHIPPING_METHOD.OVERNIGHT; }
  isEconomy(): boolean { return this.value === SHIPPING_METHOD.ECONOMY; }
  isInternational(): boolean { return this.value === SHIPPING_METHOD.INTERNATIONAL; }
  isFreight(): boolean { return this.value === SHIPPING_METHOD.FREIGHT; }
  isPickup(): boolean { return this.value === SHIPPING_METHOD.PICKUP; }
  isLocalDelivery(): boolean { return this.value === SHIPPING_METHOD.LOCAL_DELIVERY; }

  isFast(): boolean {
    return this.isExpress() || this.isSameDay() || this.isNextDay() || this.isOvernight();
  }

  isEconomical(): boolean {
    return this.isEconomy() || this.isStandard();
  }
}
