import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { CancelIdVO } from '../primitives/cancel-id.vo';
import { CancelReasonVO } from '../primitives/cancel-reason.vo';
import { CancelStatusVO } from '../primitives/cancel-status.vo';
import { OrderIdVO } from '../primitives/order-id.vo';
import { CustomerIdVO } from '../primitives/customer-id.vo';

export interface OrderCancelProps {
  readonly id: CancelIdVO;
  readonly orderId: OrderIdVO;
  readonly customerId: CustomerIdVO;
  readonly reason: CancelReasonVO;
  readonly status: CancelStatusVO;
}

export class OrderCancelVO extends BaseVO<OrderCancelProps> {
  private constructor(props: OrderCancelProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: OrderCancelProps): OrderCancelVO {
    return new OrderCancelVO(props);
  }

  get id(): CancelIdVO { return this.value.id; }
  get orderId(): OrderIdVO { return this.value.orderId; }
  get customerId(): CustomerIdVO { return this.value.customerId; }
  get reason(): CancelReasonVO { return this.value.reason; }
  get status(): CancelStatusVO { return this.value.status; }
}
