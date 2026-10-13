/**
 * ProductPricingRule Composite Value Object
 * @module product-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { PricingRuleIdVO } from '../primitives/pricing-rule-id.vo.js';
import { PricingRuleTypeVO } from '../primitives/pricing-rule-type.vo.js';
import { PricingRuleValueVO } from '../primitives/pricing-rule-value.vo.js';

export interface ProductPricingRuleVOProps {
  readonly id: PricingRuleIdVO;
  readonly name: string;
  readonly type: PricingRuleTypeVO;
  readonly ruleValue: PricingRuleValueVO;
  readonly conditions: Readonly<Record<string, unknown>>;
  readonly isActive: boolean;
  readonly priority: number;
}

export class ProductPricingRuleVO extends BaseVO<ProductPricingRuleVOProps> {
  private constructor(props: ProductPricingRuleVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: ProductPricingRuleVOProps): ProductPricingRuleVO {
    const vo = new ProductPricingRuleVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: ProductPricingRuleVOProps): ProductPricingRuleVO {
    return new ProductPricingRuleVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (typeof v.name !== 'string' || v.name.trim().length === 0) {
      throw new ValidationError('PricingRule name cannot be empty', 'name');
    }
    if (!Number.isInteger(v.priority) || v.priority < 0) {
      throw new ValidationError('PricingRule priority must be a non-negative integer', 'priority');
    }
    if (typeof v.conditions !== 'object' || v.conditions === null) {
      throw new ValidationError('PricingRule conditions must be an object', 'conditions');
    }
  }

  get id(): PricingRuleIdVO { return this.value.id; }
  get name(): string { return this.value.name; }
  get type(): PricingRuleTypeVO { return this.value.type; }
  get ruleValue(): PricingRuleValueVO { return this.value.ruleValue; }
  get conditions(): Readonly<Record<string, unknown>> { return this.value.conditions; }
  get isActive(): boolean { return this.value.isActive; }
  get priority(): number { return this.value.priority; }

  isApplicable(basePrice: number): boolean {
    return this.isActive && basePrice > 0;
  }

  apply(basePrice: number): number {
    if (!this.isApplicable(basePrice)) return basePrice;
    return this.ruleValue.applyOn(basePrice);
  }
}
