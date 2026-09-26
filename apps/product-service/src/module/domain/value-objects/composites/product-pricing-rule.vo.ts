import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PricingRuleIdVO } from '../primitives/pricing-rule-id.vo';
import { PricingRuleTypeVO } from '../primitives/pricing-rule-type.vo';
import { PricingRuleValueVO } from '../primitives/pricing-rule-value.vo';

export interface ProductPricingRuleProps {
  readonly ruleId: PricingRuleIdVO;
  readonly ruleType: PricingRuleTypeVO;
  readonly ruleValue: PricingRuleValueVO;
  readonly ruleActive: boolean;
}

export class ProductPricingRuleVO extends BaseVO<ProductPricingRuleProps> {
  private constructor(props: ProductPricingRuleProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: ProductPricingRuleProps): ProductPricingRuleVO {
    return new ProductPricingRuleVO(props);
  }

  get ruleId(): PricingRuleIdVO { return this.value.ruleId; }
  get ruleType(): PricingRuleTypeVO { return this.value.ruleType; }
  get ruleValue(): PricingRuleValueVO { return this.value.ruleValue; }
  get ruleActive(): boolean { return this.value.ruleActive; }
}
