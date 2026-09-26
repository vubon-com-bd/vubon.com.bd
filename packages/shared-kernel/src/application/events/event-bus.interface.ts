/**
 * Application Event Bus Interface
 * @module shared-kernel/application/events
 *
 * Values আসে domain/base/base.event থেকে (type only)।
 */
import type { DomainEvent } from '../../domain/base/base.event';

export interface ApplicationEventBus {
  publish(event: DomainEvent): Promise<void>;
  publishBatch(events: readonly DomainEvent[]): Promise<void>;
  subscribe(eventType: string, handler: (event: DomainEvent) => Promise<void>): () => void;
}
