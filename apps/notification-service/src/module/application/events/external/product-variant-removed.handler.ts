/**
 * ProductVariantRemovedHandler — reacts to product.variant.removed
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
import { renderProductVariantRemovedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const PRODUCT_VARIANT_REMOVED_EVENT = 'product.variant.removed';

interface ProductVariantRemovedHandlerPayload {
  readonly variantId: string;
  readonly userId?: string;
  readonly [key: string]: unknown;
}

interface ProductVariantRemovedHandlerEvent {
  readonly id: string;
  readonly type: 'product.variant.removed';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: ProductVariantRemovedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class ProductVariantRemovedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductVariantRemovedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_VARIANT_REMOVED_EVENT, async (event) => {
      await this.handle(event as unknown as ProductVariantRemovedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_VARIANT_REMOVED_EVENT}"`);
  }

  private async handle(event: ProductVariantRemovedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received product.variant.removed — ${JSON.stringify(payload)}`);

    try {
      const html = renderProductVariantRemovedEmail({ ...payload, name: (payload as { userId?: string }).userId ?? 'গ্রাহক' });
      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
        category: NOTIFICATION_CATEGORY.PRODUCT,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: 'ভ্যারিয়েন্ট সরানো হয়েছে',
        body: 'পণ্য থেকে ভ্যারিয়েন্টটি সরানো হয়েছে।\n\nThe variant has been removed from the product.',
        html,
        data: {
          eventType: 'product.variant.removed',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `product_variant_removed-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`ProductVariantRemovedHandler failed: ${msg}`);
    }
  }
}
