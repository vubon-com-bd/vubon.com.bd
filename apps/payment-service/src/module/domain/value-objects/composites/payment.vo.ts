import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PaymentIdVO } from '../primitives/payment-id.vo';
import { PaymentAmountVO } from '../primitives/payment-amount.vo';
import { PaymentCurrencyVO } from '../primitives/payment-currency.vo';
import { PaymentStatusVO } from '../primitives/payment-status.vo';
import { PaymentTypeVO } from '../primitives/payment-type.vo';
import { PaymentGatewayVO } from '../primitives/payment-gateway.vo';
import { OrderIdVO } from '../primitives/order-id.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface PaymentVOProps {
  readonly id: PaymentIdVO;
  readonly orderId: OrderIdVO;
  readonly userId: UserIdVO;
  readonly type: PaymentTypeVO;
  readonly status: PaymentStatusVO;
  readonly amount: PaymentAmountVO;
  readonly currency: PaymentCurrencyVO;
  readonly gateway: PaymentGatewayVO | null;
}

export class PaymentVO extends BaseVO<PaymentVOProps> {
  private constructor(props: PaymentVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: PaymentVOProps): PaymentVO {
    return new PaymentVO(props);
  }

  get id(): PaymentIdVO { return this.value.id; }
  get orderId(): OrderIdVO { return this.value.orderId; }
  get userId(): UserIdVO { return this.value.userId; }
  get type(): PaymentTypeVO { return this.value.type; }
  get status(): PaymentStatusVO { return this.value.status; }
  get amount(): PaymentAmountVO { return this.value.amount; }
  get currency(): PaymentCurrencyVO { return this.value.currency; }
  get gateway(): PaymentGatewayVO | null { return this.value.gateway; }
}
