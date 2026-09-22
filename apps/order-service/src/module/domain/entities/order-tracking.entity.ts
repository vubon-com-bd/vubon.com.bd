import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { TrackingIdVO } from '../value-objects/primitives/tracking-id.vo';
import { TrackingStatusVO } from '../value-objects/primitives/tracking-status.vo';
import { TrackingNumberVO } from '../value-objects/primitives/tracking-number.vo';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';

export interface OrderTrackingEntityProps {
  readonly orderId: OrderIdVO;
  readonly status: TrackingStatusVO;
  readonly trackingNumber: TrackingNumberVO | null;
  readonly carrier: string | null;
  readonly events: ReadonlyArray<Record<string, unknown>>;
}

export class OrderTrackingEntity extends BaseEntity<TrackingIdVO> {
  private readonly _orderId: OrderIdVO;
  private readonly _status: TrackingStatusVO;
  private readonly _trackingNumber: TrackingNumberVO | null;
  private readonly _carrier: string | null;
  private readonly _events: ReadonlyArray<Record<string, unknown>>;

  private constructor(
    id: TrackingIdVO,
    props: OrderTrackingEntityProps,
    createdAt: string,
    updatedAt: string,
  ) {
    super(id, createdAt, updatedAt);
    this._orderId = props.orderId;
    this._status = props.status;
    this._trackingNumber = props.trackingNumber;
    this._carrier = props.carrier;
    this._events = Object.freeze([...props.events]);
  }

  static create(props: OrderTrackingEntityProps): OrderTrackingEntity {
    const now = new Date().toISOString();
    const id = TrackingIdVO.create(crypto.randomUUID());
    return new OrderTrackingEntity(id, props, now, now);
  }

  static reconstitute(
    id: TrackingIdVO,
    props: OrderTrackingEntityProps,
    createdAt: string,
    updatedAt: string,
  ): OrderTrackingEntity {
    return new OrderTrackingEntity(id, props, createdAt, updatedAt);
  }

  changeStatus(status: TrackingStatusVO): OrderTrackingEntity {
    return new OrderTrackingEntity(
      this.id,
      { ...this._toProps(), status },
      this.createdAt,
      new Date().toISOString(),
    );
  }

  get orderId(): OrderIdVO { return this._orderId; }
  get status(): TrackingStatusVO { return this._status; }
  get trackingNumber(): TrackingNumberVO | null { return this._trackingNumber; }
  get carrier(): string | null { return this._carrier; }
  get events(): ReadonlyArray<Record<string, unknown>> { return this._events; }

  private _toProps(): OrderTrackingEntityProps {
    return {
      orderId: this._orderId,
      status: this._status,
      trackingNumber: this._trackingNumber,
      carrier: this._carrier,
      events: this._events,
    };
  }
}
