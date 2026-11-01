/**
 * InventoryQueue — enqueue helpers for inventory synchronization
 * @module product-service/infrastructure/queues
 */
import { Injectable, Logger } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';
import {
  PRODUCT_QUEUE_NAME,
  PRODUCT_JOB_NAME,
} from './queue.constants.js';

export interface SyncInventoryPayload {
  readonly inventoryId: string;
  readonly productId: string;
  readonly variantId?: string;
}

export interface LowStockAlertPayload {
  readonly inventoryId: string;
  readonly productId: string;
  readonly currentStock: number;
  readonly threshold: number;
}

@Injectable()
export class InventoryQueue {
  private readonly logger = new Logger(InventoryQueue.name);

  constructor(private readonly queueService: QueueService) {}

  async enqueueSync(payload: SyncInventoryPayload, delayMs?: number): Promise<string> {
    return this.queueService.enqueue(
      PRODUCT_QUEUE_NAME.INVENTORY_SYNC,
      PRODUCT_JOB_NAME.SYNC_INVENTORY,
      payload,
      {
        priority: QUEUE_PRIORITY.HIGH,
        delayMs,
        jobId: `sync:${payload.inventoryId}`,
      },
    );
  }

  async enqueueLowStockAlert(payload: LowStockAlertPayload): Promise<string> {
    return this.queueService.enqueue(
      PRODUCT_QUEUE_NAME.INVENTORY_SYNC,
      PRODUCT_JOB_NAME.LOW_STOCK_ALERT,
      payload,
      {
        priority: QUEUE_PRIORITY.HIGH,
        jobId: `alert:${payload.inventoryId}:${Date.now()}`,
      },
    );
  }
}
