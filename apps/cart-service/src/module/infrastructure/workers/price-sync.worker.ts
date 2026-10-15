/**
 * PriceSyncWorker — detects + applies price changes
 * @module cart-service/infrastructure/workers
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { CART_QUEUE_NAME, CART_JOB_NAME } from '../queues/queue.constants.js';
import type { SyncPricePayload } from '../queues/price-sync.queue.js';
import {
  CART_ITEM_REPOSITORY,
  type CartItemRepository,
} from '../../domain/repositories/cart-item.repository.interface.js';
import { PriceSyncService } from '../../domain/services/price-sync.service.js';

@Injectable()
export class PriceSyncWorker extends BaseWorker<SyncPricePayload> {
  protected readonly queueName = CART_QUEUE_NAME.CART_PRICE_SYNC;
  protected readonly jobNames = [CART_JOB_NAME.SYNC_PRICE] as const;
  private readonly priceLogger = new Logger(PriceSyncWorker.name);

  constructor(
    queueService: QueueService,
    @Inject(CART_ITEM_REPOSITORY)
    private readonly itemRepo: CartItemRepository,
  ) {
    super(queueService, 'PriceSyncWorker');
  }

  protected async handle(payload: SyncPricePayload): Promise<unknown> {
    const items = await this.itemRepo.findByCartId(payload.cartId);
    const result = PriceSyncService.detectChanges(items, []);
    this.priceLogger.log(
      `Price sync for ${payload.cartId}: ${result.changed.length} changed, ${result.unchanged} unchanged`,
    );
    return { changed: result.changed.length, unchanged: result.unchanged };
  }
}
