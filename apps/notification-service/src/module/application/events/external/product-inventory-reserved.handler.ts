/**
 * ProductInventoryReservedHandler — reacts to product.inventory.reserved
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
import { renderProductInventoryReservedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const PRODUCT_INVENTORY_RESERVED_EVENT = 'product.inventory.reserved';

interface ProductInventoryReservedHandlerPayload {
  readonly productId: string;
  readonly userId?: string;
  readonly [key: string]: unknown;
}

interface ProductInventoryReservedHandlerEvent {
  readonly id: string;
  readonly type: 'product.inventory.reserved';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: ProductInventoryReservedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class ProductInventoryReservedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductInventoryReservedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_INVENTORY_RESERVED_EVENT, async (event) => {
      await this.handle(event as unknown as ProductInventoryReservedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_INVENTORY_RESERVED_EVENT}"`);
  }

  private async handle(event: ProductInventoryReservedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received product.inventory.reserved — ${JSON.stringify(payload)}`);

    try {
      const html = renderProductInventoryReservedEmail({ ...payload, name: (payload as { userId?: string }).userId ?? 'গ্রাহক' });
      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ALERT,
        category: NOTIFICATION_CATEGORY.PRODUCT,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: 'ইনভেন্টরি রিজার্ভ হয়েছে',
        body: 'অর্ডারের জন্য ইনভেন্টরি রিজার্ভ করা হয়েছে।\n\nInventory has been reserved for your order.',
        html,
        data: {
          eventType: 'product.inventory.reserved',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `product_inventory_reserved-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`ProductInventoryReservedHandler failed: ${msg}`);
    }
  }
}
