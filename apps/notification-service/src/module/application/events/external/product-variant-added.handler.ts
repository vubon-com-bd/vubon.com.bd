/**
 * ProductVariantAddedHandler — reacts to product.variant.added
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
import { renderProductVariantAddedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const PRODUCT_VARIANT_ADDED_EVENT = 'product.variant.added';

interface ProductVariantAddedHandlerPayload {
  readonly variantId: string;
  readonly userId?: string;
  readonly [key: string]: unknown;
}

interface ProductVariantAddedHandlerEvent {
  readonly id: string;
  readonly type: 'product.variant.added';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: ProductVariantAddedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class ProductVariantAddedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductVariantAddedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_VARIANT_ADDED_EVENT, async (event) => {
      await this.handle(event as unknown as ProductVariantAddedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_VARIANT_ADDED_EVENT}"`);
  }

  private async handle(event: ProductVariantAddedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received product.variant.added — ${JSON.stringify(payload)}`);

    try {
      const html = renderProductVariantAddedEmail({ ...payload, name: (payload as { userId?: string }).userId ?? 'গ্রাহক' });
      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
        category: NOTIFICATION_CATEGORY.PRODUCT,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: 'নতুন ভ্যারিয়েন্ট যোগ হয়েছে',
        body: 'পণ্যে নতুন ভ্যারিয়েন্ট যোগ করা হয়েছে।\n\nA new variant has been added to the product.',
        html,
        data: {
          eventType: 'product.variant.added',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `product_variant_added-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`ProductVariantAddedHandler failed: ${msg}`);
    }
  }
}
