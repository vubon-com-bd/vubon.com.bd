/**
 * PricingRuleType Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { PRICING_TYPE } from '@vubon/shared-constants/business';

export type PricingRuleTypeValue = (typeof PRICING_TYPE)[keyof typeof PRICING_TYPE];

const VALID: readonly string[] = Object.values(PRICING_TYPE);

export class PricingRuleTypeVO extends BaseTypeVO<PricingRuleTypeValue> {
  private constructor(value: PricingRuleTypeValue) { super(value); }

  protected static override allowedValues(): ReadonlySet<string> {
    return new Set(VALID);
  }

  static create(raw: string): PricingRuleTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('PricingRuleType must be a string', 'pricingType');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID.includes(normalized)) {
      throw new ValidationError(
        `Invalid PricingRuleType: "${normalized}". Allowed: ${VALID.join(', ')}`,
        'pricingType',
      );
    }
    return new PricingRuleTypeVO(normalized as PricingRuleTypeValue);
  }

  static reconstitute(raw: string): PricingRuleTypeVO {
    return new PricingRuleTypeVO(raw as PricingRuleTypeValue);
  }

  isFixed(): boolean { return this.value === PRICING_TYPE.FIXED; }
  isDynamic(): boolean { return this.value === PRICING_TYPE.DYNAMIC; }
  isTiered(): boolean { return this.value === PRICING_TYPE.TIERED; }
  isAuction(): boolean { return this.value === PRICING_TYPE.AUCTION; }
  isNegotiable(): boolean { return this.value === PRICING_TYPE.NEGOTIABLE; }
}
