/**
 * ProductReviewRejectedHandler
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { NOTIFICATION_CHANNEL, NOTIFICATION_CATEGORY, NOTIFICATION_TYPE, NOTIFICATION_PRIORITY } from '@vubon/shared-constants/platform';
import { renderReviewRejectedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import { NOTIFICATION_SERVICE, type INotificationService } from '../../services/interfaces/notification.service.interface.js';

export const PRODUCT_REVIEW_REJECTED_EVENT = 'product.review.rejected';

@Injectable()
export class ProductReviewRejectedHandler implements OnModuleInit {
  private readonly logger = new Logger(ProductReviewRejectedHandler.name);
  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_REVIEW_REJECTED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.userId as string) ?? (event as { aggregateId: string }).aggregateId;
      try {
        // ─── Render Bengali HTML ───
        let html = '';
        try {
          html = renderReviewRejectedEmail({
            name: ((p.name as string) ?? (typeof p.firstName === 'string' ? p.firstName as string : 'গ্রাহক')),
            locale: (((p.locale as 'en' | 'bn') ?? 'bn')),
            ...p,
          } as any);
        } catch (err) {
          this.logger.warn(`Template render failed: ${err}`);
        }

        const isBn = ((p.locale as string) ?? 'bn') === 'bn';

        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.ALERT,
          category: NOTIFICATION_CATEGORY.PRODUCT,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.NORMAL,
          subject: isBn ? 'Rejected' : 'Rejected',
          body: html || 'Your product review did not meet our guidelines and was not published.',
          data: { eventType: PRODUCT_REVIEW_REJECTED_EVENT, ...p , html },
          idempotencyKey: `review-rejected-${(event as { id: string }).id}`,
        });
        this.logger.log(`✅ Review rejection notified for user ${userId}`);
      } catch (err) {
        this.logger.error(`Failed: ${err instanceof Error ? err.message : 'unknown'}`);
      }
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_REVIEW_REJECTED_EVENT}"`);
  }
}
