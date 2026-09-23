import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { FulfillmentIdVO } from '../primitives/fulfillment-id.vo';
import { FulfillmentStatusVO } from '../primitives/fulfillment-status.vo';
import { FulfillmentTypeVO } from '../primitives/fulfillment-type.vo';
import { OrderIdVO } from '../primitives/order-id.vo';
import { WarehouseIdVO } from '../primitives/warehouse-id.vo';

export interface FulfillmentProps {
  readonly id: FulfillmentIdVO;
  readonly orderId: OrderIdVO;
  readonly warehouseId: WarehouseIdVO;
  readonly status: FulfillmentStatusVO;
  readonly type: FulfillmentTypeVO;
}

export class FulfillmentVO extends BaseVO<FulfillmentProps> {
  private constructor(props: FulfillmentProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: FulfillmentProps): FulfillmentVO {
    return new FulfillmentVO(props);
  }

  get id(): FulfillmentIdVO { return this.value.id; }
  get orderId(): OrderIdVO { return this.value.orderId; }
  get warehouseId(): WarehouseIdVO { return this.value.warehouseId; }
  get status(): FulfillmentStatusVO { return this.value.status; }
  get type(): FulfillmentTypeVO { return this.value.type; }
}
