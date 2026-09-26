import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { OrderIdVO } from '../primitives/order-id.vo';
import { OrderNumberVO } from '../primitives/order-number.vo';
import { OrderStatusVO } from '../primitives/order-status.vo';
import { CustomerIdVO } from '../primitives/customer-id.vo';
import { VendorIdVO } from '../primitives/vendor-id.vo';
import { OrderTotalBreakdownVO } from './order-total-breakdown.vo';

export interface OrderProps {
  readonly id: OrderIdVO;
  readonly orderNumber: OrderNumberVO;
  readonly customerId: CustomerIdVO;
  readonly vendorId: VendorIdVO | null;
  readonly status: OrderStatusVO;
  readonly total: OrderTotalBreakdownVO;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export class OrderVO extends BaseVO<OrderProps> {
  private constructor(props: OrderProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: OrderProps): OrderVO {
    return new OrderVO(props);
  }

  get id(): OrderIdVO { return this.value.id; }
  get orderNumber(): OrderNumberVO { return this.value.orderNumber; }
  get customerId(): CustomerIdVO { return this.value.customerId; }
  get vendorId(): VendorIdVO | null { return this.value.vendorId; }
  get status(): OrderStatusVO { return this.value.status; }
  get total(): OrderTotalBreakdownVO { return this.value.total; }
  get createdAt(): Date { return this.value.createdAt; }
  get updatedAt(): Date { return this.value.updatedAt; }
}
