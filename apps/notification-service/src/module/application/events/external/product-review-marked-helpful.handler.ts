/**
 * ProductReviewMarkedHelpfulHandler — reacts to product.review.marked_helpful
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
import { renderProductReviewMarkedHelpfulEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const PRODUCT_REVIEW_MARKED_HELPFUL_EVENT = 'product.review.marked_helpful';

interface ProductReviewMarkedHelpfulHandlerPayload {
  readonly reviewId: string;
  readonly userId?: string;
  readonly [key: string]: unknown;
}

interface ProductReviewMarkedHelpfulHandlerEvent {
  readonly id: string;
  readonly type: 'product.review.marked_helpful';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: ProductReviewMarkedHelpfulHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class ProductReviewMarkedHelpfulHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductReviewMarkedHelpfulHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_REVIEW_MARKED_HELPFUL_EVENT, async (event) => {
      await this.handle(event as unknown as ProductReviewMarkedHelpfulHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_REVIEW_MARKED_HELPFUL_EVENT}"`);
  }

  private async handle(event: ProductReviewMarkedHelpfulHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received product.review.marked_helpful — ${JSON.stringify(payload)}`);

    try {
      const html = renderProductReviewMarkedHelpfulEmail({ ...payload, name: (payload as { userId?: string }).userId ?? 'গ্রাহক' });
      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
        category: NOTIFICATION_CATEGORY.PRODUCT,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: 'রিভিউ সহায়ক হিসেবে চিহ্নিত',
        body: 'একটি রিভিউ সহায়ক হিসেবে চিহ্নিত হয়েছে।\n\nA review has been marked as helpful.',
        html,
        data: {
          eventType: 'product.review.marked_helpful',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `product_review_marked_helpful-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`ProductReviewMarkedHelpfulHandler failed: ${msg}`);
    }
  }
}
