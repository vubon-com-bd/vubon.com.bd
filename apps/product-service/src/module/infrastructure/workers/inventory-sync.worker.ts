/**
 * InventorySyncWorker
 * @module product-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import {
  PRODUCT_QUEUE_NAME,
  PRODUCT_JOB_NAME,
} from '../queues/queue.constants.js';
import type { SyncInventoryPayload } from '../queues/inventory.queue.js';
import {
  INVENTORY_REPOSITORY,
  type ProductInventoryRepository,
} from '../../domain/repositories/product-inventory.repository.interface.js';
import { InventoryIdVO } from '../../domain/value-objects/primitives/inventory-id.vo.js';

@Injectable()
export class InventorySyncWorker extends BaseWorker<SyncInventoryPayload> {
  protected readonly queueName = PRODUCT_QUEUE_NAME.INVENTORY_SYNC;
  protected readonly jobNames = [PRODUCT_JOB_NAME.SYNC_INVENTORY] as const;

  constructor(
    queueService: QueueService,
    @Inject(INVENTORY_REPOSITORY)
    private readonly repo: ProductInventoryRepository,
  ) {
    super(queueService, 'InventorySyncWorker');
  }

  protected async handle(payload: SyncInventoryPayload): Promise<unknown> {
    const vo = InventoryIdVO.create(payload.inventoryId);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) return { skipped: true, reason: 'not_found' };

    this.logger.log(
      `Inventory synced ${payload.inventoryId} — available=${entity.available.value}`,
    );
    return {
      synced: true,
      available: entity.available.value,
      status: entity.vo.status.value,
    };
  }

  protected concurrency(): number {
    return 5;
  }
}
