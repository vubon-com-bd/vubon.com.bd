/**
 * DigestQueue — enqueue helpers for digest jobs
 * @module notification-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import {
  NOTIFICATION_QUEUE_NAME,
  NOTIFICATION_JOB_NAME,
  NOTIFICATION_QUEUE_LIMITS,
} from './queue.constants.js';

export interface GenerateDigestPayload {
  readonly userId: string;
  readonly frequency: string;
  readonly periodStart?: string;
  readonly periodEnd?: string;
}

export interface SendDigestPayload {
  readonly digestId: string;
  readonly userId: string;
  readonly channel: string;
}

@Injectable()
export class DigestQueue {
  private readonly logger = new Logger(DigestQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueGenerate(
    payload: GenerateDigestPayload,
    scheduledAt?: Date,
  ): Promise<string> {
    const delayMs = scheduledAt
      ? Math.max(0, scheduledAt.getTime() - Date.now())
      : undefined;
    const jobId = await this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.NOTIFICATION,
      NOTIFICATION_JOB_NAME.GENERATE_DIGEST,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        delayMs,
        jobId: `digest:gen:${payload.userId}:${payload.frequency}`,
      },
    );
    this.logger.debug(`enqueueGenerate digest user=${payload.userId} freq=${payload.frequency}`);
    return jobId;
  }

  async enqueueSend(payload: SendDigestPayload): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.NOTIFICATION,
      NOTIFICATION_JOB_NAME.SEND_DIGEST,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.HIGH,
        jobId: `digest:send:${payload.digestId}`,
      },
    );
  }

  async enqueueScanReady(
    delayMs: number = NOTIFICATION_QUEUE_LIMITS.DIGEST_SCAN_INTERVAL_MS,
  ): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.NOTIFICATION,
      NOTIFICATION_JOB_NAME.SCAN_READY_DIGESTS,
      {},
      {
        priority: QUEUE_PRIORITY.LOW,
        delayMs,
        jobId: `digest:scan:${Date.now()}`,
      },
    );
  }
}
