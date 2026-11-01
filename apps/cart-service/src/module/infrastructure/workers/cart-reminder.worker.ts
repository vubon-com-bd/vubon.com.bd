/**
 * CartReminderWorker — sends abandoned cart reminders
 * @module cart-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { CART_QUEUE_NAME, CART_JOB_NAME } from '../queues/queue.constants.js';
import type { SendReminderPayload } from '../queues/reminder.queue.js';
import {
  ABANDONED_CART_REPOSITORY,
  type AbandonedCartRepository,
} from '../../domain/repositories/abandoned-cart.repository.interface.js';
import { AbandonedCartIdVO } from '../../domain/value-objects/primitives/abandoned-cart-id.vo.js';

@Injectable()
export class CartReminderWorker extends BaseWorker<SendReminderPayload> {
  protected readonly queueName = CART_QUEUE_NAME.CART_REMINDER;
  protected readonly jobNames = [CART_JOB_NAME.SEND_REMINDER] as const;

  constructor(
    queueService: QueueService,
    @Inject(ABANDONED_CART_REPOSITORY)
    private readonly repo: AbandonedCartRepository,
  ) {
    super(queueService, 'CartReminderWorker');
  }

  protected async handle(payload: SendReminderPayload): Promise<unknown> {
    const vo = AbandonedCartIdVO.create(payload.abandonedCartId);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) return { skipped: true };

    if (!entity.canSendReminder()) {
      return { skipped: true, reason: 'cannot send reminder' };
    }

    entity.sendReminder(payload.channel);
    await this.repo.save(entity);
    this.logger.log(
      `Reminder sent to abandoned cart ${payload.abandonedCartId} via ${payload.channel}`,
    );
    return { sent: true };
  }
}
