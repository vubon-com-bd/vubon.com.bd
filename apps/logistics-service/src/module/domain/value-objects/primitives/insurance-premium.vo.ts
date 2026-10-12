/**
 * InsurancePremium Value Object — calculated premium
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { MoneyVO } from '@vubon/shared-kernel/domain/primitives';
import { INSURANCE } from '@vubon/shared-constants/logistics';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class InsurancePremiumVO extends BaseVO<MoneyVO> {
  private constructor(value: MoneyVO) { super(value); }

  /** Calculate premium from declared value and type percent. */
  static calculate(declaredAmount: number, premiumPercent: number, currency: string): InsurancePremiumVO {
    if (!Number.isFinite(declaredAmount) || declaredAmount <= 0) {
      throw new ValidationError('Declared amount must be positive', 'declaredAmount');
    }
    if (!Number.isFinite(premiumPercent) || premiumPercent <= 0) {
      throw new ValidationError('Premium percent must be positive', 'premiumPercent');
    }
    const premium = Math.round(((declaredAmount * premiumPercent) / 100) * 100) / 100;
    return new InsurancePremiumVO(MoneyVO.of(premium, currency as never));
  }

  static create(amount: number, currency: string): InsurancePremiumVO {
    return new InsurancePremiumVO(MoneyVO.of(amount, currency as never));
  }

  static reconstitute(amount: number, currency: string): InsurancePremiumVO {
    return new InsurancePremiumVO(MoneyVO.of(amount, currency as never));
  }

  get amount(): number { return this.value.amount; }
  get currency(): string { return this.value.currency; }

  static minValue(): number { return INSURANCE.MIN_VALUE; }
  static maxValue(): number { return INSURANCE.MAX_VALUE; }
}
