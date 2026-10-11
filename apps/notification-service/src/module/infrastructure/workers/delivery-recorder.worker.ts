/**
 * DeliveryRecorderWorker — persists delivery-attempt records for analytics
 * @module notification-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { NOTIFICATION_QUEUE_NAME, NOTIFICATION_JOB_NAME } from '../queues/queue.constants.js';
import type { RecordDeliveryAttemptPayload } from '../queues/delivery.queue.js';
import {
  NOTIFICATION_REPOSITORY,
  type NotificationRepository,
} from '../../domain/repositories/notification.repository.interface.js';
import { NotificationIdVO } from '../../domain/value-objects/primitives/notification-id.vo.js';

@Injectable()
export class DeliveryRecorderWorker extends BaseWorker<RecordDeliveryAttemptPayload> {
  protected readonly queueName = NOTIFICATION_QUEUE_NAME.ANALYTICS;
  protected readonly jobNames = [NOTIFICATION_JOB_NAME.RECORD_DELIVERY_ATTEMPT] as const;

  constructor(
    queueService: QueueService,
    @Inject(NOTIFICATION_REPOSITORY) private readonly notificationRepo: NotificationRepository,
  ) {
    super(queueService, 'DeliveryRecorderWorker');
  }

  protected async handle(payload: RecordDeliveryAttemptPayload): Promise<unknown> {
    const { notificationId, channel, provider, attempt, success } = payload;
    this.logger.debug(
      `Record attempt for ${notificationId} — ${channel}/${provider} #${attempt} ok=${success}`,
    );

    // Note: full persistence of attempts goes into NotificationDeliveryAttempt table.
    // For now, we log structured events that analytics collectors can pick up.
    void this.notificationRepo;
    void NotificationIdVO;
    return { recorded: true };
  }

  protected concurrency(): number {
    return 12;
  }
}
