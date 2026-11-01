/**
 * InAppSenderWorker — in-app notification channel dispatch
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

export interface InAppSenderPayload {
  readonly notificationId: string;
  readonly userId: string;
  readonly title: string;
  readonly body: string;
  readonly imageUrl?: string;
  readonly actions?: readonly {
    readonly id: string;
    readonly label: string;
    readonly url?: string;
  }[];
}

@Injectable()
export class InAppSenderWorker extends BaseWorker<InAppSenderPayload> {
  protected readonly queueName = NOTIFICATION_QUEUE_NAME.IN_APP;
  protected readonly jobNames = [NOTIFICATION_JOB_NAME.SEND] as const;

  constructor(
    queueService: QueueService,
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly repo: NotificationRepository,
  ) {
    super(queueService, 'InAppSenderWorker');
  }

  protected async handle(payload: InAppSenderPayload): Promise<unknown> {
    const vo = NotificationIdVO.reconstitute(payload.notificationId);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) {
      this.logger.warn(`Notification ${payload.notificationId} not found`);
      return { skipped: true, reason: 'not-found' };
    }

    this.logger.log(
      `📬 In-app send → notification=${payload.notificationId} user=${payload.userId}`,
    );

    entity.markSent();
    await this.repo.save(entity);
    return { processed: true, channel: 'in-app', userId: payload.userId };
  }

  protected concurrency(): number {
    return 30;
  }
}
