/**
 * DistanceSurcharge Value Object — remote/weight surcharge money
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { MoneyVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class DistanceSurchargeVO extends BaseVO<MoneyVO> {
  private constructor(value: MoneyVO) { super(value); }

  static create(amount: number, currency: string): DistanceSurchargeVO {
    if (amount < 0) {
      throw new ValidationError('Surcharge cannot be negative', 'surcharge');
    }
    return new DistanceSurchargeVO(MoneyVO.of(amount, currency as never));
  }

  static reconstitute(amount: number, currency: string): DistanceSurchargeVO {
    return new DistanceSurchargeVO(MoneyVO.of(amount, currency as never));
  }

  static zero(currency: string): DistanceSurchargeVO {
    return new DistanceSurchargeVO(MoneyVO.of(0, currency as never));
  }

  get amount(): number { return this.value.amount; }
  get currency(): string { return this.value.currency; }

  isZero(): boolean { return this.value.amount === 0; }
}
