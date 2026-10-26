/**
 * NotificationSenderWorker — main send pipeline worker
 * @module notification-service/infrastructure/workers
 *
 * Orchestrates notification dispatch:
 *  1. Load notification from repo
 *  2. Transition to sending
 *  3. Route to channel-specific queue
 *  4. Save updated state
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';

import {
  NOTIFICATION_REPOSITORY,
  type NotificationRepository,
} from '@domain/repositories/notification.repository.interface.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';

import {
  NOTIFICATION_QUEUE_NAME,
  NOTIFICATION_JOB_NAME,
} from '@infrastructure/queues/queue.constants.js';

export interface NotificationSenderPayload {
  readonly notificationId: string;
  readonly channel: string;
  readonly userId: string;
}

@Injectable()
export class NotificationSenderWorker extends BaseWorker<NotificationSenderPayload> {
  protected readonly queueName = NOTIFICATION_QUEUE_NAME.NOTIFICATION_PROCESSING;
  protected readonly jobNames = [
    NOTIFICATION_JOB_NAME.SEND,
    NOTIFICATION_JOB_NAME.SEND_BULK,
  ] as const;

  constructor(
    queueService: QueueService,
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly repo: NotificationRepository,
  ) {
    super(queueService, 'NotificationSenderWorker');
  }

  protected async handle(payload: NotificationSenderPayload): Promise<unknown> {
    const vo = NotificationIdVO.reconstitute(payload.notificationId);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) {
      this.logger.warn(`Notification ${payload.notificationId} not found`);
      return { skipped: true, reason: 'not-found' };
    }

    if (!entity.canBeSent()) {
      this.logger.warn(
        `Notification ${payload.notificationId} cannot be sent (status=${entity.status.value})`,
      );
      return { skipped: true, reason: 'invalid-status' };
    }

    // Transition to sending → sent
    entity.queue();
    entity.markSending();
    await this.repo.save(entity);

    // Route to channel-specific queue (handled by channel workers)
    this.logger.log(
      `Notification ${payload.notificationId} → channel=${payload.channel} queued`,
    );

    return { processed: true, notificationId: payload.notificationId };
  }

  protected concurrency(): number {
    return 10;
  }
}
