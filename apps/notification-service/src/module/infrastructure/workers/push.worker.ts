/**
 * PushWorker — sends push via real push provider (FCM/WebPush)
 * @module notification-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { NOTIFICATION_QUEUE_NAME, NOTIFICATION_JOB_NAME } from '../queues/queue.constants.js';
import { PushQueue } from '../queues/push.queue.js';
import { DeliveryQueue } from '../queues/delivery.queue.js';
import type { SendPushPayload, RetryPushPayload } from '../queues/push.queue.js';
import {
  PUSH_PROVIDER_RESOLVER,
  type IPushProviderResolver,
} from '../providers/push/push-provider.resolver.js';
import {
  NOTIFICATION_REPOSITORY,
  type NotificationRepository,
} from '../../domain/repositories/notification.repository.interface.js';
import { NotificationIdVO } from '../../domain/value-objects/primitives/notification-id.vo.js';
import { DeliveryFailureReasonVO } from '../../domain/value-objects/primitives/delivery-failure-reason.vo.js';

const MAX_ATTEMPTS = 3;
const BACKOFF_MS = [30_000, 120_000, 600_000] as const;

@Injectable()
export class PushWorker extends BaseWorker<SendPushPayload | RetryPushPayload> {
  protected readonly queueName = NOTIFICATION_QUEUE_NAME.PUSH;
  protected readonly jobNames = [
    NOTIFICATION_JOB_NAME.SEND_PUSH,
    NOTIFICATION_JOB_NAME.RETRY_PUSH,
  ] as const;

  constructor(
    queueService: QueueService,
    @Inject(NOTIFICATION_REPOSITORY) private readonly notificationRepo: NotificationRepository,
    @Inject(PUSH_PROVIDER_RESOLVER) private readonly providerResolver: IPushProviderResolver,
    private readonly pushQueue: PushQueue,
    private readonly deliveryQueue: DeliveryQueue,
  ) {
    super(queueService, 'PushWorker');
  }

  protected async handle(payload: SendPushPayload | RetryPushPayload): Promise<unknown> {
    const { notificationId } = payload;
    const attempt = 'attempt' in payload ? payload.attempt : 1;

    const vo = NotificationIdVO.create(notificationId);
    const notification = await this.notificationRepo.findByIdVO(vo);
    if (!notification) return { skipped: true, reason: 'not_found' };

    const tokens = 'tokens' in payload
      ? payload.tokens
      : notification.recipient.deviceToken
        ? [notification.recipient.deviceToken.value]
        : [];

    if (tokens.length === 0) return { skipped: true, reason: 'no_tokens' };

    const now = new Date().toISOString();
    let successCount = 0;
    let failureCount = 0;

    for (const token of tokens) {
      try {
        notification.startSending('push-resolver', now);
        const result = await this.providerResolver.send(
          {
            token,
            title: notification.content.title.value,
            body: notification.content.body.value,
            data: notification.data ?? undefined,
          },
          notification.provider,
        );
        if (result.success) successCount++;
        else failureCount++;
      } catch (err) {
        this.logger.warn(`Push failed: ${(err as Error).message}`);
        failureCount++;
      }
    }

    if (successCount > 0) {
      notification.markSent(undefined, now);
    } else {
      notification.fail(DeliveryFailureReasonVO.invalidToken(), now);
    }
    await this.notificationRepo.save(notification);

    await this.deliveryQueue.enqueueRecordAttempt({
      notificationId,
      channel: 'push',
      provider: notification.provider ?? 'auto',
      attempt,
      success: successCount > 0,
      failureReason: successCount === 0 ? 'all_tokens_failed' : undefined,
    });

    if (successCount === 0 && attempt < MAX_ATTEMPTS) {
      const delay = BACKOFF_MS[attempt - 1] ?? BACKOFF_MS[BACKOFF_MS.length - 1];
      await this.pushQueue.enqueueRetry({ notificationId, attempt: attempt + 1 }, delay);
    }

    this.logger.log(`Push ${notificationId}: ${successCount} ok / ${failureCount} fail`);
    return { successCount, failureCount };
  }
}
