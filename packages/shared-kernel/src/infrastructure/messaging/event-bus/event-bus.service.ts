/**
 * Event Bus Service (NestJS injectable)
 * @module shared-kernel/infrastructure/messaging/event-bus
 *
 * Values আসে domain/base/base.event থেকে (type only)।
 */
import { Injectable } from '@nestjs/common';
import type { DomainEvent } from '../../../domain/base/base.event';
import { QueueService } from '../queue/queue.service';
import { EVENT_BUS_CLIENT_CONFIG } from './event-bus.client';

@Injectable()
export class EventBusService {
  constructor(private readonly queues: QueueService) {}

  async publish(event: DomainEvent): Promise<void> {
    await this.queues.enqueue(
      EVENT_BUS_CLIENT_CONFIG.queueName,
      event.type,
      event as unknown as Record<string, unknown>,
      { jobId: event.id }
    );
  }

  async publishBatch(events: readonly DomainEvent[]): Promise<void> {
    for (const event of events) {
      await this.publish(event);
    }
  }

  registerHandler(eventType: string, handler: (event: DomainEvent) => Promise<void>): void {
    this.queues.registerWorker(
      EVENT_BUS_CLIENT_CONFIG.queueName,
      async (payload: Record<string, unknown>) => {
        const event = payload as unknown as DomainEvent;
        if (event.type === eventType) {
          await handler(event);
        }
      },
      EVENT_BUS_CLIENT_CONFIG.concurrency
    );
  }
}
