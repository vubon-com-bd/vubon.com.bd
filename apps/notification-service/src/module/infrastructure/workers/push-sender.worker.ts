/**
 * PushSenderWorker — push notification channel dispatch
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

export interface PushSenderPayload {
  readonly notificationId: string;
  readonly tokens: readonly string[];
  readonly title: string;
  readonly body: string;
  readonly data?: Readonly<Record<string, unknown>>;
  readonly silent?: boolean;
}

@Injectable()
export class PushSenderWorker extends BaseWorker<PushSenderPayload> {
  protected readonly queueName = NOTIFICATION_QUEUE_NAME.PUSH;
  protected readonly jobNames = [NOTIFICATION_JOB_NAME.SEND] as const;

  constructor(
    queueService: QueueService,
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly repo: NotificationRepository,
  ) {
    super(queueService, 'PushSenderWorker');
  }

  protected async handle(payload: PushSenderPayload): Promise<unknown> {
    const vo = NotificationIdVO.reconstitute(payload.notificationId);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) {
      this.logger.warn(`Notification ${payload.notificationId} not found`);
      return { skipped: true, reason: 'not-found' };
    }

    this.logger.log(
      `🔔 Push send → notification=${payload.notificationId} tokens=${payload.tokens.length} title="${payload.title}"`,
    );

    entity.markSent();
    await this.repo.save(entity);
    return {
      processed: true,
      channel: 'push',
      tokenCount: payload.tokens.length,
    };
  }

  protected concurrency(): number {
    return 50;
  }
}
