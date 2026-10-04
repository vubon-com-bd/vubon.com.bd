/**
 * NotificationWorker — delivers admin/vendor notifications.
 * @module product-service/infrastructure/workers
 */
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { BaseWorker } from './base.worker.js';
import { NOTIFICATION_QUEUE, JOB_TYPES } from '../queues/queue.constants.js';

interface NotifyPayload {
  subject?: string;
  body?: string;
  recipientId?: string;
}

@Injectable()
export class NotificationWorker extends BaseWorker {
  constructor() {
    super(NOTIFICATION_QUEUE, NotificationWorker.name);
  }

  protected async handle(job: Job): Promise<void> {
    const data = job.data as NotifyPayload;
    switch (job.name as string) {
      case JOB_TYPES.NOTIFY_ADMIN:
      case JOB_TYPES.NOTIFY_VENDOR:
        this.logger.debug(
          `Notification → ${data.recipientId ?? 'unknown'}: ${data.subject ?? ''} | ${data.body ?? ''}`,
        );
        return;
      default:
        this.logger.warn(`Unknown job: ${job.name}`);
    }
  }
}
