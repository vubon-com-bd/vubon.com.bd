/**
 * StockSyncWorker — checks stock availability
 * @module cart-service/infrastructure/workers
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { CART_QUEUE_NAME, CART_JOB_NAME } from '../queues/queue.constants.js';
import {
  CART_ITEM_REPOSITORY,
  type CartItemRepository,
} from '../../domain/repositories/cart-item.repository.interface.js';
import { StockCheckService } from '../../domain/services/stock-check.service.js';

export interface SyncStockPayload {
  readonly cartId: string;
  readonly productIds: readonly string[];
}

@Injectable()
export class StockSyncWorker extends BaseWorker<SyncStockPayload> {
  protected readonly queueName = CART_QUEUE_NAME.CART_STOCK_SYNC;
  protected readonly jobNames = [CART_JOB_NAME.SYNC_STOCK] as const;
  private readonly stockLogger = new Logger(StockSyncWorker.name);

  constructor(
    queueService: QueueService,
    @Inject(CART_ITEM_REPOSITORY)
    private readonly itemRepo: CartItemRepository,
  ) {
    super(queueService, 'StockSyncWorker');
  }

  protected async handle(payload: SyncStockPayload): Promise<unknown> {
    const items = await this.itemRepo.findByCartId(payload.cartId);
    const result = StockCheckService.check(items, []);
    this.stockLogger.log(
      `Stock check for ${payload.cartId}: ${result.unavailable.length} unavailable, ${result.insufficient.length} insufficient`,
    );
    return { unavailable: result.unavailable.length, insufficient: result.insufficient.length };
  }
}
