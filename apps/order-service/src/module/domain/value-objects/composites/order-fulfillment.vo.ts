import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { FulfillmentIdVO } from '../primitives/fulfillment-id.vo';
import { FulfillmentStatusVO } from '../primitives/fulfillment-status.vo';
import { OrderIdVO } from '../primitives/order-id.vo';
import { VendorIdVO } from '../primitives/vendor-id.vo';

export interface OrderFulfillmentProps {
  readonly id: FulfillmentIdVO;
  readonly orderId: OrderIdVO;
  readonly vendorId: VendorIdVO | null;
  readonly status: FulfillmentStatusVO;
}

export class OrderFulfillmentVO extends BaseVO<OrderFulfillmentProps> {
  private constructor(props: OrderFulfillmentProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: OrderFulfillmentProps): OrderFulfillmentVO {
    return new OrderFulfillmentVO(props);
  }

  get id(): FulfillmentIdVO { return this.value.id; }
  get orderId(): OrderIdVO { return this.value.orderId; }
  get vendorId(): VendorIdVO | null { return this.value.vendorId; }
  get status(): FulfillmentStatusVO { return this.value.status; }
}
