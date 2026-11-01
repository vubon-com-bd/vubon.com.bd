/**
 * ProductReviewPostedHandler — reacts to product.review.submitted
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { I18nService } from '../../../domain/services/i18n.service.js';
import { resolveTemplate, getLocale } from './_handler-helpers.js';
import { renderReviewPostedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import { UserClient } from '@infrastructure/services/external/user.client.js';
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
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
    private readonly userClient: UserClient,) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PRODUCT_REVIEW_POSTED_EVENT, async (event) => {
      await this.handle(event as unknown as ProductReviewPostedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${PRODUCT_REVIEW_POSTED_EVENT}"`);
  }

  private async handle(event: ProductReviewPostedHandlerEvent): Promise<void> {
    const payload = event.payload;

    // ─── Fetch user profile for email/name/locale ───
    const _userId = (payload as any).userId ?? (payload as any).customerId ?? event.aggregateId;
    let userEmail = (payload as any).email;
    let userName = (payload as any).name;
    let userLocale = (payload as any).locale;
    if (!userEmail && _userId) {
      try {
        const profile = await this.userClient.getById(_userId);
        if (profile) {
          userEmail = userEmail ?? profile.email;
          userName = userName ?? profile.name ?? profile.firstName;
          userLocale = userLocale ?? (profile.locale as 'en' | 'bn' | undefined);
        }
      } catch (err) {
        this.logger.warn(`User fetch failed for ${_userId}: ${err}`);
      }
    }
    this.logger.log(`Received product.review.submitted — ${JSON.stringify(payload)}`);

    try {
      const locale = getLocale(payload as unknown as Record<string, unknown>);
        // ─── HTML template (rendered first) ───
        let html = '';
      try {
        html = renderReviewPostedEmail({
          name: (payload as any).name ?? 'Vendor',
          productId: (payload as any).productId ?? '',
          rating: (payload as any).rating ?? 5,
          reviewText: (payload as any).reviewText,
          locale: (payload as any).locale ?? 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }


      const resolved = resolveTemplate(
          this.i18n,
          'REVIEW_POSTED',
          locale,
          {
            rating: (payload as any).rating
          },
          {
            subject: 'New Review',
            body: html,
          },
        );


            const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        email: userEmail,
        type: NOTIFICATION_TYPE.ALERT,
        category: NOTIFICATION_CATEGORY.PRODUCT,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: resolved.subject,
        body: resolved.body,
        data: {
          html,
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
