import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { DeliveryIdVO } from '../primitives/delivery-id.vo';
import { DeliveryStatusVO } from '../primitives/delivery-status.vo';
import { DeliveryTypeVO } from '../primitives/delivery-type.vo';
import { OrderIdVO } from '../primitives/order-id.vo';
import { DeliveryMethodIdVO } from '../primitives/delivery-method-id.vo';

export interface DeliveryProps {
  readonly id: DeliveryIdVO;
  readonly orderId: OrderIdVO;
  readonly status: DeliveryStatusVO;
  readonly type: DeliveryTypeVO;
  readonly methodId: DeliveryMethodIdVO | null;
}

export class DeliveryVO extends BaseVO<DeliveryProps> {
  private constructor(props: DeliveryProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: DeliveryProps): DeliveryVO {
    return new DeliveryVO(props);
  }

  get id(): DeliveryIdVO { return this.value.id; }
  get orderId(): OrderIdVO { return this.value.orderId; }
  get status(): DeliveryStatusVO { return this.value.status; }
  get type(): DeliveryTypeVO { return this.value.type; }
  get methodId(): DeliveryMethodIdVO | null { return this.value.methodId; }
}
