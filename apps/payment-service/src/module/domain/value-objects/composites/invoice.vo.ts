import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvoiceIdVO } from '../primitives/invoice-id.vo';
import { InvoiceNumberVO } from '../primitives/invoice-number.vo';
import { InvoiceStatusVO } from '../primitives/invoice-status.vo';
import { InvoiceAmountVO } from '../primitives/invoice-amount.vo';
import { OrderIdVO } from '../primitives/order-id.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { PaymentCurrencyVO } from '../primitives/payment-currency.vo';

export interface InvoiceVOProps {
  readonly id: InvoiceIdVO;
  readonly number: InvoiceNumberVO;
  readonly status: InvoiceStatusVO;
  readonly amount: InvoiceAmountVO;
  readonly currency: PaymentCurrencyVO;
  readonly orderId: OrderIdVO | null;
  readonly userId: UserIdVO | null;
}

export class InvoiceVO extends BaseVO<InvoiceVOProps> {
  private constructor(props: InvoiceVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: InvoiceVOProps): InvoiceVO {
    return new InvoiceVO(props);
  }

  get id(): InvoiceIdVO { return this.value.id; }
  get number(): InvoiceNumberVO { return this.value.number; }
  get status(): InvoiceStatusVO { return this.value.status; }
  get amount(): InvoiceAmountVO { return this.value.amount; }
  get currency(): PaymentCurrencyVO { return this.value.currency; }
  get orderId(): OrderIdVO | null { return this.value.orderId; }
  get userId(): UserIdVO | null { return this.value.userId; }
}
