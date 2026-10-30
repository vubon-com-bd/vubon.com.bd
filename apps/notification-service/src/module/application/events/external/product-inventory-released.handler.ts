/**
 * ProductInventoryReleasedHandler — reacts to product.inventory.released
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
import { renderProductInventoryReleasedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const PRODUCT_INVENTORY_RELEASED_EVENT = 'product.inventory.released';

interface ProductInventoryReleasedHandlerPayload {
  readonly productId: string;
  readonly userId?: string;
  readonly [key: string]: unknown;
}

interface ProductInventoryReleasedHandlerEvent {
  readonly id: string;
  readonly type: 'product.inventory.released';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: ProductInventoryReleasedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class ProductInventoryReleasedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductInventoryReleasedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_INVENTORY_RELEASED_EVENT, async (event) => {
      await this.handle(event as unknown as ProductInventoryReleasedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_INVENTORY_RELEASED_EVENT}"`);
  }

  private async handle(event: ProductInventoryReleasedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received product.inventory.released — ${JSON.stringify(payload)}`);

    try {
      const html = renderProductInventoryReleasedEmail({ ...payload, name: (payload as { userId?: string }).userId ?? 'গ্রাহক' });
      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ALERT,
        category: NOTIFICATION_CATEGORY.PRODUCT,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: 'ইনভেন্টরি রিলিজ হয়েছে',
        body: 'রিজার্ভ করা ইনভেন্টরি রিলিজ করা হয়েছে।\n\nReserved inventory has been released.',
        html,
        data: {
          eventType: 'product.inventory.released',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `product_inventory_released-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`ProductInventoryReleasedHandler failed: ${msg}`);
    }
  }
}
