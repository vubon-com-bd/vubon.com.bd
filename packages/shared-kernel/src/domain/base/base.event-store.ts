/**
 * Base Event Store Interface
 * @module shared-kernel/domain/base
 *
 * Persistent storage for domain events (event sourcing support)।
 */
import type { DomainEvent, EventEnvelope } from './base.event';

export interface BaseEventStore {
  append(event: DomainEvent): Promise<void>;
  appendBatch(events: readonly DomainEvent[]): Promise<void>;
  loadStream(aggregateId: string, fromVersion?: number): Promise<readonly EventEnvelope[]>;
  getVersion(aggregateId: string): Promise<number>;
  exists(aggregateId: string): Promise<boolean>;
}
