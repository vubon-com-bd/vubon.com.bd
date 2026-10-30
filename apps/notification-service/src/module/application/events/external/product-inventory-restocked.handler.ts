/**
 * ProductInventoryRestockedHandler — reacts to product.inventory.restocked
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
import { renderProductInventoryRestockedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const PRODUCT_INVENTORY_RESTOCKED_EVENT = 'product.inventory.restocked';

interface ProductInventoryRestockedHandlerPayload {
  readonly productId: string;
  readonly userId?: string;
  readonly [key: string]: unknown;
}

interface ProductInventoryRestockedHandlerEvent {
  readonly id: string;
  readonly type: 'product.inventory.restocked';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: ProductInventoryRestockedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class ProductInventoryRestockedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductInventoryRestockedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_INVENTORY_RESTOCKED_EVENT, async (event) => {
      await this.handle(event as unknown as ProductInventoryRestockedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_INVENTORY_RESTOCKED_EVENT}"`);
  }

  private async handle(event: ProductInventoryRestockedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received product.inventory.restocked — ${JSON.stringify(payload)}`);

    try {
      const html = renderProductInventoryRestockedEmail({ ...payload, name: (payload as { userId?: string }).userId ?? 'গ্রাহক' });
      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ALERT,
        category: NOTIFICATION_CATEGORY.PRODUCT,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: 'ইনভেন্টরি রিস্টক হয়েছে',
        body: 'পণ্যের ইনভেন্টরি আবার স্টকে যোগ করা হয়েছে।\n\nProduct inventory has been restocked.',
        html,
        data: {
          eventType: 'product.inventory.restocked',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `product_inventory_restocked-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`ProductInventoryRestockedHandler failed: ${msg}`);
    }
  }
}
