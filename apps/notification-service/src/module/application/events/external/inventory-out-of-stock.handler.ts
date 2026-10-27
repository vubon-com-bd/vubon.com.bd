/**
 * InventoryOutOfStockHandler — reacts to product.inventory.out_of_stock
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { I18nService } from '../../../domain/services/i18n.service.js';
import { resolveTemplate, getLocale } from './_handler-helpers.js';
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

export const INVENTORY_OUT_OF_STOCK_EVENT = 'product.inventory.out_of_stock';

interface InventoryOutOfStockHandlerPayload {
  readonly productId: string;
  readonly detectedAt: string;
}

interface InventoryOutOfStockHandlerEvent {
  readonly id: string;
  readonly type: 'product.inventory.out_of_stock';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: InventoryOutOfStockHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class InventoryOutOfStockHandler implements OnModuleInit {
  private readonly logger = new Logger(InventoryOutOfStockHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(INVENTORY_OUT_OF_STOCK_EVENT, async (event) => {
      await this.handle(event as unknown as InventoryOutOfStockHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${INVENTORY_OUT_OF_STOCK_EVENT}"`);
  }

  private async handle(event: InventoryOutOfStockHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received product.inventory.out_of_stock — ${JSON.stringify(payload)}`);

    try {
      const locale = getLocale(payload as unknown as Record<string, unknown>);
        const resolved = resolveTemplate(
          this.i18n,
          'REVIEW_POSTED',
          locale,
          {
            productId: (payload as any).productId
          },
          {
            subject: 'Out of Stock',
            body: 'Product {{productId}} is now out of stock.',
          },
        );

        const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ALERT,
        category: NOTIFICATION_CATEGORY.PRODUCT,
        channels: [NOTIFICATION_CHANNEL.IN_APP],
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: resolved.subject,
        body: resolved.body,
        data: {
          eventType: 'product.inventory.out_of_stock',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `inventoryoutofstock-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`InventoryOutOfStockHandler failed: ${msg}`);
    }
  }
}
