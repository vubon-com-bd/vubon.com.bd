/**
 * NotificationDispatcherWorker — dispatches queued notifications to channel services
 * @module notification-service/infrastructure/workers
 *
 * Jobs: dispatch-notification, process-queued, process-scheduled
 * Logic:
 *  1. Load notification entity
 *  2. Route by channel → email/sms/push/in-app queue
 *  3. Mark notification as sending
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import {
  NOTIFICATION_QUEUE_NAME,
  NOTIFICATION_JOB_NAME,
} from '../queues/queue.constants.js';
import type { DispatchNotificationPayload } from '../queues/notification.queue.js';
import { NotificationQueue } from '../queues/notification.queue.js';
import { EmailQueue } from '../queues/email.queue.js';
import { SmsQueue } from '../queues/sms.queue.js';
import { PushQueue } from '../queues/push.queue.js';
import { InAppQueue } from '../queues/in-app.queue.js';
import {
  NOTIFICATION_REPOSITORY,
  type NotificationRepository,
} from '../../domain/repositories/notification.repository.interface.js';
import { NotificationIdVO } from '../../domain/value-objects/primitives/notification-id.vo.js';

@Injectable()
export class NotificationDispatcherWorker extends BaseWorker<DispatchNotificationPayload> {
  protected readonly queueName = NOTIFICATION_QUEUE_NAME.NOTIFICATION;
  protected readonly jobNames = [
    NOTIFICATION_JOB_NAME.DISPATCH_NOTIFICATION,
    NOTIFICATION_JOB_NAME.PROCESS_QUEUED,
    NOTIFICATION_JOB_NAME.PROCESS_SCHEDULED,
  ] as const;

  constructor(
    queueService: QueueService,
    @Inject(NOTIFICATION_REPOSITORY) private readonly notificationRepo: NotificationRepository,
    private readonly notificationQueue: NotificationQueue,
    private readonly emailQueue: EmailQueue,
    private readonly smsQueue: SmsQueue,
    private readonly pushQueue: PushQueue,
    private readonly inAppQueue: InAppQueue,
  ) {
    super(queueService, 'NotificationDispatcherWorker');
  }

  protected async handle(payload: DispatchNotificationPayload): Promise<unknown> {
    const { notificationId, channel, userId } = payload;
    this.logger.log(`Dispatch ${notificationId} → channel=${channel} user=${userId}`);

    const vo = NotificationIdVO.create(notificationId);
    const notification = await this.notificationRepo.findByIdVO(vo);
    if (!notification) {
      this.logger.warn(`Notification ${notificationId} not found — dropping dispatch`);
      return { skipped: true, reason: 'not_found' };
    }

    if (!notification.isPending() && !notification.isQueued() && !notification.isScheduled()) {
      this.logger.warn(
        `Notification ${notificationId} not in dispatchable state (${notification.status.value})`,
      );
      return { skipped: true, reason: 'wrong_status' };
    }

    // Route to channel-specific queue
    try {
      switch (channel) {
        case 'email':
          await this.emailQueue.enqueueSend({
            notificationId,
            to: [notification.recipient.email?.value ?? ''],
            subject: notification.content.title.value,
            text: notification.content.body.value,
          });
          break;
        case 'sms':
          await this.smsQueue.enqueueSend({
            notificationId,
            to: notification.recipient.phone?.value ?? '',
            message: notification.content.body.value,
          });
          break;
        case 'push':
          await this.pushQueue.enqueueSend({
            notificationId,
            tokens: notification.recipient.deviceToken
              ? [notification.recipient.deviceToken.value]
              : [],
            title: notification.content.title.value,
            body: notification.content.body.value,
            data: notification.data ?? undefined,
          });
          break;
        case 'in_app':
          await this.inAppQueue.enqueueSend({
            notificationId,
            userId,
            title: notification.content.title.value,
            body: notification.content.body.value,
            type: notification.type.value,
          });
          break;
        default:
          this.logger.warn(`Unknown channel "${channel}" for ${notificationId}`);
      }

      notification.queue();
      await this.notificationRepo.save(notification);
      return { dispatched: true, channel };
    } catch (err) {
      this.logger.error(
        `Dispatch failed for ${notificationId}: ${(err as Error).message}`,
      );
      throw err;
    }
  }
}
