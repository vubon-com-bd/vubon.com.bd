import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidValueError } from '../../errors/invalid-value.errors';

export class PricingRuleIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PricingRuleIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new InvalidValueError('pricing_rule_id', 'PricingRuleId cannot be empty');
    }
    return new PricingRuleIdVO(raw);
  }
}
