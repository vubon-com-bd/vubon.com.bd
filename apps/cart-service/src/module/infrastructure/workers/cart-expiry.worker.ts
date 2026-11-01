/**
 * CartExpiryWorker — expires stale carts
 * @module cart-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { CART_QUEUE_NAME, CART_JOB_NAME } from '../queues/queue.constants.js';
import type { ExpireCartPayload } from '../queues/cart.queue.js';
import {
  CART_REPOSITORY,
  type CartRepository,
} from '../../domain/repositories/cart.repository.interface.js';
import { CartIdVO } from '../../domain/value-objects/primitives/cart-id.vo.js';

@Injectable()
export class CartExpiryWorker extends BaseWorker<ExpireCartPayload> {
  protected readonly queueName = CART_QUEUE_NAME.CART_LIFECYCLE;
  protected readonly jobNames = [CART_JOB_NAME.EXPIRE_CART] as const;

  constructor(
    queueService: QueueService,
    @Inject(CART_REPOSITORY)
    private readonly repo: CartRepository,
  ) {
    super(queueService, 'CartExpiryWorker');
  }

  protected async handle(payload: ExpireCartPayload): Promise<unknown> {
    const vo = CartIdVO.create(payload.cartId);
    const cart = await this.repo.findByIdVO(vo);
    if (!cart) return { skipped: true };

    if (cart.isFinal()) return { skipped: true, reason: 'already final' };

    cart.expire();
    await this.repo.save(cart);
    this.logger.log(`Cart ${payload.cartId} expired`);
    return { expired: true };
  }

  protected concurrency(): number {
    return 2;
  }
}
