import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { TrackingIdVO } from '../primitives/tracking-id.vo';
import { TrackingStatusVO } from '../primitives/tracking-status.vo';
import { TrackingNumberVO } from '../primitives/tracking-number.vo';
import { OrderIdVO } from '../primitives/order-id.vo';

export interface OrderTrackingProps {
  readonly id: TrackingIdVO;
  readonly orderId: OrderIdVO;
  readonly status: TrackingStatusVO;
  readonly trackingNumber: TrackingNumberVO | null;
  readonly carrier: string | null;
}

export class OrderTrackingVO extends BaseVO<OrderTrackingProps> {
  private constructor(props: OrderTrackingProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: OrderTrackingProps): OrderTrackingVO {
    return new OrderTrackingVO(props);
  }

  get id(): TrackingIdVO { return this.value.id; }
  get orderId(): OrderIdVO { return this.value.orderId; }
  get status(): TrackingStatusVO { return this.value.status; }
  get trackingNumber(): TrackingNumberVO | null { return this.value.trackingNumber; }
  get carrier(): string | null { return this.value.carrier; }
}
