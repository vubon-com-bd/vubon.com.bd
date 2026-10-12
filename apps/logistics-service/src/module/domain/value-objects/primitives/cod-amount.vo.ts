/**
 * CodAmount Value Object — Cash-on-Delivery amount
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { MoneyVO } from '@vubon/shared-kernel/domain/primitives';
import { ZONE } from '@vubon/shared-constants/logistics';
import { ShipmentCodAmountExceededError } from '../../errors/shipment.errors.js';

export class CodAmountVO extends BaseVO<MoneyVO> {
  private static readonly MAX = ZONE.COD_MAX_AMOUNT;

  private constructor(value: MoneyVO) { super(value); }

  static create(amount: number, currency: string): CodAmountVO {
    if (amount > CodAmountVO.MAX) {
      throw new ShipmentCodAmountExceededError(amount, CodAmountVO.MAX);
    }
    return new CodAmountVO(MoneyVO.of(amount, currency as never));
  }

  static reconstitute(amount: number, currency: string): CodAmountVO {
    return new CodAmountVO(MoneyVO.of(amount, currency as never));
  }

  static zero(currency: string): CodAmountVO {
    return new CodAmountVO(MoneyVO.of(0, currency as never));
  }

  get amount(): number { return this.value.amount; }
  get currency(): string { return this.value.currency; }

  isZero(): boolean { return this.value.amount === 0; }
  isAboveThreshold(): boolean { return this.value.amount > 0; }
  static max(): number { return CodAmountVO.MAX; }
}
