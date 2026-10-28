/**
 * DigestQueue — digest generation + send queue
 * @module notification-service/infrastructure/queues
 */
import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import {
  NOTIFICATION_QUEUE_NAME,
  NOTIFICATION_JOB_NAME,
  NOTIFICATION_QUEUE_PRIORITY,
} from './queue.constants.js';

export interface GenerateDigestJobPayload {
  readonly digestId: string;
  readonly userId: string;
  readonly periodStart: string;
  readonly periodEnd: string;
}

export interface SendDigestJobPayload {
  readonly digestId: string;
  readonly userId: string;
  readonly channels: readonly string[];
}

@Injectable()
export class DigestQueue {
  constructor(private readonly queueService: QueueService) {}

  async enqueueGenerate(
    payload: GenerateDigestJobPayload,
    delayMs?: number,
  ): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.DIGEST,
      NOTIFICATION_JOB_NAME.GENERATE_DIGEST,
      payload,
      {
        priority: NOTIFICATION_QUEUE_PRIORITY.NORMAL,
        delayMs,
        jobId: `digest:generate:${payload.digestId}`.replace(/[:.]/g, '-'),
      },
    );
  }

  async enqueueSend(payload: SendDigestJobPayload): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.DIGEST,
      NOTIFICATION_JOB_NAME.SEND_DIGEST,
      payload,
      {
        priority: NOTIFICATION_QUEUE_PRIORITY.HIGH,
        jobId: `digest:send:${payload.digestId}`.replace(/[:.]/g, '-'),
      },
    );
  }
}
