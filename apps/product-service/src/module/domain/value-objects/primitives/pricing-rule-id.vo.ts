/**
 * PricingRuleId Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class PricingRuleIdVO extends BaseIdVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): PricingRuleIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('PricingRuleId cannot be empty', 'pricingRuleId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('PricingRuleId must be a valid UUID', 'pricingRuleId');
    }
    return new PricingRuleIdVO(trimmed);
  }

  static reconstitute(raw: string): PricingRuleIdVO { return new PricingRuleIdVO(raw); }
}
