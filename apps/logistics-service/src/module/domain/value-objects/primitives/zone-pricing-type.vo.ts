/**
 * ZonePricingType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ZONE_PRICING_TYPE } from '@vubon/shared-constants/logistics';

export type ZonePricingTypeValue =
  (typeof ZONE_PRICING_TYPE)[keyof typeof ZONE_PRICING_TYPE];

const VALID_PRICING_TYPES: readonly string[] = Object.values(ZONE_PRICING_TYPE);

export class ZonePricingTypeVO extends BaseVO<ZonePricingTypeValue> {
  private constructor(value: ZonePricingTypeValue) {
    super(value);
  }

  static create(raw: string): ZonePricingTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ZonePricingType must be a string', 'pricingType');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_PRICING_TYPES.includes(normalized)) {
      throw new ValidationError(
        `Invalid ZonePricingType: "${normalized}". Allowed: ${VALID_PRICING_TYPES.join(', ')}`,
        'pricingType',
      );
    }
    return new ZonePricingTypeVO(normalized as ZonePricingTypeValue);
  }

  static reconstitute(raw: string): ZonePricingTypeVO {
    return new ZonePricingTypeVO(raw as ZonePricingTypeValue);
  }

  isFlat(): boolean { return this.value === ZONE_PRICING_TYPE.FLAT; }
  isWeightBased(): boolean { return this.value === ZONE_PRICING_TYPE.WEIGHT_BASED; }
  isDistanceBased(): boolean { return this.value === ZONE_PRICING_TYPE.DISTANCE_BASED; }
  isTiered(): boolean { return this.value === ZONE_PRICING_TYPE.TIERED; }
  isZoneBased(): boolean { return this.value === ZONE_PRICING_TYPE.ZONE_BASED; }
}
