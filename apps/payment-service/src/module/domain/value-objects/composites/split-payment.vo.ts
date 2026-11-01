/**
 * SplitPayment Value Object (Composite)
 * @module payment-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SplitIdVO } from '@domain/primitives/split-id.vo';
import { SplitTypeVO } from '@domain/primitives/split-type.vo';
import { SplitAmountVO } from '@domain/primitives/split-amount.vo';
import { SplitPercentageVO } from '@domain/primitives/split-percentage.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';

export interface SplitReceiver {
  readonly receiverId: string;
  readonly amount: SplitAmountVO;
  readonly percentage?: SplitPercentageVO;
}

export interface SplitPaymentVOProps {
  readonly id: SplitIdVO;
  readonly paymentId: PaymentIdVO;
  readonly type: SplitTypeVO;
  readonly receivers: readonly SplitReceiver[];
  readonly totalAmount: number;
  readonly currency: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class SplitPaymentVO extends BaseVO<SplitPaymentVOProps> {
  private constructor(props: SplitPaymentVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: SplitPaymentVOProps): SplitPaymentVO {
    const vo = new SplitPaymentVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: SplitPaymentVOProps): SplitPaymentVO {
    return new SplitPaymentVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.receivers.length < 2) {
      throw new ValidationError('SplitPayment requires at least 2 receivers', 'receivers');
    }
    const sum = v.receivers.reduce((s, r) => s + r.amount.amount, 0);
    if (Math.abs(sum - v.totalAmount) > 0.01) {
      throw new ValidationError(
        `SplitPayment sum (${sum}) != total (${v.totalAmount})`,
        'totalAmount',
      );
    }
    if (v.type.isPercentage()) {
      const pctSum = v.receivers.reduce((s, r) => s + (r.percentage?.value ?? 0), 0);
      if (Math.abs(pctSum - 100) > 0.01) {
        throw new ValidationError(
          `SplitPayment percentages must total 100 (got ${pctSum})`,
          'percentage',
        );
      }
    }
  }

  get id(): SplitIdVO { return this.value.id; }
  get paymentId(): PaymentIdVO { return this.value.paymentId; }
  get type(): SplitTypeVO { return this.value.type; }
  get receivers(): readonly SplitReceiver[] { return [...this.value.receivers]; }
  get totalAmount(): number { return this.value.totalAmount; }
  get currency(): string { return this.value.currency; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  receiverCount(): number { return this.value.receivers.length; }
}
