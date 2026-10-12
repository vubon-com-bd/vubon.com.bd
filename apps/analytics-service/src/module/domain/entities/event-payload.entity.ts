/**
 * Event Payload Entity
 * @module analytics-service/domain/entities
 *
 * Persisted event payload — separate from EventEntity for storage optimization.
 * Business Rule:
 * - 1:1 with EventEntity
 * - Immutable after creation
 * - Retention: aligned with parent event
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base';
import { EventPayloadVO } from '../value-objects/primitives/event-payload.vo.js';
import { EventIdVO } from '../value-objects/primitives/event-id.vo.js';

export interface EventPayloadEntityProps {
  readonly eventId: EventIdVO;
  readonly payload: EventPayloadVO;
}

export class EventPayloadEntity extends BaseEntity<string> {
  private props: EventPayloadEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: EventPayloadEntityProps
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  static create(params: {
    id: string;
    eventId: EventIdVO;
    payload: EventPayloadVO;
    now: string;
  }): EventPayloadEntity {
    if (!params.eventId || !params.payload) {
      throw new Error('EventPayloadEntity requires eventId, payload');
    }

    return new EventPayloadEntity(
      params.id,
      params.now,
      params.now,
      {
        eventId: params.eventId,
        payload: params.payload,
      }
    );
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: EventPayloadEntityProps;
  }): EventPayloadEntity {
    return new EventPayloadEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props
    );
  }

  get eventId(): EventIdVO {
    return this.props.eventId;
  }

  get payload(): EventPayloadVO {
    return this.props.payload;
  }

  sizeInBytes(): number {
    return this.props.payload.sizeInBytes();
  }

  keyCount(): number {
    return this.props.payload.keyCount();
  }

  isEmpty(): boolean {
    return this.props.payload.isEmpty();
  }

  hasKey(key: string): boolean {
    return this.props.payload.has(key);
  }
}
