/**
 * SmsSenderWorker — SMS channel dispatch worker
 * @module notification-service/infrastructure/workers
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

export interface SmsSenderPayload {
  readonly notificationId: string;
  readonly to: string;
  readonly message: string;
  readonly senderId?: string;
}

@Injectable()
export class SmsSenderWorker extends BaseWorker<SmsSenderPayload> {
  protected readonly queueName = NOTIFICATION_QUEUE_NAME.SMS;
  protected readonly jobNames = [NOTIFICATION_JOB_NAME.SEND] as const;

  constructor(
    queueService: QueueService,
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly repo: NotificationRepository,
  ) {
    super(queueService, 'SmsSenderWorker');
  }

  protected async handle(payload: SmsSenderPayload): Promise<unknown> {
    const vo = NotificationIdVO.reconstitute(payload.notificationId);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) {
      this.logger.warn(`Notification ${payload.notificationId} not found`);
      return { skipped: true, reason: 'not-found' };
    }

    this.logger.log(
      `📱 SMS send → notification=${payload.notificationId} to=${payload.to} length=${payload.message.length}`,
    );

    entity.markSent();
    await this.repo.save(entity);
    return { processed: true, channel: 'sms', to: payload.to };
  }

  protected concurrency(): number {
    return 10;
  }
}
