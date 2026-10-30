/**
 * ProductBrandLogoUpdatedHandler — reacts to product.brand.logo_updated
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
import { renderProductBrandLogoUpdatedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const PRODUCT_BRAND_LOGO_UPDATED_EVENT = 'product.brand.logo_updated';

interface ProductBrandLogoUpdatedHandlerPayload {
  readonly brandId: string;
  readonly userId?: string;
  readonly [key: string]: unknown;
}

interface ProductBrandLogoUpdatedHandlerEvent {
  readonly id: string;
  readonly type: 'product.brand.logo_updated';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: ProductBrandLogoUpdatedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class ProductBrandLogoUpdatedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductBrandLogoUpdatedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_BRAND_LOGO_UPDATED_EVENT, async (event) => {
      await this.handle(event as unknown as ProductBrandLogoUpdatedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_BRAND_LOGO_UPDATED_EVENT}"`);
  }

  private async handle(event: ProductBrandLogoUpdatedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received product.brand.logo_updated — ${JSON.stringify(payload)}`);

    try {
      const html = renderProductBrandLogoUpdatedEmail({ ...payload, name: (payload as { userId?: string }).userId ?? 'গ্রাহক' });
      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
        category: NOTIFICATION_CATEGORY.PRODUCT,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: 'ব্র্যান্ড লোগো আপডেট হয়েছে',
        body: 'আপনার ব্র্যান্ডের লোগো সফলভাবে আপডেট করা হয়েছে।\n\nYour brand logo has been updated successfully.',
        html,
        data: {
          eventType: 'product.brand.logo_updated',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `product_brand_logo_updated-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`ProductBrandLogoUpdatedHandler failed: ${msg}`);
    }
  }
}
