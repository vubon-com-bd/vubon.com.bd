/**
 * EventBusService — Fan-Out Broadcast Pattern
 * @module shared-kernel/infrastructure/messaging/event-bus
 *
 * Each service consumes from its OWN queue: `domain-events-<service>`.
 * (BullMQ v5 forbids ':' in queue names — using '-' separator.)
 * Producer (publish) enqueues the event into every known consumer queue.
 */
import { Injectable, Logger } from '@nestjs/common';
import type { DomainEvent } from '../../../domain/base/base.event.js';
import { QueueService } from '../queue/queue.service.js';

type EventHandler = (event: DomainEvent) => Promise<void>;

const QUEUE_PREFIX = 'domain-events';
const CONSUMERS = [
  'logistics', 'notification', 'order', 'analytics', 'support',
  'marketing', 'cart', 'search', 'discovery', 'ai', 'reporting',
] as const;
const CONCURRENCY = 5;

@Injectable()
export class EventBusService {
  private readonly logger = new Logger(EventBusService.name);
  private readonly registry = new Map<string, EventHandler[]>();
  private workerRegistered = false;
  private serviceName = 'unknown';

  constructor(private readonly queues: QueueService) {}

  setServiceName(name: string): void {
    this.serviceName = name;
    this.logger.log(`🏷️  Service name set to "${name}"`);
  }

  async publish(event: DomainEvent): Promise<void> {
    const payload = event as unknown as Record<string, unknown>;
    for (const c of CONSUMERS) {
      const queueName = `${QUEUE_PREFIX}-${c}`;
      try {
        await this.queues.enqueue(queueName, event.type, payload, {
          jobId: `${event.id}__${queueName}`,
        });
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        this.logger.warn(`Fan-out to "${queueName}" failed: ${msg}`);
      }
    }
  }

  async publishBatch(events: readonly DomainEvent[]): Promise<void> {
    for (const event of events) {
      await this.publish(event);
    }
  }

  registerHandler(eventType: string, handler: EventHandler): void {
    const list = this.registry.get(eventType) ?? [];
    list.push(handler);
    this.registry.set(eventType, list);

    this.logger.log(`📥 Registered handler for "${eventType}" (total: ${list.length})`);
    if (this.workerRegistered) return;

    const queueName = `${QUEUE_PREFIX}-${this.serviceName}`;
    this.queues.registerWorker(
      queueName,
      async (payload: Record<string, unknown>) => {
        const event = payload as unknown as DomainEvent;
        const handlers = this.registry.get(event.type) ?? [];
        if (handlers.length === 0) {
          this.logger.debug(`No handlers for "${event.type}" on "${this.serviceName}"`);
          return;
        }
        this.logger.log(
          `📨 [${this.serviceName}] Processing "${event.type}" (id=${event.id}) with ${handlers.length} handler(s)`,
        );
        for (const h of handlers) {
          try {
            await h(event);
          } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            this.logger.error(`❌ Handler for "${event.type}" failed: ${msg}`);
          }
        }
      },
      CONCURRENCY,
    );

    this.workerRegistered = true;
    this.logger.log(`🔧 EventBus worker registered on "${queueName}" (concurrency=${CONCURRENCY})`);
  }
}
