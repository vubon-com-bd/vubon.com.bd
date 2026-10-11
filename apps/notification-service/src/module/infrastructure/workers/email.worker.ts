/**
 * EmailWorker — sends emails via real email provider (Resend/SMTP)
 * @module notification-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import {
  NOTIFICATION_QUEUE_NAME,
  NOTIFICATION_JOB_NAME,
} from '../queues/queue.constants.js';
import { EmailQueue } from '../queues/email.queue.js';
import { DeliveryQueue } from '../queues/delivery.queue.js';
import type { SendEmailPayload, RetryEmailPayload } from '../queues/email.queue.js';
import {
  EMAIL_PROVIDER_RESOLVER,
  type IEmailProviderResolver,
} from '../providers/email/email-provider.resolver.js';
import {
  NOTIFICATION_REPOSITORY,
  type NotificationRepository,
} from '../../domain/repositories/notification.repository.interface.js';
import { NotificationIdVO } from '../../domain/value-objects/primitives/notification-id.vo.js';
import { DeliveryFailureReasonVO } from '../../domain/value-objects/primitives/delivery-failure-reason.vo.js';

const MAX_ATTEMPTS = 3;
const BACKOFF_MS = [60_000, 300_000, 1_800_000] as const;

@Injectable()
export class EmailWorker extends BaseWorker<SendEmailPayload | RetryEmailPayload> {
  protected readonly queueName = NOTIFICATION_QUEUE_NAME.EMAIL;
  protected readonly jobNames = [
    NOTIFICATION_JOB_NAME.SEND_EMAIL,
    NOTIFICATION_JOB_NAME.RETRY_EMAIL,
  ] as const;

  constructor(
    queueService: QueueService,
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly notificationRepo: NotificationRepository,
    @Inject(EMAIL_PROVIDER_RESOLVER)
    private readonly providerResolver: IEmailProviderResolver,
    private readonly emailQueue: EmailQueue,
    private readonly deliveryQueue: DeliveryQueue,
  ) {
    super(queueService, 'EmailWorker');
  }

  protected async handle(
    payload: SendEmailPayload | RetryEmailPayload,
  ): Promise<unknown> {
    const { notificationId } = payload;
    const attempt = 'attempt' in payload ? payload.attempt : 1;
    this.logger.log(`Send email ${notificationId} (attempt ${attempt})`);

    const vo = NotificationIdVO.create(notificationId);
    const notification = await this.notificationRepo.findByIdVO(vo);
    if (!notification) {
      this.logger.warn(`Notification ${notificationId} not found — dropping email`);
      return { skipped: true, reason: 'not_found' };
    }

    const now = new Date().toISOString();
    const to =
      'to' in payload ? payload.to : [notification.recipient.email?.value ?? ''];

    try {
      notification.startSending('email-resolver', now);

      const preferred = notification.provider;
      const result = await this.providerResolver.send(
        {
          to: to.filter(Boolean),
          subject: notification.content.title.value,
          text: notification.content.body.value,
        },
        preferred,
      );

      if (result.success) {
        notification.markSent(result.providerMessageId, now);
        await this.notificationRepo.save(notification);
        await this.deliveryQueue.enqueueRecordAttempt({
          notificationId,
          channel: 'email',
          provider: preferred ?? 'auto',
          attempt,
          success: true,
          providerMessageId: result.providerMessageId,
        });
        return { sent: true, messageId: result.providerMessageId };
      }

      throw new Error(result.error ?? 'unknown email error');
    } catch (err) {
      const reason = (err as Error).message;
      this.logger.warn(`Email send failed for ${notificationId}: ${reason}`);
      notification.fail(DeliveryFailureReasonVO.gatewayError(), now);
      await this.notificationRepo.save(notification);
      await this.deliveryQueue.enqueueRecordAttempt({
        notificationId,
        channel: 'email',
        provider: notification.provider ?? 'auto',
        attempt,
        success: false,
        failureReason: reason,
      });

      if (attempt < MAX_ATTEMPTS) {
        const delay = BACKOFF_MS[attempt - 1] ?? BACKOFF_MS[BACKOFF_MS.length - 1];
        await this.emailQueue.enqueueRetry(
          { notificationId, attempt: attempt + 1 },
          delay,
        );
        this.logger.log(`Scheduled email retry in ${delay}ms for ${notificationId}`);
      } else {
        this.logger.error(`Email retry exhausted for ${notificationId}`);
      }
      return { retried: attempt < MAX_ATTEMPTS };
    }
  }
}
