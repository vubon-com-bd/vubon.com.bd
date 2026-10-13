/**
 * PricingRuleValue Value Object
 * @module product-service/domain/value-objects/primitives
 *
 * Rule value — percent বা fixed amount (positive)।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface PricingRuleValueProps {
  readonly amount: number;
  readonly isPercent: boolean;
}

const MAX_PERCENT = 100;

export class PricingRuleValueVO extends BaseVO<PricingRuleValueProps> {
  private constructor(value: PricingRuleValueProps) { super(value); }

  static create(props: PricingRuleValueProps): PricingRuleValueVO {
    if (!Number.isFinite(props.amount)) {
      throw new ValidationError('PricingRuleValue amount must be finite', 'value');
    }
    if (props.amount < 0) {
      throw new ValidationError('PricingRuleValue cannot be negative', 'value');
    }
    if (props.isPercent && props.amount > MAX_PERCENT) {
      throw new ValidationError(
        `PricingRuleValue percent cannot exceed ${MAX_PERCENT}`,
        'value',
      );
    }
    return new PricingRuleValueVO({
      amount: Math.round(props.amount * 100) / 100,
      isPercent: !!props.isPercent,
    });
  }

  static reconstitute(props: PricingRuleValueProps): PricingRuleValueVO {
    return new PricingRuleValueVO(props);
  }

  get amount(): number { return this.value.amount; }
  get isPercent(): boolean { return this.value.isPercent; }

  applyOn(base: number): number {
    if (this.isPercent) {
      return Math.round((base - (base * this.amount) / 100) * 100) / 100;
    }
    return Math.max(0, Math.round((base - this.amount) * 100) / 100);
  }
}
