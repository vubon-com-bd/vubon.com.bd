/**
 * ProductVariantStockChangedHandler — reacts to product.variant.stock_changed
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
import { renderProductVariantStockChangedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const PRODUCT_VARIANT_STOCK_CHANGED_EVENT = 'product.variant.stock_changed';

interface ProductVariantStockChangedHandlerPayload {
  readonly variantId: string;
  readonly userId?: string;
  readonly [key: string]: unknown;
}

interface ProductVariantStockChangedHandlerEvent {
  readonly id: string;
  readonly type: 'product.variant.stock_changed';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: ProductVariantStockChangedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class ProductVariantStockChangedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductVariantStockChangedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_VARIANT_STOCK_CHANGED_EVENT, async (event) => {
      await this.handle(event as unknown as ProductVariantStockChangedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_VARIANT_STOCK_CHANGED_EVENT}"`);
  }

  private async handle(event: ProductVariantStockChangedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received product.variant.stock_changed — ${JSON.stringify(payload)}`);

    try {
      const html = renderProductVariantStockChangedEmail({ ...payload, name: (payload as { userId?: string }).userId ?? 'গ্রাহক' });
      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ALERT,
        category: NOTIFICATION_CATEGORY.PRODUCT,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: 'ভ্যারিয়েন্ট স্টক পরিবর্তিত',
        body: 'ভ্যারিয়েন্টের স্টক লেভেল পরিবর্তিত হয়েছে।\n\nVariant stock level has changed.',
        html,
        data: {
          eventType: 'product.variant.stock_changed',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `product_variant_stock_changed-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`ProductVariantStockChangedHandler failed: ${msg}`);
    }
  }
}
