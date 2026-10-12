/**
 * ShippingMethodValue Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { SHIPPING_METHOD } from '@vubon/shared-constants/logistics';
import { InvalidShippingMethodValueError } from '../../errors/shipping-method.errors.js';

const ALLOWED = Object.values(SHIPPING_METHOD) as readonly string[];

export class ShippingMethodValueVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): ShippingMethodValueVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidShippingMethodValueError(String(raw));
    }
    return new ShippingMethodValueVO(raw);
  }

  static reconstitute(raw: string): ShippingMethodValueVO { return new ShippingMethodValueVO(raw); }

  static standard(): ShippingMethodValueVO { return new ShippingMethodValueVO(SHIPPING_METHOD.STANDARD); }
  static express(): ShippingMethodValueVO { return new ShippingMethodValueVO(SHIPPING_METHOD.EXPRESS); }
  static sameDay(): ShippingMethodValueVO { return new ShippingMethodValueVO(SHIPPING_METHOD.SAME_DAY); }
  static nextDay(): ShippingMethodValueVO { return new ShippingMethodValueVO(SHIPPING_METHOD.NEXT_DAY); }
  static overnight(): ShippingMethodValueVO { return new ShippingMethodValueVO(SHIPPING_METHOD.OVERNIGHT); }
  static economy(): ShippingMethodValueVO { return new ShippingMethodValueVO(SHIPPING_METHOD.ECONOMY); }
  static international(): ShippingMethodValueVO { return new ShippingMethodValueVO(SHIPPING_METHOD.INTERNATIONAL); }
  static freight(): ShippingMethodValueVO { return new ShippingMethodValueVO(SHIPPING_METHOD.FREIGHT); }
  static pickup(): ShippingMethodValueVO { return new ShippingMethodValueVO(SHIPPING_METHOD.PICKUP); }
  static localDelivery(): ShippingMethodValueVO { return new ShippingMethodValueVO(SHIPPING_METHOD.LOCAL_DELIVERY); }

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

  isFastTrack(): boolean {
    return [SHIPPING_METHOD.EXPRESS, SHIPPING_METHOD.SAME_DAY, SHIPPING_METHOD.NEXT_DAY, SHIPPING_METHOD.OVERNIGHT].includes(this.value as never);
  }
  isCheap(): boolean { return this.isEconomy() || this.isStandard(); }
  isSelfPickup(): boolean { return this.isPickup(); }
}
