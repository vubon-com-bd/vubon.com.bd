import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { HistoryIdVO } from '../primitives/history-id.vo';
import { HistoryTypeVO } from '../primitives/history-type.vo';
import { OrderIdVO } from '../primitives/order-id.vo';

export interface OrderHistoryProps {
  readonly id: HistoryIdVO;
  readonly orderId: OrderIdVO;
  readonly type: HistoryTypeVO;
  readonly payload: Readonly<Record<string, unknown>>;
  readonly occurredAt: Date;
}

export class OrderHistoryVO extends BaseVO<OrderHistoryProps> {
  private constructor(props: OrderHistoryProps) {
    super(Object.freeze({
      ...props,
      payload: Object.freeze({ ...props.payload }),
    }));
  }

  static create(props: OrderHistoryProps): OrderHistoryVO {
    return new OrderHistoryVO(props);
  }

  get id(): HistoryIdVO { return this.value.id; }
  get orderId(): OrderIdVO { return this.value.orderId; }
  get type(): HistoryTypeVO { return this.value.type; }
  get payload(): Readonly<Record<string, unknown>> { return this.value.payload; }
  get occurredAt(): Date { return this.value.occurredAt; }
}
