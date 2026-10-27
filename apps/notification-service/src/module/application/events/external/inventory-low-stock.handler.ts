/**
 * InventoryLowStockHandler — reacts to product.inventory.low_stock_alert
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL,
  NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE,
  NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';

import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const INVENTORY_LOW_STOCK_EVENT = 'product.inventory.low_stock_alert';

interface InventoryLowStockHandlerPayload {
  readonly productId: string;
  readonly available: number;
  readonly threshold: number;
}

interface InventoryLowStockHandlerEvent {
  readonly id: string;
  readonly type: 'product.inventory.low_stock_alert';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: InventoryLowStockHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class InventoryLowStockHandler implements OnModuleInit {
  private readonly logger = new Logger(InventoryLowStockHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(INVENTORY_LOW_STOCK_EVENT, async (event) => {
      await this.handle(event as unknown as InventoryLowStockHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${INVENTORY_LOW_STOCK_EVENT}"`);
  }

  private async handle(event: InventoryLowStockHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received product.inventory.low_stock_alert — ${JSON.stringify(payload)}`);

    try {
      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ALERT,
        category: NOTIFICATION_CATEGORY.PRODUCT,
        channels: [NOTIFICATION_CHANNEL.IN_APP],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: 'Low Stock Alert',
        body: `Product {productId} is running low. Available: {available}`,
        data: {
          eventType: 'product.inventory.low_stock_alert',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `inventorylowstock-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`InventoryLowStockHandler failed: ${msg}`);
    }
  }
}
