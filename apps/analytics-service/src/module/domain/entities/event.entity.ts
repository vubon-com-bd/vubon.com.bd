import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { EventIdVO } from '../value-objects/primitives/event-id.vo';
import { EventNameVO } from '../value-objects/primitives/event-name.vo';
import { EventSourceVO } from '../value-objects/primitives/event-source.vo';
import { EventTimestampVO } from '../value-objects/primitives/event-timestamp.vo';
import { EventPayloadVO } from '../value-objects/primitives/event-payload.vo';
import {
  EventReceivedEvent,
  EventProcessedEvent,
} from '../events/event.events';

export interface EventEntityProps {
  readonly name: EventNameVO;
  readonly source: EventSourceVO;
  readonly timestamp: EventTimestampVO;
  readonly payload: EventPayloadVO;
  readonly processed: boolean;
}

export class EventEntity extends AggregateRoot<EventIdVO> {
  private readonly _name: EventNameVO;
  private readonly _source: EventSourceVO;
  private readonly _timestamp: EventTimestampVO;
  private readonly _payload: EventPayloadVO;
  private readonly _processed: boolean;

  private constructor(
    id: EventIdVO,
    props: EventEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._source = props.source;
    this._timestamp = props.timestamp;
    this._payload = props.payload;
    this._processed = props.processed;
  }

  static create(props: EventEntityProps): EventEntity {
    const now = new Date().toISOString();
    const id = EventIdVO.create(crypto.randomUUID());
    const entity = new EventEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new EventReceivedEvent(
        id.value,
        id.value,
        props.name.value,
        props.source.value,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: EventIdVO,
    props: EventEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): EventEntity {
    return new EventEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  markProcessed(): EventEntity {
    if (this._processed) return this;
    const now = new Date().toISOString();
    const updated = new EventEntity(
      this.id,
      { ...this._toProps(), processed: true },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new EventProcessedEvent(
        this.id.value,
        this.id.value,
        this._name.value,
        this.version + 1,
      ),
    );
    return updated;
  }

  get name(): EventNameVO { return this._name; }
  get source(): EventSourceVO { return this._source; }
  get timestamp(): EventTimestampVO { return this._timestamp; }
  get payload(): EventPayloadVO { return this._payload; }
  get processed(): boolean { return this._processed; }

  get isRecent(): boolean {
    return Date.now() - this._timestamp.epochMs < 60_000;
  }

  private _toProps(): EventEntityProps {
    return {
      name: this._name,
      source: this._source,
      timestamp: this._timestamp,
      payload: this._payload,
      processed: this._processed,
    };
  }
}
