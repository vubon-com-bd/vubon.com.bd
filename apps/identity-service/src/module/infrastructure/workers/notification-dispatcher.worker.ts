/**
 * NotificationDispatcherWorker — dispatches notifications for user events
 * @module identity-service/infrastructure/workers
 */
import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { AUTH_QUEUE_NAME, AUTH_JOB_NAME } from '../queues/queue.constants.js';

export interface NotificationDispatchPayload {
  readonly userId: string;
  readonly template: string;
  readonly channel?: 'email' | 'sms' | 'push';
  readonly data?: Readonly<Record<string, unknown>>;
}

@Injectable()
export class NotificationDispatcherWorker extends BaseWorker<NotificationDispatchPayload> {
  protected readonly queueName = AUTH_QUEUE_NAME.NOTIFICATION;
  protected readonly jobNames = [
    AUTH_JOB_NAME.SEND_EMAIL,
    AUTH_JOB_NAME.SEND_SMS,
  ] as const;

  constructor(queueService: QueueService) {
    super(queueService, 'NotificationDispatcherWorker');
  }

  protected async handle(payload: NotificationDispatchPayload): Promise<unknown> {
    this.logger.debug(
      `Dispatching ${payload.template} to user ${payload.userId} via ${payload.channel ?? 'default'}`,
    );
    return { dispatched: true, template: payload.template };
  }

  protected concurrency(): number {
    return 4;
  }
}
