/**
 * ProductReviewPostedHandler — reacts to product.review.submitted
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL,
  NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE,
  NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';

import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const PRODUCT_REVIEW_POSTED_EVENT = 'product.review.submitted';

interface ProductReviewPostedHandlerPayload {
  readonly reviewId: string;
  readonly productId: string;
  readonly userId: string;
}

interface ProductReviewPostedHandlerEvent {
  readonly id: string;
  readonly type: 'product.review.submitted';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: ProductReviewPostedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class ProductReviewPostedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductReviewPostedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_REVIEW_POSTED_EVENT, async (event) => {
      await this.handle(event as unknown as ProductReviewPostedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_REVIEW_POSTED_EVENT}"`);
  }

  private async handle(event: ProductReviewPostedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received product.review.submitted — ${JSON.stringify(payload)}`);

    try {
      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ALERT,
        category: NOTIFICATION_CATEGORY.PRODUCT,
        channels: [NOTIFICATION_CHANNEL.IN_APP],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: 'New Review',
        body: `A new review has been posted on your product.`,
        data: {
          eventType: 'product.review.submitted',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `productreviewposted-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`ProductReviewPostedHandler failed: ${msg}`);
    }
  }
}
