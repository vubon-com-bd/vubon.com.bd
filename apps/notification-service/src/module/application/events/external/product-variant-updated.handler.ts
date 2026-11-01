/**
 * ProductVariantUpdatedHandler — reacts to product.variant.updated
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
import { renderProductVariantUpdatedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const PRODUCT_VARIANT_UPDATED_EVENT = 'product.variant.updated';

interface ProductVariantUpdatedHandlerPayload {
  readonly variantId: string;
  readonly userId?: string;
  readonly [key: string]: unknown;
}

interface ProductVariantUpdatedHandlerEvent {
  readonly id: string;
  readonly type: 'product.variant.updated';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: ProductVariantUpdatedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class ProductVariantUpdatedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductVariantUpdatedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_VARIANT_UPDATED_EVENT, async (event) => {
      await this.handle(event as unknown as ProductVariantUpdatedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_VARIANT_UPDATED_EVENT}"`);
  }

  private async handle(event: ProductVariantUpdatedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received product.variant.updated — ${JSON.stringify(payload)}`);

    try {
      const html = renderProductVariantUpdatedEmail({ ...payload, name: (payload as { userId?: string }).userId ?? 'গ্রাহক' });
      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
        category: NOTIFICATION_CATEGORY.PRODUCT,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: 'ভ্যারিয়েন্ট আপডেট হয়েছে',
        body: 'ভ্যারিয়েন্টের তথ্য আপডেট করা হয়েছে।\n\nThe variant details have been updated.',
        html,
        data: {
          eventType: 'product.variant.updated',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `product_variant_updated-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`ProductVariantUpdatedHandler failed: ${msg}`);
    }
  }
}
