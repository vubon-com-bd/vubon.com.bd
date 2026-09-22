import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { RefundIdVO } from '../primitives/refund-id.vo';
import { RefundAmountVO } from '../primitives/refund-amount.vo';
import { RefundReasonVO } from '../primitives/refund-reason.vo';
import { RefundStatusVO } from '../primitives/refund-status.vo';
import { PaymentIdVO } from '../primitives/payment-id.vo';
import { PaymentCurrencyVO } from '../primitives/payment-currency.vo';

export interface RefundVOProps {
  readonly id: RefundIdVO;
  readonly paymentId: PaymentIdVO;
  readonly amount: RefundAmountVO;
  readonly currency: PaymentCurrencyVO;
  readonly reason: RefundReasonVO | null;
  readonly status: RefundStatusVO;
}

export class RefundVO extends BaseVO<RefundVOProps> {
  private constructor(props: RefundVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: RefundVOProps): RefundVO {
    return new RefundVO(props);
  }

  get id(): RefundIdVO { return this.value.id; }
  get paymentId(): PaymentIdVO { return this.value.paymentId; }
  get amount(): RefundAmountVO { return this.value.amount; }
  get currency(): PaymentCurrencyVO { return this.value.currency; }
  get reason(): RefundReasonVO | null { return this.value.reason; }
  get status(): RefundStatusVO { return this.value.status; }
}
