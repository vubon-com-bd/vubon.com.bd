/**
 * ZonePricingType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ZONE_PRICING_TYPE } from '@vubon/shared-constants/logistics';
import { InvalidZonePricingTypeError } from '../../errors/zone.errors.js';

const ALLOWED = Object.values(ZONE_PRICING_TYPE) as readonly string[];

export class ZonePricingTypeVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): ZonePricingTypeVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidZonePricingTypeError(String(raw));
    }
    return new ZonePricingTypeVO(raw);
  }

  static reconstitute(raw: string): ZonePricingTypeVO { return new ZonePricingTypeVO(raw); }

  static flat(): ZonePricingTypeVO { return new ZonePricingTypeVO(ZONE_PRICING_TYPE.FLAT); }
  static weightBased(): ZonePricingTypeVO { return new ZonePricingTypeVO(ZONE_PRICING_TYPE.WEIGHT_BASED); }
  static distanceBased(): ZonePricingTypeVO { return new ZonePricingTypeVO(ZONE_PRICING_TYPE.DISTANCE_BASED); }
  static tiered(): ZonePricingTypeVO { return new ZonePricingTypeVO(ZONE_PRICING_TYPE.TIERED); }
  static zoneBased(): ZonePricingTypeVO { return new ZonePricingTypeVO(ZONE_PRICING_TYPE.ZONE_BASED); }

  isFlat(): boolean { return this.value === ZONE_PRICING_TYPE.FLAT; }
  isWeightBased(): boolean { return this.value === ZONE_PRICING_TYPE.WEIGHT_BASED; }
  isDistanceBased(): boolean { return this.value === ZONE_PRICING_TYPE.DISTANCE_BASED; }
  isTiered(): boolean { return this.value === ZONE_PRICING_TYPE.TIERED; }
  isZoneBased(): boolean { return this.value === ZONE_PRICING_TYPE.ZONE_BASED; }

  /** Price depends on package weight. */
  requiresWeight(): boolean { return this.isWeightBased() || this.isTiered(); }

  /** Price depends on origin↔destination distance. */
  requiresDistance(): boolean { return this.isDistanceBased(); }

  /** Same price regardless of weight/size. */
  isFixedPrice(): boolean { return this.isFlat() || this.isZoneBased(); }
}
