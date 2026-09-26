import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ShipmentIdVO } from '../value-objects/primitives/shipment-id.vo';
import { ShipmentNumberVO } from '../value-objects/primitives/shipment-number.vo';
import { ShipmentStatusVO } from '../value-objects/primitives/shipment-status.vo';
import { ShipmentTypeVO } from '../value-objects/primitives/shipment-type.vo';
import { ShipmentPriorityVO } from '../value-objects/primitives/shipment-priority.vo';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';
import { WeightVO } from '../value-objects/primitives/weight.vo';
import { DimensionVO } from '../value-objects/primitives/dimension.vo';
import { SHIPMENT_STATUS } from '@vubon/shared-constants/logistics';
import {
  ShipmentCreatedEvent,
  ShipmentPickedUpEvent,
  ShipmentDeliveredEvent,
  ShipmentCancelledEvent,
} from '../events/shipment.events';
import { ShipmentCannotBeCancelledError } from '../errors/shipment.errors';

export interface ShipmentEntityProps {
  readonly number: ShipmentNumberVO;
  readonly orderId: OrderIdVO;
  readonly userId: UserIdVO;
  readonly vendorId: VendorIdVO | null;
  readonly status: ShipmentStatusVO;
  readonly type: ShipmentTypeVO;
  readonly priority: ShipmentPriorityVO;
  readonly weight: WeightVO | null;
  readonly dimension: DimensionVO | null;
  readonly notes: string | null;
}

export class ShipmentEntity extends AggregateRoot<ShipmentIdVO> {
  private readonly _number: ShipmentNumberVO;
  private readonly _orderId: OrderIdVO;
  private readonly _userId: UserIdVO;
  private readonly _vendorId: VendorIdVO | null;
  private readonly _status: ShipmentStatusVO;
  private readonly _type: ShipmentTypeVO;
  private readonly _priority: ShipmentPriorityVO;
  private readonly _weight: WeightVO | null;
  private readonly _dimension: DimensionVO | null;
  private readonly _notes: string | null;

  private constructor(
    id: ShipmentIdVO,
    props: ShipmentEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._number = props.number;
    this._orderId = props.orderId;
    this._userId = props.userId;
    this._vendorId = props.vendorId;
    this._status = props.status;
    this._type = props.type;
    this._priority = props.priority;
    this._weight = props.weight;
    this._dimension = props.dimension;
    this._notes = props.notes;
  }

  static create(props: ShipmentEntityProps): ShipmentEntity {
    const now = new Date().toISOString();
    const id = ShipmentIdVO.create(crypto.randomUUID());
    const entity = new ShipmentEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new ShipmentCreatedEvent(
        id.value,
        id.value,
        props.orderId.value,
        props.userId.value,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: ShipmentIdVO,
    props: ShipmentEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ShipmentEntity {
    return new ShipmentEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  markPickedUp(courierId: string): ShipmentEntity {
    const now = new Date().toISOString();
    const updated = new ShipmentEntity(
      this.id,
      {
        ...this._toProps(),
        status: ShipmentStatusVO.create(SHIPMENT_STATUS.PICKED_UP),
      },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new ShipmentPickedUpEvent(this.id.value, this.id.value, courierId, this.version + 1),
    );
    return updated;
  }

  markDelivered(): ShipmentEntity {
    const now = new Date().toISOString();
    const updated = new ShipmentEntity(
      this.id,
      { ...this._toProps(), status: ShipmentStatusVO.create(SHIPMENT_STATUS.DELIVERED) },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new ShipmentDeliveredEvent(
        this.id.value,
        this.id.value,
        this._orderId.value,
        now,
        this.version + 1,
      ),
    );
    return updated;
  }

  cancel(reason: string): ShipmentEntity {
    if (
      this._status.value === SHIPMENT_STATUS.DELIVERED ||
      this._status.value === SHIPMENT_STATUS.CANCELLED
    ) {
      throw new ShipmentCannotBeCancelledError(this.id.value);
    }
    const now = new Date().toISOString();
    const updated = new ShipmentEntity(
      this.id,
      { ...this._toProps(), status: ShipmentStatusVO.create(SHIPMENT_STATUS.CANCELLED) },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new ShipmentCancelledEvent(this.id.value, this.id.value, reason, this.version + 1),
    );
    return updated;
  }

  get number(): ShipmentNumberVO { return this._number; }
  get orderId(): OrderIdVO { return this._orderId; }
  get userId(): UserIdVO { return this._userId; }
  get vendorId(): VendorIdVO | null { return this._vendorId; }
  get status(): ShipmentStatusVO { return this._status; }
  get type(): ShipmentTypeVO { return this._type; }
  get priority(): ShipmentPriorityVO { return this._priority; }
  get weight(): WeightVO | null { return this._weight; }
  get dimension(): DimensionVO | null { return this._dimension; }
  get notes(): string | null { return this._notes; }

  private _toProps(): ShipmentEntityProps {
    return {
      number: this._number,
      orderId: this._orderId,
      userId: this._userId,
      vendorId: this._vendorId,
      status: this._status,
      type: this._type,
      priority: this._priority,
      weight: this._weight,
      dimension: this._dimension,
      notes: this._notes,
    };
  }
}
