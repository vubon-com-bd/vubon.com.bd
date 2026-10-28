/**
 * ProductReviewDeletedHandler — reacts to product.review.deleted
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY,
  NOTIFICATION_TYPE, NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform';
import {
  NOTIFICATION_SERVICE, type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const PRODUCT_REVIEW_DELETED_EVENT = 'product.review.deleted';

@Injectable()
export class ProductReviewDeletedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductReviewDeletedHandler.name);
  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_REVIEW_DELETED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.updatedBy as string) ?? (p.createdBy as string) ?? (p.deletedBy as string) ?? (event as { aggregateId: string }).aggregateId;
      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.ALERT,
          category: NOTIFICATION_CATEGORY.PRODUCT,
          channels: [NOTIFICATION_CHANNEL.IN_APP],
          priority: NOTIFICATION_PRIORITY.NORMAL,
          subject: 'Review Deleted',
          body: `Your product review has been deleted.`,
          data: { eventType: 'product.review.deleted', ...p },
          idempotencyKey: `product-review-deleted-${(event as { id: string }).id}`,
        });
        this.logger.log(`✅ product.review.deleted notified → ${userId}`);
      } catch (err) {
        this.logger.error(`Failed: ${err instanceof Error ? err.message : 'unknown'}`);
      }
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_REVIEW_DELETED_EVENT}"`);
  }
}
