/**
 * Event Queue
 * @module analytics-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

const QUEUE = 'analytics-event';

export interface EventJobPayload {
  readonly eventId: string;
  readonly eventName: string;
  readonly rawPayload: unknown;
}

@Injectable()
export class EventQueue {
  private readonly logger = new Logger(EventQueue.name);

  constructor(private readonly queue: QueueService) {}

  async enqueue(payload: EventJobPayload, priority?: number): Promise<string> {
    const jobId = await this.queue.enqueue(QUEUE, 'process-event', payload, {
      priority: priority ?? QUEUE_PRIORITY.HIGH,
      jobId: payload.eventId,
    });
    this.logger.debug(`Event queued: ${payload.eventId}`);
    return jobId;
  }

  async enqueueBatch(payloads: readonly EventJobPayload[]): Promise<readonly string[]> {
    const jobIds: string[] = [];
    for (const p of payloads) {
      jobIds.push(await this.enqueue(p));
    }
    return jobIds;
  }

  get queueName(): string {
    return QUEUE;
  }

  static getName(): string {
    return QUEUE_NAME.ANALYTICS;
  }
}
