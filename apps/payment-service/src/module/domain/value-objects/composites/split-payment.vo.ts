import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { SplitIdVO } from '../primitives/split-id.vo';
import { SplitAmountVO } from '../primitives/split-amount.vo';
import { SplitPercentageVO } from '../primitives/split-percentage.vo';
import { SplitTypeVO } from '../primitives/split-type.vo';
import { PaymentIdVO } from '../primitives/payment-id.vo';
import { PaymentCurrencyVO } from '../primitives/payment-currency.vo';

export interface SplitPaymentVOProps {
  readonly id: SplitIdVO;
  readonly paymentId: PaymentIdVO;
  readonly type: SplitTypeVO;
  readonly amount: SplitAmountVO;
  readonly percentage: SplitPercentageVO | null;
  readonly recipientId: string;
  readonly currency: PaymentCurrencyVO;
}

export class SplitPaymentVO extends BaseVO<SplitPaymentVOProps> {
  private constructor(props: SplitPaymentVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: SplitPaymentVOProps): SplitPaymentVO {
    return new SplitPaymentVO(props);
  }

  get id(): SplitIdVO { return this.value.id; }
  get paymentId(): PaymentIdVO { return this.value.paymentId; }
  get type(): SplitTypeVO { return this.value.type; }
  get amount(): SplitAmountVO { return this.value.amount; }
  get percentage(): SplitPercentageVO | null { return this.value.percentage; }
  get recipientId(): string { return this.value.recipientId; }
  get currency(): PaymentCurrencyVO { return this.value.currency; }
}
