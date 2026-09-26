import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidValueError } from '../../errors/invalid-value.errors';

export class PricingRuleValueVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PricingRuleValueVO {
    const trimmed = raw.trim();
    if (trimmed.length === 0 || trimmed.length > 500) {
      throw new InvalidValueError('pricing_rule_value', 'Pricing rule value must be 1-500 characters');
    }
    return new PricingRuleValueVO(trimmed);
  }

  asNumber(): number {
    const n = Number(this.value);
    if (Number.isNaN(n)) {
      throw new InvalidValueError('pricing_rule_value', `Value is not numeric: ${this.value}`);
    }
    return n;
  }
}
