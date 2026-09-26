import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { FulfillmentIdVO } from '../value-objects/primitives/fulfillment-id.vo';
import { FulfillmentStatusVO } from '../value-objects/primitives/fulfillment-status.vo';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';
import {
  FulfillmentStartedEvent,
  FulfillmentPackedEvent,
  FulfillmentShippedEvent,
  FulfillmentCompletedEvent,
} from '../events/order-fulfillment.events';

export interface OrderFulfillmentEntityProps {
  readonly orderId: OrderIdVO;
  readonly vendorId: VendorIdVO | null;
  readonly status: FulfillmentStatusVO;
  readonly startedAt: Date | null;
  readonly packedAt: Date | null;
  readonly shippedAt: Date | null;
  readonly completedAt: Date | null;
}

export class OrderFulfillmentEntity extends AggregateRoot<FulfillmentIdVO> {
  private readonly _orderId: OrderIdVO;
  private readonly _vendorId: VendorIdVO | null;
  private readonly _status: FulfillmentStatusVO;
  private readonly _startedAt: Date | null;
  private readonly _packedAt: Date | null;
  private readonly _shippedAt: Date | null;
  private readonly _completedAt: Date | null;

  private constructor(
    id: FulfillmentIdVO,
    props: OrderFulfillmentEntityProps,
    createdAt: string,
    updatedAt: string,
  ) {
    super(id, createdAt, updatedAt);
    this._orderId = props.orderId;
    this._vendorId = props.vendorId;
    this._status = props.status;
    this._startedAt = props.startedAt;
    this._packedAt = props.packedAt;
    this._shippedAt = props.shippedAt;
    this._completedAt = props.completedAt;
  }

  static create(props: OrderFulfillmentEntityProps): OrderFulfillmentEntity {
    const now = new Date();
    const id = FulfillmentIdVO.create(crypto.randomUUID());
    const entity = new OrderFulfillmentEntity(
      id,
      { ...props, status: FulfillmentStatusVO.create('started'), startedAt: now },
      now.toISOString(),
      now.toISOString(),
    );
    entity.addDomainEvent(
      new FulfillmentStartedEvent(
        id.value,
        id.value,
        props.orderId.value,
        props.vendorId?.value ?? null,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: FulfillmentIdVO,
    props: OrderFulfillmentEntityProps,
    createdAt: string,
    updatedAt: string,
  ): OrderFulfillmentEntity {
    return new OrderFulfillmentEntity(id, props, createdAt, updatedAt);
  }

  markPacked(): OrderFulfillmentEntity {
    const now = new Date();
    const updated = new OrderFulfillmentEntity(
      this.id,
      { ...this._toProps(), status: FulfillmentStatusVO.create('packed'), packedAt: now },
      this.createdAt,
      now.toISOString(),
    );
    updated.addDomainEvent(
      new FulfillmentPackedEvent(this.id.value, this.id.value, this._orderId.value, this.version + 1),
    );
    return updated;
  }

  markShipped(): OrderFulfillmentEntity {
    const now = new Date();
    const updated = new OrderFulfillmentEntity(
      this.id,
      { ...this._toProps(), status: FulfillmentStatusVO.create('shipped'), shippedAt: now },
      this.createdAt,
      now.toISOString(),
    );
    updated.addDomainEvent(
      new FulfillmentShippedEvent(this.id.value, this.id.value, this._orderId.value, this.version + 1),
    );
    return updated;
  }

  complete(): OrderFulfillmentEntity {
    const now = new Date();
    const updated = new OrderFulfillmentEntity(
      this.id,
      { ...this._toProps(), status: FulfillmentStatusVO.create('completed'), completedAt: now },
      this.createdAt,
      now.toISOString(),
    );
    updated.addDomainEvent(
      new FulfillmentCompletedEvent(this.id.value, this.id.value, this._orderId.value, this.version + 1),
    );
    return updated;
  }

  get orderId(): OrderIdVO { return this._orderId; }
  get vendorId(): VendorIdVO | null { return this._vendorId; }
  get status(): FulfillmentStatusVO { return this._status; }
  get startedAt(): Date | null { return this._startedAt; }
  get packedAt(): Date | null { return this._packedAt; }
  get shippedAt(): Date | null { return this._shippedAt; }
  get completedAt(): Date | null { return this._completedAt; }

  private _toProps(): OrderFulfillmentEntityProps {
    return {
      orderId: this._orderId,
      vendorId: this._vendorId,
      status: this._status,
      startedAt: this._startedAt,
      packedAt: this._packedAt,
      shippedAt: this._shippedAt,
      completedAt: this._completedAt,
    };
  }
}
