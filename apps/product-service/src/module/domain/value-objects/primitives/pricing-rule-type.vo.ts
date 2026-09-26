import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidValueError } from '../../errors/invalid-value.errors';

const VALID = new Set<string>([
  'discount',
  'markup',
  'tiered',
  'bogo',
  'flash_sale',
]);

export class PricingRuleTypeVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PricingRuleTypeVO {
    if (!VALID.has(raw)) {
      throw new InvalidValueError('pricing_rule_type', `Invalid pricing rule type: ${raw}`);
    }
    return new PricingRuleTypeVO(raw);
  }
}
