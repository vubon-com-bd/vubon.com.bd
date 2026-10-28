/**
 * RetryQueue — central retry dispatcher
 * @module notification-service/infrastructure/queues
 *
 * Enqueues retry operations back into channel-specific queues.
 * Uses RetryPolicyService to compute delay।
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import {
  NOTIFICATION_QUEUE_NAME,
  NOTIFICATION_JOB_NAME,
  NOTIFICATION_QUEUE_PRIORITY,
} from './queue.constants.js';

export interface ProcessRetryJobPayload {
  readonly notificationId: string;
  readonly channel: string;
  readonly attempt: number;
  readonly nextRetryAt: string;
}

export interface CleanupJobPayload {
  readonly scope: 'notifications' | 'webhooks' | 'digests' | 'audit';
  readonly cutoff: string;
}

@Injectable()
export class RetryQueue {
  private readonly logger = new Logger(RetryQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueProcess(payload: ProcessRetryJobPayload, delayMs: number): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.RETRY,
      NOTIFICATION_JOB_NAME.PROCESS_RETRY,
      payload,
      {
        priority: NOTIFICATION_QUEUE_PRIORITY.NORMAL,
        delayMs,
        jobId: `retry:${payload.notificationId}:${payload.attempt}`.replace(/[:.]/g, '-'),
      },
    );
  }

  async enqueueCleanup(payload: CleanupJobPayload): Promise<string> {
    this.logger.debug(`Cleanup enqueued: scope=${payload.scope} cutoff=${payload.cutoff}`);
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.RETRY,
      NOTIFICATION_JOB_NAME.CLEANUP,
      payload,
      {
        priority: NOTIFICATION_QUEUE_PRIORITY.LOW,
        jobId: `cleanup:${payload.scope}:${Date.now()}`.replace(/[:.]/g, '-'),
      },
    );
  }
}
