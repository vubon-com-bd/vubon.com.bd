/**
 * Notification Queue — email + SMS dispatch
 * @module identity-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import { AUTH_QUEUE_NAME, AUTH_JOB_NAME } from './queue.constants.js';

export interface SendEmailPayload {
  readonly to: string;
  readonly template: string;
  readonly variables: Readonly<Record<string, unknown>>;
}

export interface SendSmsPayload {
  readonly to: string;
  readonly message: string;
}

@Injectable()
export class NotificationQueue {
  private readonly logger = new Logger(NotificationQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueEmail(payload: SendEmailPayload): Promise<string> {
    try {
      return await this.queueService.enqueue(
        AUTH_QUEUE_NAME.NOTIFICATION,
        AUTH_JOB_NAME.SEND_EMAIL,
        payload as unknown as Record<string, unknown>,
        { priority: QUEUE_PRIORITY.NORMAL },
      );
    } catch (err) {
      this.logger.warn(`email enqueue failed: ${err instanceof Error ? err.message : 'unknown'}`);
      return '';
    }
  }

  async enqueueSms(payload: SendSmsPayload): Promise<string> {
    try {
      return await this.queueService.enqueue(
        AUTH_QUEUE_NAME.NOTIFICATION,
        AUTH_JOB_NAME.SEND_SMS,
        payload as unknown as Record<string, unknown>,
        { priority: QUEUE_PRIORITY.HIGH },
      );
    } catch (err) {
      this.logger.warn(`sms enqueue failed: ${err instanceof Error ? err.message : 'unknown'}`);
      return '';
    }
  }
}
