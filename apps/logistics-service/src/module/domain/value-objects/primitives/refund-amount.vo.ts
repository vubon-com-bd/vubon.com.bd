/**
 * RefundAmount Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { MoneyVO } from '@vubon/shared-kernel/domain/primitives';
import { RETURN_SHIPMENT } from '@vubon/shared-constants/logistics';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class RefundAmountVO extends BaseVO<MoneyVO> {
  private static readonly MAX = RETURN_SHIPMENT.MAX_RETURN_VALUE;

  private constructor(value: MoneyVO) { super(value); }

  static create(amount: number, currency: string): RefundAmountVO {
    if (amount < 0) {
      throw new ValidationError('Refund amount cannot be negative', 'refundAmount');
    }
    if (amount > RefundAmountVO.MAX) {
      throw new ValidationError(`Refund amount exceeds max ${RefundAmountVO.MAX}`, 'refundAmount');
    }
    return new RefundAmountVO(MoneyVO.of(amount, currency as never));
  }

  static reconstitute(amount: number, currency: string): RefundAmountVO {
    return new RefundAmountVO(MoneyVO.of(amount, currency as never));
  }

  get amount(): number { return this.value.amount; }
  get currency(): string { return this.value.currency; }

  /** Apply restock fee. */
  applyRestockFee(feePercent: number): RefundAmountVO {
    if (!Number.isFinite(feePercent) || feePercent < 0 || feePercent > 100) {
      throw new ValidationError('Fee percent must be 0-100', 'feePercent');
    }
    const net = Math.round((this.value.amount * (1 - feePercent / 100)) * 100) / 100;
    return RefundAmountVO.reconstitute(net, this.value.currency);
  }

  static max(): number { return RefundAmountVO.MAX; }
}
