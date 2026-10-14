/**
 * NotificationQueue — vendor-scoped notification enqueue helpers
 * @module vendor-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { VENDOR_QUEUE_NAME, VENDOR_JOB_NAME } from './queue.constants.js';

export interface NotifyVendorPayload {
  readonly vendorId: string;
  readonly template: string;
  readonly data?: Readonly<Record<string, unknown>>;
  readonly channel?: 'email' | 'sms' | 'push' | 'in-app';
}

@Injectable()
export class NotificationQueue {
  private readonly logger = new Logger(NotificationQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueNotify(
    payload: NotifyVendorPayload,
    delayMs?: number,
  ): Promise<string> {
    const id = await this.queueService.enqueue(
      VENDOR_QUEUE_NAME.NOTIFICATION,
      VENDOR_JOB_NAME.NOTIFY_VENDOR,
      payload,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        delayMs,
        jobId: `notify:${payload.vendorId}:${payload.template}:${Date.now()}`,
      },
    );
    this.logger.debug(`Enqueued notification "${payload.template}" for ${payload.vendorId}`);
    return id;
  }
}
