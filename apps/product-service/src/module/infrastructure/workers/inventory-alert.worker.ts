/**
 * InventoryAlertWorker — dispatches low/out-of-stock notifications.
 * @module product-service/infrastructure/workers
 */
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';
import { BaseWorker } from './base.worker.js';
import { INVENTORY_QUEUE, JOB_TYPES } from '../queues/queue.constants.js';
import { NotificationService } from '../services/external/notification.service.js';

interface InventoryAlertPayload {
  productId?: string;
  inventoryId?: string;
  currentStock?: number;
  amount?: number;
}

@Injectable()
export class InventoryAlertWorker extends BaseWorker {
  constructor(private readonly notifier: NotificationService) {
    super(INVENTORY_QUEUE, InventoryAlertWorker.name);
  }

  protected async handle(job: Job): Promise<void> {
    const data = job.data as InventoryAlertPayload;
    switch (job.name as string) {
      case JOB_TYPES.INVENTORY_LOW_STOCK_ALERT:
        if (data.productId) {
          await this.notifier.notifyLowStock(data.productId, data.currentStock ?? 0);
        }
        return;
      case JOB_TYPES.INVENTORY_OUT_OF_STOCK_ALERT:
        if (data.productId) {
          await this.notifier.notifyOutOfStock(data.productId);
        }
        return;
      case JOB_TYPES.INVENTORY_RESERVE_EXPIRY:
        this.logger.debug(`Reserve expiry processed for ${data.inventoryId ?? 'unknown'}`);
        return;
      default:
        this.logger.warn(`Unknown job: ${job.name}`);
    }
  }
}
