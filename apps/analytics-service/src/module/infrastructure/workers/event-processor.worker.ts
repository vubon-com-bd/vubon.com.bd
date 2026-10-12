/**
 * Event Processor Worker
 * @module analytics-service/infrastructure/workers
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { EventQueue } from '../queues/event.queue.js';

@Injectable()
export class EventProcessorWorker implements OnModuleInit {
  private readonly logger = new Logger(EventProcessorWorker.name);

  constructor(
    private readonly queue: QueueService,
    private readonly eventQueue: EventQueue
  ) {}

  onModuleInit(): void {
    this.queue.registerWorker(
      this.eventQueue.queueName,
      async (payload: unknown) => {
        const job = payload as { eventId: string; eventName: string };
        this.logger.debug(`Processing event ${job.eventId} (${job.eventName})`);
        // Delegate to application handler via DI in real module
        return { processed: true, eventId: job.eventId };
      },
      5
    );
  }
}
