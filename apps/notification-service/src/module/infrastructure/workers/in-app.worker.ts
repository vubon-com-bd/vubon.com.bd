/**
 * InAppWorker — persists + prepares in-app notifications for delivery
 * @module notification-service/infrastructure/workers
 *
 * Note: realtime WebSocket broadcast is not yet wired (kernel has no WS module).
 * This worker persists and marks the notification as sent, so the REST inbox
 * endpoint serves it. When WS lands, `deliver-realtime` handles the broadcast.
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { NOTIFICATION_QUEUE_NAME, NOTIFICATION_JOB_NAME } from '../queues/queue.constants.js';
import type { SendInAppPayload } from '../queues/in-app.queue.js';
import {
  NOTIFICATION_REPOSITORY,
  type NotificationRepository,
} from '../../domain/repositories/notification.repository.interface.js';
import { NotificationIdVO } from '../../domain/value-objects/primitives/notification-id.vo.js';

@Injectable()
export class InAppWorker extends BaseWorker<SendInAppPayload> {
  protected readonly queueName = NOTIFICATION_QUEUE_NAME.NOTIFICATION;
  protected readonly jobNames = [
    NOTIFICATION_JOB_NAME.SEND_IN_APP,
  ] as const;

  constructor(
    queueService: QueueService,
    @Inject(NOTIFICATION_REPOSITORY) private readonly notificationRepo: NotificationRepository,
  ) {
    super(queueService, 'InAppWorker');
  }

  protected async handle(payload: SendInAppPayload): Promise<unknown> {
    const { notificationId, userId } = payload;
    this.logger.log(`In-app delivery for user=${userId} notification=${notificationId}`);

    const vo = NotificationIdVO.create(notificationId);
    const notification = await this.notificationRepo.findByIdVO(vo);
    if (!notification) return { skipped: true, reason: 'not_found' };

    const now = new Date().toISOString();
    notification.startSending('internal', now);
    notification.markSent(undefined, now);
    await this.notificationRepo.save(notification);

    return { delivered: true };
  }

  protected concurrency(): number {
    return 10;
  }
}
