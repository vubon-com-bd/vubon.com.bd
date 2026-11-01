/**
 * ShippingRateType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SHIPPING_RATE_TYPE } from '@vubon/shared-constants/logistics';

export type ShippingRateTypeValue =
  (typeof SHIPPING_RATE_TYPE)[keyof typeof SHIPPING_RATE_TYPE];

const VALID_RATE_TYPES: readonly string[] = Object.values(SHIPPING_RATE_TYPE);

export class ShippingRateTypeVO extends BaseVO<ShippingRateTypeValue> {
  private constructor(value: ShippingRateTypeValue) {
    super(value);
  }

  static create(raw: string): ShippingRateTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ShippingRateType must be a string', 'rateType');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_RATE_TYPES.includes(normalized)) {
      throw new ValidationError(
        `Invalid ShippingRateType: "${normalized}". Allowed: ${VALID_RATE_TYPES.join(', ')}`,
        'rateType',
      );
    }
    return new ShippingRateTypeVO(normalized as ShippingRateTypeValue);
  }

  static reconstitute(raw: string): ShippingRateTypeVO {
    return new ShippingRateTypeVO(raw as ShippingRateTypeValue);
  }

  isFlat(): boolean { return this.value === SHIPPING_RATE_TYPE.FLAT; }
  isWeightBased(): boolean { return this.value === SHIPPING_RATE_TYPE.WEIGHT_BASED; }
  isPriceBased(): boolean { return this.value === SHIPPING_RATE_TYPE.PRICE_BASED; }
  isQuantityBased(): boolean { return this.value === SHIPPING_RATE_TYPE.QUANTITY_BASED; }
  isDistanceBased(): boolean { return this.value === SHIPPING_RATE_TYPE.DISTANCE_BASED; }
  isTiered(): boolean { return this.value === SHIPPING_RATE_TYPE.TIERED; }
}
