/**
 * BroadcastQueue — bulk broadcast dispatch queue
 * @module notification-service/infrastructure/queues
 */
import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import {
  NOTIFICATION_QUEUE_NAME,
  NOTIFICATION_JOB_NAME,
  NOTIFICATION_QUEUE_PRIORITY,
} from './queue.constants.js';

export interface StartBroadcastJobPayload {
  readonly broadcastId: string;
  readonly testMode?: boolean;
}

export interface ProcessBroadcastBatchJobPayload {
  readonly broadcastId: string;
  readonly batchNumber: number;
  readonly recipientIds: readonly string[];
}

export interface CompleteBroadcastJobPayload {
  readonly broadcastId: string;
}

@Injectable()
export class BroadcastQueue {
  constructor(private readonly queueService: QueueService) {}

  async enqueueStart(payload: StartBroadcastJobPayload): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.BROADCAST,
      NOTIFICATION_JOB_NAME.START_BROADCAST,
      payload,
      {
        priority: NOTIFICATION_QUEUE_PRIORITY.HIGH,
        jobId: `broadcast:start:${payload.broadcastId}`,
      },
    );
  }

  async enqueueBatch(payload: ProcessBroadcastBatchJobPayload): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.BROADCAST,
      NOTIFICATION_JOB_NAME.PROCESS_BROADCAST_BATCH,
      payload,
      {
        priority: NOTIFICATION_QUEUE_PRIORITY.NORMAL,
        jobId: `broadcast:batch:${payload.broadcastId}:${payload.batchNumber}`,
      },
    );
  }

  async enqueueComplete(payload: CompleteBroadcastJobPayload): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.BROADCAST,
      NOTIFICATION_JOB_NAME.COMPLETE_BROADCAST,
      payload,
      {
        priority: NOTIFICATION_QUEUE_PRIORITY.LOW,
        delayMs: 5_000,
        jobId: `broadcast:complete:${payload.broadcastId}`,
      },
    );
  }
}
