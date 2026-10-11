/**
 * SmsWorker — sends SMS via real SMS provider (Twilio/SSLWireless)
 * @module notification-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { NOTIFICATION_QUEUE_NAME, NOTIFICATION_JOB_NAME } from '../queues/queue.constants.js';
import { SmsQueue } from '../queues/sms.queue.js';
import { DeliveryQueue } from '../queues/delivery.queue.js';
import type { SendSmsPayload, RetrySmsPayload } from '../queues/sms.queue.js';
import {
  SMS_PROVIDER_RESOLVER,
  type ISmsProviderResolver,
} from '../providers/sms/sms-provider.resolver.js';
import {
  NOTIFICATION_REPOSITORY,
  type NotificationRepository,
} from '../../domain/repositories/notification.repository.interface.js';
import { NotificationIdVO } from '../../domain/value-objects/primitives/notification-id.vo.js';
import { DeliveryFailureReasonVO } from '../../domain/value-objects/primitives/delivery-failure-reason.vo.js';

const MAX_ATTEMPTS = 3;
const BACKOFF_MS = [30_000, 180_000, 600_000] as const;

@Injectable()
export class SmsWorker extends BaseWorker<SendSmsPayload | RetrySmsPayload> {
  protected readonly queueName = NOTIFICATION_QUEUE_NAME.SMS;
  protected readonly jobNames = [
    NOTIFICATION_JOB_NAME.SEND_SMS,
    NOTIFICATION_JOB_NAME.RETRY_SMS,
  ] as const;

  constructor(
    queueService: QueueService,
    @Inject(NOTIFICATION_REPOSITORY) private readonly notificationRepo: NotificationRepository,
    @Inject(SMS_PROVIDER_RESOLVER) private readonly providerResolver: ISmsProviderResolver,
    private readonly smsQueue: SmsQueue,
    private readonly deliveryQueue: DeliveryQueue,
  ) {
    super(queueService, 'SmsWorker');
  }

  protected async handle(payload: SendSmsPayload | RetrySmsPayload): Promise<unknown> {
    const { notificationId } = payload;
    const attempt = 'attempt' in payload ? payload.attempt : 1;

    const vo = NotificationIdVO.create(notificationId);
    const notification = await this.notificationRepo.findByIdVO(vo);
    if (!notification) return { skipped: true, reason: 'not_found' };

    const now = new Date().toISOString();
    const to = 'to' in payload ? payload.to : notification.recipient.phone?.value ?? '';

    try {
      notification.startSending('sms-resolver', now);

      const result = await this.providerResolver.send(
        {
          to,
          message: notification.content.body.value,
          type: 'transactional',
        },
        notification.provider,
      );

      if (result.success) {
        notification.markSent(result.providerMessageId, now);
        await this.notificationRepo.save(notification);
        await this.deliveryQueue.enqueueRecordAttempt({
          notificationId,
          channel: 'sms',
          provider: notification.provider ?? 'auto',
          attempt,
          success: true,
          providerMessageId: result.providerMessageId,
        });
        return { sent: true };
      }
      throw new Error(result.error ?? 'unknown sms error');
    } catch (err) {
      const reason = (err as Error).message;
      notification.fail(DeliveryFailureReasonVO.gatewayError(), now);
      await this.notificationRepo.save(notification);
      await this.deliveryQueue.enqueueRecordAttempt({
        notificationId,
        channel: 'sms',
        provider: notification.provider ?? 'auto',
        attempt,
        success: false,
        failureReason: reason,
      });

      if (attempt < MAX_ATTEMPTS) {
        const delay = BACKOFF_MS[attempt - 1] ?? BACKOFF_MS[BACKOFF_MS.length - 1];
        await this.smsQueue.enqueueRetry({ notificationId, attempt: attempt + 1 }, delay);
      }
      return { retried: attempt < MAX_ATTEMPTS };
    }
  }
}
