import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { EventIdVO } from '../primitives/event-id.vo';
import { EventNameVO } from '../primitives/event-name.vo';
import { EventSourceVO } from '../primitives/event-source.vo';
import { EventTimestampVO } from '../primitives/event-timestamp.vo';
import { EventPayloadVO } from '../primitives/event-payload.vo';

export interface EventProps {
  readonly eventId: EventIdVO;
  readonly name: EventNameVO;
  readonly source: EventSourceVO;
  readonly timestamp: EventTimestampVO;
  readonly payload: EventPayloadVO;
}

export class EventVO extends BaseVO<EventProps> {
  static create(props: EventProps): EventVO {
    return new EventVO(Object.freeze({ ...props }));
  }

  private constructor(value: EventProps) {
    super(value);
  }

  get eventId(): EventIdVO { return this.value.eventId; }
  get name(): EventNameVO { return this.value.name; }
  get source(): EventSourceVO { return this.value.source; }
  get timestamp(): EventTimestampVO { return this.value.timestamp; }
  get payload(): EventPayloadVO { return this.value.payload; }

  isSameEvent(other: EventVO): boolean {
    return this.value.eventId.value === other.value.eventId.value;
  }

  occurredBefore(other: EventVO): boolean {
    return this.value.timestamp.epochMs < other.value.timestamp.epochMs;
  }

  occurredAfter(other: EventVO): boolean {
    return this.value.timestamp.epochMs > other.value.timestamp.epochMs;
  }

  isWithin(startMs: number, endMs: number): boolean {
    return this.value.timestamp.isWithinWindow(startMs, endMs);
  }
}
