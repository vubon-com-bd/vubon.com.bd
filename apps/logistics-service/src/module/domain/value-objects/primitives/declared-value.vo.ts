/**
 * DeclaredValue Value Object — declared value for insurance
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { MoneyVO } from '@vubon/shared-kernel/domain/primitives';
import { SHIPMENT } from '@vubon/shared-constants/logistics';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class DeclaredValueVO extends BaseVO<MoneyVO> {
  private static readonly MAX = SHIPMENT.MAX_DECLARED_VALUE;

  private constructor(value: MoneyVO) { super(value); }

  static create(amount: number, currency: string): DeclaredValueVO {
    if (amount > DeclaredValueVO.MAX) {
      throw new ValidationError(`Declared value exceeds maximum ${DeclaredValueVO.MAX}`, 'declaredValue');
    }
    return new DeclaredValueVO(MoneyVO.of(amount, currency as never));
  }

  static reconstitute(amount: number, currency: string): DeclaredValueVO {
    return new DeclaredValueVO(MoneyVO.of(amount, currency as never));
  }

  get amount(): number { return this.value.amount; }
  get currency(): string { return this.value.currency; }

  isZero(): boolean { return this.value.amount === 0; }
  isAboveInsuranceThreshold(): boolean { return this.value.amount >= 1000; }
  static max(): number { return DeclaredValueVO.MAX; }
}
