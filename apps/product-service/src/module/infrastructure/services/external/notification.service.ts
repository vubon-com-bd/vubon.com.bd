/**
 * NotificationService — publishes notifications via messaging queue.
 * @module product-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';

export interface NotificationPayload {
  readonly type: string;
  readonly recipientId: string;
  readonly subject: string;
  readonly body: string;
  readonly metadata?: Record<string, unknown>;
}

export const NOTIFICATION_SERVICE = Symbol('NOTIFICATION_SERVICE');

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  async send(payload: NotificationPayload): Promise<void> {
    this.logger.debug(`Notification [${payload.type}] → ${payload.recipientId}: ${payload.subject}`);
    // In real impl: enqueue to BullMQ notification queue
  }

  async notifyLowStock(productId: string, currentStock: number): Promise<void> {
    await this.send({
      type: 'inventory.low_stock',
      recipientId: 'admin',
      subject: 'Low stock alert',
      body: `Product ${productId} stock is now ${currentStock}`,
      metadata: { productId, currentStock },
    });
  }

  async notifyOutOfStock(productId: string): Promise<void> {
    await this.send({
      type: 'inventory.out_of_stock',
      recipientId: 'admin',
      subject: 'Out of stock alert',
      body: `Product ${productId} is out of stock`,
      metadata: { productId },
    });
  }
}
