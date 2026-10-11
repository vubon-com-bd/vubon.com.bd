/**
 * PushQueue — enqueue helpers for push notification jobs
 * @module notification-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { NOTIFICATION_QUEUE_NAME, NOTIFICATION_JOB_NAME } from './queue.constants.js';

export interface SendPushPayload {
  readonly notificationId: string;
  readonly tokens: readonly string[];
  readonly title: string;
  readonly body: string;
  readonly data?: Readonly<Record<string, unknown>>;
  readonly priority?: 'high' | 'normal';
  readonly silent?: boolean;
}

export interface SendPushToTopicPayload {
  readonly notificationId: string;
  readonly topic: string;
  readonly title: string;
  readonly body: string;
  readonly data?: Readonly<Record<string, unknown>>;
}

export interface RetryPushPayload {
  readonly notificationId: string;
  readonly attempt: number;
}

export interface CleanupInvalidTokensPayload {
  readonly tokens: readonly string[];
  readonly reason: string;
}

@Injectable()
export class PushQueue {
  private readonly logger = new Logger(PushQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueSend(payload: SendPushPayload): Promise<string> {
    const priority =
      payload.priority === 'high' ? QUEUE_PRIORITY.HIGH : QUEUE_PRIORITY.NORMAL;
    const jobId = await this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.PUSH,
      NOTIFICATION_JOB_NAME.SEND_PUSH,
      payload as unknown as Record<string, unknown>,
      {
        priority,
        jobId: `push:${payload.notificationId}`,
      },
    );
    this.logger.debug(`enqueueSend push=${payload.notificationId} tokens=${payload.tokens.length}`);
    return jobId;
  }

  async enqueueSendToTopic(payload: SendPushToTopicPayload): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.PUSH,
      NOTIFICATION_JOB_NAME.SEND_PUSH_TO_TOPIC,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.NORMAL,
        jobId: `push:topic:${payload.topic}:${payload.notificationId}`,
      },
    );
  }

  async enqueueRetry(payload: RetryPushPayload, delayMs: number = 30_000): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.PUSH,
      NOTIFICATION_JOB_NAME.RETRY_PUSH,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.HIGH,
        delayMs,
        jobId: `push:retry:${payload.notificationId}:${payload.attempt}`,
      },
    );
  }

  async enqueueTokenCleanup(payload: CleanupInvalidTokensPayload): Promise<string> {
    return this.queueService.enqueue(
      NOTIFICATION_QUEUE_NAME.PUSH,
      NOTIFICATION_JOB_NAME.CLEANUP_INVALID_TOKENS,
      payload as unknown as Record<string, unknown>,
      {
        priority: QUEUE_PRIORITY.BACKGROUND,
        jobId: `push:cleanup:${Date.now()}`,
      },
    );
  }
}
