/**
 * CartCleanupWorker — purges stale carts
 * @module cart-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { CART_QUEUE_NAME, CART_JOB_NAME } from '../queues/queue.constants.js';
import type { CleanupStalePayload } from '../queues/cart.queue.js';
import {
  CART_REPOSITORY,
  type CartRepository,
} from '../../domain/repositories/cart.repository.interface.js';

@Injectable()
export class CartCleanupWorker extends BaseWorker<CleanupStalePayload> {
  protected readonly queueName = CART_QUEUE_NAME.CART_LIFECYCLE;
  protected readonly jobNames = [CART_JOB_NAME.CLEANUP_STALE] as const;

  constructor(
    queueService: QueueService,
    @Inject(CART_REPOSITORY)
    private readonly repo: CartRepository,
  ) {
    super(queueService, 'CartCleanupWorker');
  }

  protected async handle(payload: CleanupStalePayload): Promise<unknown> {
    const stale = await this.repo.findStale(payload.inactiveMinutes);
    this.logger.log(`Found ${stale.length} stale carts`);
    return { cleaned: stale.length };
  }

  protected concurrency(): number {
    return 1;
  }
}
