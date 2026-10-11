/**
 * BroadcastQueue — enqueue helpers for broadcast jobs
 * @module notification-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { NOTIFICATION_QUEUE_NAME, NOTIFICATION_JOB_NAME } from './queue.constants.js';

export interface StartBroadcastPayload {
  readonly broadcastId: string;
  readonly totalRecipients: number;
}

export interface ProcessBroadcastBatchPayload {
  readonly broadcastId: string;
  readonly batchNumber: number;
  readonly recipientIds: readonly string[];
}

export interface FinalizeBroadcastPayload {
  readonly broadcastId: string;
}

export interface CancelBroadcastPayload {
  readonly broadcastId: string;
  readonly reason?: string;
}

@Injectable()
export class BroadcastQueue {
  private readonly logger = new Logger(BroadcastQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueStart(payload: StartBroadcastPayload, scheduledAt?: Date): Promise<string> {
    const delayMs = scheduledAt
      ? Math.max(0, scheduledAt.getTime() - Date.now())
      : undefined;
    const jobId = await this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.NOTIFICATION,
      NOTIFICATION_JOB_NAME.START_BROADCAST,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.HIGH,
        delayMs,
        jobId: `bcast:start:${payload.broadcastId}`,
      },
    );
    this.logger.debug(`enqueueStart broadcast=${payload.broadcastId}`);
    return jobId;
  }

  async enqueueBatch(payload: ProcessBroadcastBatchPayload): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.NOTIFICATION,
      NOTIFICATION_JOB_NAME.PROCESS_BROADCAST_BATCH,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        jobId: `bcast:${payload.broadcastId}:b${payload.batchNumber}`,
      },
    );
  }

  async enqueueFinalize(payload: FinalizeBroadcastPayload): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.NOTIFICATION,
      NOTIFICATION_JOB_NAME.FINALIZE_BROADCAST,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        jobId: `bcast:final:${payload.broadcastId}`,
      },
    );
  }

  async enqueueCancel(payload: CancelBroadcastPayload): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.NOTIFICATION,
      NOTIFICATION_JOB_NAME.CANCEL_BROADCAST,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.CRITICAL,
        jobId: `bcast:cancel:${payload.broadcastId}`,
      },
    );
  }
}
