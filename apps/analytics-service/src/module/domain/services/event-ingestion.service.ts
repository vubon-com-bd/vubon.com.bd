import { EventEntity } from '../entities/event.entity';
import { EventNameVO } from '../value-objects/primitives/event-name.vo';
import { EventSourceVO } from '../value-objects/primitives/event-source.vo';
import { EventTimestampVO } from '../value-objects/primitives/event-timestamp.vo';
import { EventPayloadVO } from '../value-objects/primitives/event-payload.vo';

export class EventIngestionService {
  /**
   * Validate & normalize an incoming event.
   * Returns the new entity (not persisted).
   */
  ingest(input: {
    name: string;
    source: string;
    timestamp: Date;
    payload: Record<string, unknown>;
  }): EventEntity {
    const name = EventNameVO.create(input.name);
    const source = EventSourceVO.create(input.source);
    const timestamp = EventTimestampVO.create(input.timestamp);
    const payload = EventPayloadVO.create(input.payload);

    return EventEntity.create({
      name,
      source,
      timestamp,
      payload,
      processed: false,
    });
  }

  /**
   * Dedupe batch by eventId.
   */
  dedupe(events: readonly EventEntity[]): readonly EventEntity[] {
    const seen = new Set<string>();
    const out: EventEntity[] = [];
    for (const e of events) {
      if (seen.has(e.id.value)) continue;
      seen.add(e.id.value);
      out.push(e);
    }
    return out;
  }
}
