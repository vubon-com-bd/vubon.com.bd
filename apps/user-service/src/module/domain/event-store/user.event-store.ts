/**
 * UserEventStore — In-memory implementation
 * @module user-service/domain/event-store
 *
 * NOTE: For production, replace with PrismaEventStore in infrastructure.
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type {
  DomainEvent,
  EventEnvelope,
} from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';

export class UserEventStore implements BaseEventStore {
  private readonly streams = new Map<string, EventEnvelope[]>();

  async append(event: DomainEvent): Promise<void> {
    const stream = this.streams.get(event.aggregateId) ?? [];
    stream.push({
      event,
      publishedAt: event.occurredAt as unknown as Timestamp,
      retryCount: 0,
    });
    this.streams.set(event.aggregateId, stream);
  }

  async appendBatch(events: readonly DomainEvent[]): Promise<void> {
    for (const e of events) {
      await this.append(e);
    }
  }

  async loadStream(
    aggregateId: string,
    fromVersion?: number
  ): Promise<readonly EventEnvelope[]> {
    const stream = this.streams.get(aggregateId) ?? [];
    if (fromVersion === undefined) return [...stream];
    return stream.filter((env) => env.event.version >= fromVersion);
  }

  async getVersion(aggregateId: string): Promise<number> {
    const stream = this.streams.get(aggregateId) ?? [];
    if (stream.length === 0) return 0;
    return Math.max(...stream.map((env) => env.event.version));
  }

  async exists(aggregateId: string): Promise<boolean> {
    return this.streams.has(aggregateId);
  }

  async clear(aggregateId: string): Promise<void> {
    this.streams.delete(aggregateId);
  }
}
