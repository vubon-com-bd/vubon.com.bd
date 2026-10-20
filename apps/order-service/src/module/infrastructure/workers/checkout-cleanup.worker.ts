/**
 * CheckoutCleanupWorker — cleans up abandoned checkouts
 * @module order-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { ORDER_QUEUE_NAME, ORDER_JOB_NAME } from '../queues/queue.constants.js';
import {
  CHECKOUT_REPOSITORY,
  type CheckoutRepository,
} from '../../domain/repositories/checkout.repository.interface.js';

interface CleanupCheckoutPayload {
  readonly checkoutId: string;
}

@Injectable()
export class CheckoutCleanupWorker extends BaseWorker<CleanupCheckoutPayload> {
  protected readonly queueName = ORDER_QUEUE_NAME.CLEANUP;
  protected readonly jobNames = [ORDER_JOB_NAME.CLEANUP_CHECKOUT] as const;

  constructor(
    queueService: QueueService,
    @Inject(CHECKOUT_REPOSITORY)
    private readonly repo: CheckoutRepository,
  ) {
    super(queueService, 'CheckoutCleanupWorker');
  }

  protected async handle(payload: CleanupCheckoutPayload): Promise<unknown> {
    const entity = await this.repo.findById(payload.checkoutId);
    if (!entity) return { skipped: true };
    if (entity.isExpired()) {
      await this.repo.softDelete(payload.checkoutId);
      this.logger.log(`Cleaned up expired checkout ${payload.checkoutId}`);
      return { cleaned: true };
    }
    return { cleaned: false };
  }
}
