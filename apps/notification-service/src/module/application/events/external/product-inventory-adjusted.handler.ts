/**
 * ProductInventoryAdjustedHandler — reacts to product.inventory.adjusted
 * @module notification-service/application/events/external
 *
 * Bengali + English mixed content with HTML email template
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL,
  NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE,
  NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import { renderProductInventoryAdjustedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const PRODUCT_INVENTORY_ADJUSTED_EVENT = 'product.inventory.adjusted';

interface ProductInventoryAdjustedHandlerPayload {
  readonly productId: string;
  readonly userId?: string;
  readonly [key: string]: unknown;
}

interface ProductInventoryAdjustedHandlerEvent {
  readonly id: string;
  readonly type: 'product.inventory.adjusted';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: ProductInventoryAdjustedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class ProductInventoryAdjustedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductInventoryAdjustedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_INVENTORY_ADJUSTED_EVENT, async (event) => {
      await this.handle(event as unknown as ProductInventoryAdjustedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_INVENTORY_ADJUSTED_EVENT}"`);
  }

  private async handle(event: ProductInventoryAdjustedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received product.inventory.adjusted — ${JSON.stringify(payload)}`);

    try {
      const html = renderProductInventoryAdjustedEmail({ ...payload, name: (payload as { userId?: string }).userId ?? 'গ্রাহক' });
      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ALERT,
        category: NOTIFICATION_CATEGORY.PRODUCT,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: 'ইনভেন্টরি সামঞ্জস্য করা হয়েছে',
        body: 'পণ্যের ইনভেন্টরি ম্যানুয়ালি সামঞ্জস্য করা হয়েছে।\n\nProduct inventory has been manually adjusted.',
        html,
        data: {
          eventType: 'product.inventory.adjusted',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `product_inventory_adjusted-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`ProductInventoryAdjustedHandler failed: ${msg}`);
    }
  }
}
