/**
 * ProductCategoryMovedHandler — reacts to product.category.moved
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
import { renderProductCategoryMovedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const PRODUCT_CATEGORY_MOVED_EVENT = 'product.category.moved';

interface ProductCategoryMovedHandlerPayload {
  readonly categoryId: string;
  readonly userId?: string;
  readonly [key: string]: unknown;
}

interface ProductCategoryMovedHandlerEvent {
  readonly id: string;
  readonly type: 'product.category.moved';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: ProductCategoryMovedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class ProductCategoryMovedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductCategoryMovedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_CATEGORY_MOVED_EVENT, async (event) => {
      await this.handle(event as unknown as ProductCategoryMovedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_CATEGORY_MOVED_EVENT}"`);
  }

  private async handle(event: ProductCategoryMovedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received product.category.moved — ${JSON.stringify(payload)}`);

    try {
      const html = renderProductCategoryMovedEmail({ ...payload, name: (payload as { userId?: string }).userId ?? 'গ্রাহক' });
      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
        category: NOTIFICATION_CATEGORY.PRODUCT,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: 'ক্যাটাগরি সরানো হয়েছে',
        body: 'ক্যাটাগরিটি নতুন প্যারেন্ট ক্যাটাগরিতে সরানো হয়েছে।\n\nCategory has been moved to a new parent.',
        html,
        data: {
          eventType: 'product.category.moved',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `product_category_moved-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`ProductCategoryMovedHandler failed: ${msg}`);
    }
  }
}
