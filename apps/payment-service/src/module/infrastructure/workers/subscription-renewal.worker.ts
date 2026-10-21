/**
 * SubscriptionRenewalWorker — renews subscriptions at period end
 * @module payment-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { PAYMENT_QUEUE_NAME, PAYMENT_JOB_NAME } from '../queues/queue.constants.js';
import type { SubscriptionPayload } from '../queues/subscription.queue.js';
import {
  SUBSCRIPTION_REPOSITORY,
  type SubscriptionRepository,
} from '@domain/repositories/subscription.repository.interface';
import { SubscriptionIdVO } from '@domain/primitives/subscription-id.vo';
import { RecurringScheduleService } from '@domain/services/recurring-schedule.service';

@Injectable()
export class SubscriptionRenewalWorker extends BaseWorker<SubscriptionPayload> {
  protected readonly queueName = PAYMENT_QUEUE_NAME.SUBSCRIPTION;

  constructor(
    queueService: QueueService,
    @Inject(SUBSCRIPTION_REPOSITORY)
    private readonly repo: SubscriptionRepository,
  ) {
    super(queueService, `${PAYMENT_JOB_NAME.RENEW_SUBSCRIPTION}-worker`);
  }

  protected async handle(payload: SubscriptionPayload): Promise<unknown> {
    const vo = SubscriptionIdVO.create(payload.subscriptionId);
    const sub = await this.repo.findByIdVO(vo);
    if (!sub) return { skipped: true };
    if (!sub.isActive()) return { skipped: true, reason: `status=${sub.status.value}` };

    const nextEnd = RecurringScheduleService.advance(
      new Date(sub.currentPeriodEnd),
      sub.frequency,
    ).toISOString();

    sub.renew(nextEnd);
    await this.repo.save(sub);
    this.logger.log(`Subscription ${sub.id} renewed until ${nextEnd}`);
    return { renewed: true, periodEnd: nextEnd };
  }
}
