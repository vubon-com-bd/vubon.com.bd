import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { OrderVO } from './order.vo';
import { OrderItemVO } from './order-item.vo';

export interface OrderSnapshotProps {
  readonly order: OrderVO;
  readonly items: readonly OrderItemVO[];
  readonly capturedAt: Date;
}

/**
 * Immutable snapshot for event sourcing / audit.
 * Used for order state at a point in time.
 */
export class OrderSnapshotVO extends BaseVO<OrderSnapshotProps> {
  private constructor(props: OrderSnapshotProps) {
    super(Object.freeze({
      ...props,
      items: Object.freeze([...props.items]),
    }));
  }

  static create(props: OrderSnapshotProps): OrderSnapshotVO {
    return new OrderSnapshotVO(props);
  }

  get order(): OrderVO { return this.value.order; }
  get items(): readonly OrderItemVO[] { return this.value.items; }
  get capturedAt(): Date { return this.value.capturedAt; }
}
