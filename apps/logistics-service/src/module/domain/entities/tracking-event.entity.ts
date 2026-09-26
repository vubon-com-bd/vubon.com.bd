import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { TrackingIdVO } from '../value-objects/primitives/tracking-id.vo';
import { TrackingEventVO } from '../value-objects/primitives/tracking-event.vo';
import { LocationCodeVO } from '../value-objects/primitives/location-code.vo';

export interface TrackingEventEntityProps {
  readonly trackingId: TrackingIdVO;
  readonly eventType: TrackingEventVO;
  readonly location: LocationCodeVO | null;
  readonly note: string | null;
  readonly occurredAt: Date;
}

export class TrackingEventEntity extends BaseEntity<string> {
  private readonly _trackingId: TrackingIdVO;
  private readonly _eventType: TrackingEventVO;
  private readonly _location: LocationCodeVO | null;
  private readonly _note: string | null;
  private readonly _occurredAt: Date;

  private constructor(
    id: string,
    props: TrackingEventEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._trackingId = props.trackingId;
    this._eventType = props.eventType;
    this._location = props.location;
    this._note = props.note;
    this._occurredAt = props.occurredAt;
  }

  static create(props: TrackingEventEntityProps): TrackingEventEntity {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    return new TrackingEventEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: TrackingEventEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): TrackingEventEntity {
    return new TrackingEventEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get trackingId(): TrackingIdVO { return this._trackingId; }
  get eventType(): TrackingEventVO { return this._eventType; }
  get location(): LocationCodeVO | null { return this._location; }
  get note(): string | null { return this._note; }
  get occurredAt(): Date { return this._occurredAt; }
}
