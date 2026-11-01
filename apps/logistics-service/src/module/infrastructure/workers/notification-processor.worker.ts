import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { LOGISTICS_QUEUE_NAME, LOGISTICS_JOB_NAME } from '../queues/queue.constants.js';

type JobPayload = {
  recipientId?: string;
  email?: string;
  phone?: string;
  template: string;
  data?: Record<string, unknown>;
};

@Injectable()
export class NotificationProcessorWorker extends BaseWorker<JobPayload> {
  protected readonly queueName = LOGISTICS_QUEUE_NAME.NOTIFICATION;
  protected readonly jobNames = [LOGISTICS_JOB_NAME.SEND_NOTIFICATION] as const;

  constructor(queueService: QueueService) {
    super(queueService, 'NotificationProcessorWorker');
  }

  protected async handle(payload: JobPayload): Promise<unknown> {
    this.logger.log(`Processing notification: template=${payload.template}`);
    // Actual send would call notification-service via NotificationClient
    return { processed: true, template: payload.template };
  }

  protected concurrency(): number { return 5; }
}
