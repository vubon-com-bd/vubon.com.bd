import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { TrackingIdVO } from '../value-objects/primitives/tracking-id.vo';
import { TrackingNumberVO } from '../value-objects/primitives/tracking-number.vo';
import { TrackingStatusVO } from '../value-objects/primitives/tracking-status.vo';
import { ShipmentIdVO } from '../value-objects/primitives/shipment-id.vo';
import {
  TrackingCreatedEvent,
  TrackingUpdatedEvent,
} from '../events/tracking.events';

export interface TrackingEntityProps {
  readonly number: TrackingNumberVO;
  readonly shipmentId: ShipmentIdVO;
  readonly status: TrackingStatusVO;
}

export class TrackingEntity extends AggregateRoot<TrackingIdVO> {
  private readonly _number: TrackingNumberVO;
  private readonly _shipmentId: ShipmentIdVO;
  private readonly _status: TrackingStatusVO;

  private constructor(
    id: TrackingIdVO,
    props: TrackingEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._number = props.number;
    this._shipmentId = props.shipmentId;
    this._status = props.status;
  }

  static create(props: TrackingEntityProps): TrackingEntity {
    const now = new Date().toISOString();
    const id = TrackingIdVO.create(crypto.randomUUID());
    const entity = new TrackingEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new TrackingCreatedEvent(
        id.value,
        id.value,
        props.number.value,
        props.shipmentId.value,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: TrackingIdVO,
    props: TrackingEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): TrackingEntity {
    return new TrackingEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  update(status: TrackingStatusVO, location: string | null): TrackingEntity {
    const now = new Date().toISOString();
    const updated = new TrackingEntity(
      this.id,
      { ...this._toProps(), status },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new TrackingUpdatedEvent(
        this.id.value,
        this.id.value,
        status.value,
        location,
        this.version + 1,
      ),
    );
    return updated;
  }

  get number(): TrackingNumberVO { return this._number; }
  get shipmentId(): ShipmentIdVO { return this._shipmentId; }
  get status(): TrackingStatusVO { return this._status; }

  private _toProps(): TrackingEntityProps {
    return {
      number: this._number,
      shipmentId: this._shipmentId,
      status: this._status,
    };
  }
}
