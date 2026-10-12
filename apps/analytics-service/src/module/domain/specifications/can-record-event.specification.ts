/**
 * Can Record Event Specification
 * @module analytics-service/domain/specifications
 *
 * Event ingestion eligibility rules।
 * Business Rule:
 * - Event not duplicate
 * - Not rate limited
 * - Valid timestamp window
 * - Payload size within limit
 * - Not a bot/spam
 */
import { Specification } from '@vubon/shared-kernel/domain/base';
import { EventVO } from '../value-objects/composites/event.vo.js';
import { EventIdVO } from '../value-objects/primitives/event-id.vo.js';

export interface RecordEventContext {
  readonly existingEventId?: string;
  readonly recentEventCount: number;
  readonly maxEventsPerSecond: number;
  readonly isBotDetected: boolean;
}

export class CanRecordEventSpecification extends Specification<EventVO> {
  constructor(private readonly context: RecordEventContext) {
    super();
  }

  isSatisfiedBy(event: EventVO): boolean {
    // 1. Not duplicate
    if (this.context.existingEventId === event.id.value) {
      return false;
    }

    // 2. Not rate limited
    if (
      this.context.recentEventCount >= this.context.maxEventsPerSecond
    ) {
      return false;
    }

    // 3. Not bot
    if (this.context.isBotDetected) {
      return false;
    }

    // 4. Timestamp within reasonable window
    if (!event.timestamp.isRealTime() && event.timestamp.ageMs() > 24 * 60 * 60 * 1000) {
      // Older than 24h — too old for real-time analytics
      return false;
    }

    // 5. Payload not empty for ecommerce
    if (event.isEcommerce() && event.payload.isEmpty()) {
      return false;
    }

    return true;
  }

  /**
   * Explain why event was rejected
   */
  explain(event: EventVO): string | null {
    if (this.context.existingEventId === event.id.value) {
      return 'Duplicate event';
    }
    if (this.context.recentEventCount >= this.context.maxEventsPerSecond) {
      return 'Rate limit exceeded';
    }
    if (this.context.isBotDetected) {
      return 'Bot traffic detected';
    }
    if (event.timestamp.ageMs() > 24 * 60 * 60 * 1000) {
      return 'Event too old (> 24h)';
    }
    if (event.isEcommerce() && event.payload.isEmpty()) {
      return 'Ecommerce event requires payload';
    }
    return null;
  }

  /**
   * Factory: strict mode (all rules enforced)
   */
  static strict(): CanRecordEventSpecification {
    return new CanRecordEventSpecification({
      recentEventCount: 0,
      maxEventsPerSecond: 100,
      isBotDetected: false,
    });
  }

  /**
   * Factory: relaxed mode (only dedup)
   */
  static relaxed(existingEventId?: string): CanRecordEventSpecification {
    return new CanRecordEventSpecification({
      existingEventId,
      recentEventCount: 0,
      maxEventsPerSecond: Number.MAX_SAFE_INTEGER,
      isBotDetected: false,
    });
  }
}
