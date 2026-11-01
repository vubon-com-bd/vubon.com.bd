/**
 * ProductCollectionProductAddedHandler — reacts to product.collection.product_added
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
import { renderProductCollectionProductAddedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const PRODUCT_COLLECTION_PRODUCT_ADDED_EVENT = 'product.collection.product_added';

interface ProductCollectionProductAddedHandlerPayload {
  readonly collectionId: string;
  readonly userId?: string;
  readonly [key: string]: unknown;
}

interface ProductCollectionProductAddedHandlerEvent {
  readonly id: string;
  readonly type: 'product.collection.product_added';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: ProductCollectionProductAddedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class ProductCollectionProductAddedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductCollectionProductAddedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_COLLECTION_PRODUCT_ADDED_EVENT, async (event) => {
      await this.handle(event as unknown as ProductCollectionProductAddedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_COLLECTION_PRODUCT_ADDED_EVENT}"`);
  }

  private async handle(event: ProductCollectionProductAddedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received product.collection.product_added — ${JSON.stringify(payload)}`);

    try {
      const html = renderProductCollectionProductAddedEmail({ ...payload, name: (payload as { userId?: string }).userId ?? 'গ্রাহক' });
      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
        category: NOTIFICATION_CATEGORY.PRODUCT,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: 'কালেকশনে পণ্য যোগ হয়েছে',
        body: 'আপনার কালেকশনে নতুন পণ্য যোগ করা হয়েছে।\n\nA new product has been added to the collection.',
        html,
        data: {
          eventType: 'product.collection.product_added',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `product_collection_product_added-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`ProductCollectionProductAddedHandler failed: ${msg}`);
    }
  }
}
