/**
 * CartAbandonmentWorker — marks carts abandoned
 * @module cart-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { CART_QUEUE_NAME, CART_JOB_NAME } from '../queues/queue.constants.js';
import type { AbandonCartPayload } from '../queues/abandonment.queue.js';
import {
  CART_REPOSITORY,
  type CartRepository,
} from '../../domain/repositories/cart.repository.interface.js';
import { CartIdVO } from '../../domain/value-objects/primitives/cart-id.vo.js';

@Injectable()
export class CartAbandonmentWorker extends BaseWorker<AbandonCartPayload> {
  protected readonly queueName = CART_QUEUE_NAME.CART_ABANDONMENT;
  protected readonly jobNames = [CART_JOB_NAME.ABANDON_CART] as const;

  constructor(
    queueService: QueueService,
    @Inject(CART_REPOSITORY)
    private readonly repo: CartRepository,
  ) {
    super(queueService, 'CartAbandonmentWorker');
  }

  protected async handle(payload: AbandonCartPayload): Promise<unknown> {
    const vo = CartIdVO.create(payload.cartId);
    const cart = await this.repo.findByIdVO(vo);
    if (!cart) return { skipped: true };

    if (!cart.canBeAbandoned()) {
      return { skipped: true, reason: `cannot abandon status=${cart.status.value}` };
    }

    cart.abandon();
    await this.repo.save(cart);
    this.logger.log(`Cart ${payload.cartId} abandoned`);
    return { abandoned: true };
  }
}
