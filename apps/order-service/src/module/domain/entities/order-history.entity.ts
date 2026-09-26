import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { HistoryIdVO } from '../value-objects/primitives/history-id.vo';
import { HistoryTypeVO } from '../value-objects/primitives/history-type.vo';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';

export interface OrderHistoryEntityProps {
  readonly orderId: OrderIdVO;
  readonly type: HistoryTypeVO;
  readonly payload: Readonly<Record<string, unknown>>;
}

export class OrderHistoryEntity extends BaseEntity<HistoryIdVO> {
  private readonly _orderId: OrderIdVO;
  private readonly _type: HistoryTypeVO;
  private readonly _payload: Readonly<Record<string, unknown>>;

  private constructor(
    id: HistoryIdVO,
    props: OrderHistoryEntityProps,
    createdAt: string,
    updatedAt: string,
  ) {
    super(id, createdAt, updatedAt);
    this._orderId = props.orderId;
    this._type = props.type;
    this._payload = Object.freeze({ ...props.payload });
  }

  static create(props: OrderHistoryEntityProps): OrderHistoryEntity {
    const now = new Date().toISOString();
    const id = HistoryIdVO.create(crypto.randomUUID());
    return new OrderHistoryEntity(id, props, now, now);
  }

  static reconstitute(
    id: HistoryIdVO,
    props: OrderHistoryEntityProps,
    createdAt: string,
    updatedAt: string,
  ): OrderHistoryEntity {
    return new OrderHistoryEntity(id, props, createdAt, updatedAt);
  }

  get orderId(): OrderIdVO { return this._orderId; }
  get type(): HistoryTypeVO { return this._type; }
  get payload(): Readonly<Record<string, unknown>> { return this._payload; }
}
