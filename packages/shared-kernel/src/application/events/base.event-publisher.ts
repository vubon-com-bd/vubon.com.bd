/**
 * Base Event Publisher
 * @module shared-kernel/application/events
 *
 * Values আসে domain/base/base.event থেকে (type only)।
 */
import type { DomainEvent } from '../../domain/base/base.event';

export abstract class BaseEventPublisher {
  abstract publish(event: DomainEvent): Promise<void>;
  abstract publishBatch(events: readonly DomainEvent[]): Promise<void>;
}
