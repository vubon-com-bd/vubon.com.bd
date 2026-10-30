/**
 * ProductCollectionUpdatedHandler — reacts to product.collection.updated
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
import { renderProductCollectionUpdatedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const PRODUCT_COLLECTION_UPDATED_EVENT = 'product.collection.updated';

interface ProductCollectionUpdatedHandlerPayload {
  readonly collectionId: string;
  readonly userId?: string;
  readonly [key: string]: unknown;
}

interface ProductCollectionUpdatedHandlerEvent {
  readonly id: string;
  readonly type: 'product.collection.updated';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: ProductCollectionUpdatedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class ProductCollectionUpdatedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductCollectionUpdatedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_COLLECTION_UPDATED_EVENT, async (event) => {
      await this.handle(event as unknown as ProductCollectionUpdatedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_COLLECTION_UPDATED_EVENT}"`);
  }

  private async handle(event: ProductCollectionUpdatedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received product.collection.updated — ${JSON.stringify(payload)}`);

    try {
      const html = renderProductCollectionUpdatedEmail({ ...payload, name: (payload as { userId?: string }).userId ?? 'গ্রাহক' });
      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
        category: NOTIFICATION_CATEGORY.PRODUCT,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: 'কালেকশন আপডেট হয়েছে',
        body: 'কালেকশনের তথ্য আপডেট করা হয়েছে।\n\nCollection details have been updated.',
        html,
        data: {
          eventType: 'product.collection.updated',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `product_collection_updated-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`ProductCollectionUpdatedHandler failed: ${msg}`);
    }
  }
}
