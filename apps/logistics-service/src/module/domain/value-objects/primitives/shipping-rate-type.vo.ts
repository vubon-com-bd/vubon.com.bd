/**
 * ShippingRateType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { SHIPPING_RATE_TYPE } from '@vubon/shared-constants/logistics';
import { InvalidShippingRateTypeError } from '../../errors/shipping-method.errors.js';

const ALLOWED = Object.values(SHIPPING_RATE_TYPE) as readonly string[];

export class ShippingRateTypeVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): ShippingRateTypeVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidShippingRateTypeError(String(raw));
    }
    return new ShippingRateTypeVO(raw);
  }

  static reconstitute(raw: string): ShippingRateTypeVO { return new ShippingRateTypeVO(raw); }

  static flat(): ShippingRateTypeVO { return new ShippingRateTypeVO(SHIPPING_RATE_TYPE.FLAT); }
  static weightBased(): ShippingRateTypeVO { return new ShippingRateTypeVO(SHIPPING_RATE_TYPE.WEIGHT_BASED); }
  static priceBased(): ShippingRateTypeVO { return new ShippingRateTypeVO(SHIPPING_RATE_TYPE.PRICE_BASED); }
  static quantityBased(): ShippingRateTypeVO { return new ShippingRateTypeVO(SHIPPING_RATE_TYPE.QUANTITY_BASED); }
  static distanceBased(): ShippingRateTypeVO { return new ShippingRateTypeVO(SHIPPING_RATE_TYPE.DISTANCE_BASED); }
  static tiered(): ShippingRateTypeVO { return new ShippingRateTypeVO(SHIPPING_RATE_TYPE.TIERED); }

  isFlat(): boolean { return this.value === SHIPPING_RATE_TYPE.FLAT; }
  isWeightBased(): boolean { return this.value === SHIPPING_RATE_TYPE.WEIGHT_BASED; }
  isPriceBased(): boolean { return this.value === SHIPPING_RATE_TYPE.PRICE_BASED; }
  isQuantityBased(): boolean { return this.value === SHIPPING_RATE_TYPE.QUANTITY_BASED; }
  isDistanceBased(): boolean { return this.value === SHIPPING_RATE_TYPE.DISTANCE_BASED; }
  isTiered(): boolean { return this.value === SHIPPING_RATE_TYPE.TIERED; }

  requiresWeight(): boolean { return this.isWeightBased() || this.isTiered(); }
  requiresDistance(): boolean { return this.isDistanceBased(); }
  requiresOrderValue(): boolean { return this.isPriceBased(); }
  isFixed(): boolean { return this.isFlat(); }
}
