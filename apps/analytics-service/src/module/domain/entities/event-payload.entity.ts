import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { EventIdVO } from '../value-objects/primitives/event-id.vo';
import { EventPayloadVO } from '../value-objects/primitives/event-payload.vo';

export interface EventPayloadEntityProps {
  readonly eventId: EventIdVO;
  readonly payload: EventPayloadVO;
}

export class EventPayloadEntity extends BaseEntity<EventIdVO> {
  private readonly _eventId: EventIdVO;
  private readonly _payload: EventPayloadVO;

  private constructor(
    id: EventIdVO,
    props: EventPayloadEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._eventId = props.eventId;
    this._payload = props.payload;
  }

  static create(props: EventPayloadEntityProps): EventPayloadEntity {
    const now = new Date().toISOString();
    return new EventPayloadEntity(props.eventId, props, now, now, null);
  }

  static reconstitute(
    id: EventIdVO,
    props: EventPayloadEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): EventPayloadEntity {
    return new EventPayloadEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get eventId(): EventIdVO { return this._eventId; }
  get payload(): EventPayloadVO { return this._payload; }
}
