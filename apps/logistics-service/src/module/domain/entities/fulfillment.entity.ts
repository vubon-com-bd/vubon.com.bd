import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { FulfillmentIdVO } from '../value-objects/primitives/fulfillment-id.vo';
import { FulfillmentStatusVO } from '../value-objects/primitives/fulfillment-status.vo';
import { FulfillmentTypeVO } from '../value-objects/primitives/fulfillment-type.vo';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';
import { WarehouseIdVO } from '../value-objects/primitives/warehouse-id.vo';
import {
  FulfillmentStartedEvent,
  FulfillmentCompletedEvent,
} from '../events/fulfillment.events';

export interface FulfillmentEntityProps {
  readonly orderId: OrderIdVO;
  readonly warehouseId: WarehouseIdVO;
  readonly status: FulfillmentStatusVO;
  readonly type: FulfillmentTypeVO;
  readonly strategy: string | null;
  readonly startedAt: Date | null;
  readonly completedAt: Date | null;
}

export class FulfillmentEntity extends AggregateRoot<FulfillmentIdVO> {
  private readonly _orderId: OrderIdVO;
  private readonly _warehouseId: WarehouseIdVO;
  private readonly _status: FulfillmentStatusVO;
  private readonly _type: FulfillmentTypeVO;
  private readonly _strategy: string | null;
  private readonly _startedAt: Date | null;
  private readonly _completedAt: Date | null;

  private constructor(
    id: FulfillmentIdVO,
    props: FulfillmentEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._orderId = props.orderId;
    this._warehouseId = props.warehouseId;
    this._status = props.status;
    this._type = props.type;
    this._strategy = props.strategy;
    this._startedAt = props.startedAt;
    this._completedAt = props.completedAt;
  }

  static create(props: FulfillmentEntityProps): FulfillmentEntity {
    const now = new Date().toISOString();
    const id = FulfillmentIdVO.create(crypto.randomUUID());
    const entity = new FulfillmentEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new FulfillmentStartedEvent(
        id.value,
        id.value,
        props.orderId.value,
        props.warehouseId.value,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: FulfillmentIdVO,
    props: FulfillmentEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): FulfillmentEntity {
    return new FulfillmentEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  complete(): FulfillmentEntity {
    const now = new Date().toISOString();
    const updated = new FulfillmentEntity(
      this.id,
      { ...this._toProps(), status: FulfillmentStatusVO.create('completed'), completedAt: new Date() },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new FulfillmentCompletedEvent(
        this.id.value,
        this.id.value,
        this._orderId.value,
        this.version + 1,
      ),
    );
    return updated;
  }

  get orderId(): OrderIdVO { return this._orderId; }
  get warehouseId(): WarehouseIdVO { return this._warehouseId; }
  get status(): FulfillmentStatusVO { return this._status; }
  get type(): FulfillmentTypeVO { return this._type; }
  get strategy(): string | null { return this._strategy; }
  get startedAt(): Date | null { return this._startedAt; }
  get completedAt(): Date | null { return this._completedAt; }

  private _toProps(): FulfillmentEntityProps {
    return {
      orderId: this._orderId,
      warehouseId: this._warehouseId,
      status: this._status,
      type: this._type,
      strategy: this._strategy,
      startedAt: this._startedAt,
      completedAt: this._completedAt,
    };
  }
}
