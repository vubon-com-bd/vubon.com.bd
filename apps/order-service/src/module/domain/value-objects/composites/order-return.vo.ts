import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ReturnIdVO } from '../primitives/return-id.vo';
import { ReturnReasonVO } from '../primitives/return-reason.vo';
import { ReturnStatusVO } from '../primitives/return-status.vo';
import { OrderIdVO } from '../primitives/order-id.vo';
import { CustomerIdVO } from '../primitives/customer-id.vo';

export interface OrderReturnProps {
  readonly id: ReturnIdVO;
  readonly orderId: OrderIdVO;
  readonly customerId: CustomerIdVO;
  readonly reason: ReturnReasonVO;
  readonly status: ReturnStatusVO;
}

export class OrderReturnVO extends BaseVO<OrderReturnProps> {
  private constructor(props: OrderReturnProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: OrderReturnProps): OrderReturnVO {
    return new OrderReturnVO(props);
  }

  get id(): ReturnIdVO { return this.value.id; }
  get orderId(): OrderIdVO { return this.value.orderId; }
  get customerId(): CustomerIdVO { return this.value.customerId; }
  get reason(): ReturnReasonVO { return this.value.reason; }
  get status(): ReturnStatusVO { return this.value.status; }
}
