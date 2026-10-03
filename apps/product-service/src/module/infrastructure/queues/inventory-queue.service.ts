/**
 * InventoryQueueService
 * @module product-service/infrastructure/queues
 */
import { Injectable } from '@nestjs/common';
import { QueueFactory } from './queue.factory.js';
import { INVENTORY_QUEUE, JOB_TYPES } from './queue.constants.js';

export const INVENTORY_QUEUE_SERVICE = Symbol('INVENTORY_QUEUE_SERVICE');

@Injectable()
export class InventoryQueueService {
  constructor(private readonly factory: QueueFactory) {}

  async scheduleLowStockAlert(inventoryId: string, productId: string, currentStock: number): Promise<void> {
    await this.factory.enqueue(
      INVENTORY_QUEUE,
      JOB_TYPES.INVENTORY_LOW_STOCK_ALERT,
      { inventoryId, productId, currentStock },
    );
  }

  async scheduleOutOfStockAlert(inventoryId: string, productId: string): Promise<void> {
    await this.factory.enqueue(
      INVENTORY_QUEUE,
      JOB_TYPES.INVENTORY_OUT_OF_STOCK_ALERT,
      { inventoryId, productId },
    );
  }

  async scheduleReserveExpiry(inventoryId: string, amount: number, delayMs: number): Promise<void> {
    const queue = this.factory.getQueue(INVENTORY_QUEUE);
    await queue.add(
      JOB_TYPES.INVENTORY_RESERVE_EXPIRY,
      { inventoryId, amount },
      { delay: delayMs, jobId: `reserve-expiry-${inventoryId}-${Date.now()}` },
    );
  }
}
