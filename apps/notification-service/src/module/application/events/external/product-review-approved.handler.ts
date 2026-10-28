/**
 * ProductReviewApprovedHandler
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY, NOTIFICATION_TYPE, NOTIFICATION_PRIORITY } from '@vubon/shared-constants/platform';
import { NOTIFICATION_SERVICE, type INotificationService } from '../../services/interfaces/notification.service.interface.js';

export const PRODUCT_REVIEW_APPROVED_EVENT = 'product.review.approved';

@Injectable()
export class ProductReviewApprovedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductReviewApprovedHandler.name);
  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_REVIEW_APPROVED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (event as { aggregateId: string }).aggregateId;
      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.SYSTEM,
          category: NOTIFICATION_CATEGORY.PRODUCT,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.NORMAL,
          subject: 'Review Approved',
          body: 'Your product review has been approved and published.',
          data: { eventType: PRODUCT_REVIEW_APPROVED_EVENT, ...p },
          idempotencyKey: `review-approved-${(event as { id: string }).id}`,
        });
        this.logger.log(`✅ Review approval notified for user ${userId}`);
      } catch (err) {
        this.logger.error(`Failed: ${err instanceof Error ? err.message : 'unknown'}`);
      }
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_REVIEW_APPROVED_EVENT}"`);
  }
}
