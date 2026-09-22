import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { TransactionIdVO } from '../primitives/transaction-id.vo';
import { TransactionTypeVO } from '../primitives/transaction-type.vo';
import { TransactionStatusVO } from '../primitives/transaction-status.vo';
import { PaymentIdVO } from '../primitives/payment-id.vo';
import { PaymentAmountVO } from '../primitives/payment-amount.vo';
import { PaymentCurrencyVO } from '../primitives/payment-currency.vo';

export interface TransactionVOProps {
  readonly id: TransactionIdVO;
  readonly paymentId: PaymentIdVO;
  readonly type: TransactionTypeVO;
  readonly status: TransactionStatusVO;
  readonly amount: PaymentAmountVO;
  readonly currency: PaymentCurrencyVO;
}

export class TransactionVO extends BaseVO<TransactionVOProps> {
  private constructor(props: TransactionVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: TransactionVOProps): TransactionVO {
    return new TransactionVO(props);
  }

  get id(): TransactionIdVO { return this.value.id; }
  get paymentId(): PaymentIdVO { return this.value.paymentId; }
  get type(): TransactionTypeVO { return this.value.type; }
  get status(): TransactionStatusVO { return this.value.status; }
  get amount(): PaymentAmountVO { return this.value.amount; }
  get currency(): PaymentCurrencyVO { return this.value.currency; }
}
