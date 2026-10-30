/**
 * ProductCategoryUpdatedHandler — reacts to product.category.updated
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
import { renderProductCategoryUpdatedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const PRODUCT_CATEGORY_UPDATED_EVENT = 'product.category.updated';

interface ProductCategoryUpdatedHandlerPayload {
  readonly categoryId: string;
  readonly userId?: string;
  readonly [key: string]: unknown;
}

interface ProductCategoryUpdatedHandlerEvent {
  readonly id: string;
  readonly type: 'product.category.updated';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: ProductCategoryUpdatedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class ProductCategoryUpdatedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductCategoryUpdatedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_CATEGORY_UPDATED_EVENT, async (event) => {
      await this.handle(event as unknown as ProductCategoryUpdatedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_CATEGORY_UPDATED_EVENT}"`);
  }

  private async handle(event: ProductCategoryUpdatedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received product.category.updated — ${JSON.stringify(payload)}`);

    try {
      const html = renderProductCategoryUpdatedEmail({ ...payload, name: (payload as { userId?: string }).userId ?? 'গ্রাহক' });
      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
        category: NOTIFICATION_CATEGORY.PRODUCT,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: 'ক্যাটাগরি আপডেট হয়েছে',
        body: 'ক্যাটাগরির তথ্য সফলভাবে আপডেট করা হয়েছে।\n\nCategory details have been updated.',
        html,
        data: {
          eventType: 'product.category.updated',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `product_category_updated-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`ProductCategoryUpdatedHandler failed: ${msg}`);
    }
  }
}
