/**
 * Event Bus Interface
 * @module shared-kernel/domain/interfaces
 *
 * References domain event (type only)।
 */
import type { DomainEvent } from '../base/base.event';

export interface EventBus {
  publish(event: DomainEvent): Promise<void>;
  publishBatch(events: readonly DomainEvent[]): Promise<void>;
}

export interface AsyncEventBus extends EventBus {
  subscribe(eventType: string, handler: (event: DomainEvent) => Promise<void>): Promise<() => void>;
}
