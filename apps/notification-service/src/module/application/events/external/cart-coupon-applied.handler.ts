/**
 * CartCouponAppliedHandler — reacts to cart.coupon.applied
 * @module notification-service/application/events/external
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
import { I18nService } from '../../../domain/services/i18n.service.js';
import { renderCouponAppliedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import { resolveTemplate, getLocale } from './_handler-helpers.js';
import { UserClient } from '@infrastructure/services/external/user.client.js';

export const CART_COUPON_APPLIED_EVENT = 'cart.coupon.applied';

@Injectable()
export class CartCouponAppliedHandler implements OnModuleInit {
  private readonly logger = new Logger(CartCouponAppliedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
    private readonly userClient: UserClient,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(CART_COUPON_APPLIED_EVENT, async (event) => {
      await this.handle(event as any);
    });
    this.logger.log(`✅ Registered handler for "${CART_COUPON_APPLIED_EVENT}"`);
  }

  private async handle(event: any): Promise<void> {
    const payload = event.payload ?? {};
    this.logger.log(`Received cart.coupon.applied — ${JSON.stringify(payload)}`);

    const locale = getLocale(payload as Record<string, unknown>);
    const isBn = locale === 'bn';

    // ─── Render HTML first ───
    let html = '';
    try {
      html = renderCouponAppliedEmail({
        name: (payload.name as string) ?? (isBn ? 'গ্রাহক' : 'Customer'),
        code: (payload.code as string) ?? '',
        discount: (payload.discount as number) ?? 0,
        locale: locale as 'en' | 'bn',
      });
    } catch (err) {
      this.logger.warn(`HTML template render failed: ${err}`);
    }

    // ─── Resolve template ───
    const resolved = resolveTemplate(
      this.i18n,
      'cart.coupon.applied',
      locale,
      payload as Record<string, unknown>,
      {
        subject: isBn ? 'কুপন প্রয়োগ হয়েছে' : 'Coupon Applied',
        body: html || (isBn ? 'আপনার কুপন প্রয়োগ হয়েছে।' : 'Your coupon has been applied.'),
      },
    );

    // ─── Fetch user email ───
    let userEmail: string | undefined;
    try {
      const userId = payload.userId as string | undefined;
      if (userId) {
        const user = await this.userClient.getById(userId);
        userEmail = user?.email ?? (payload.email as string | undefined);
      } else {
        userEmail = payload.email as string | undefined;
      }
    } catch (err) {
      this.logger.warn(`UserClient email fetch failed: ${err}`);
      userEmail = payload.email as string | undefined;
    }

    const channels = userEmail
      ? [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL]
      : [NOTIFICATION_CHANNEL.IN_APP];

    try {
      const result = await this.notificationService.send({
        userId: (payload.userId as string) ?? event.aggregateId,
        email: userEmail,
        type: NOTIFICATION_TYPE.SYSTEM,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels,
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: resolved.subject,
        body: html || resolved.body,
        data: {
          html,
          eventType: 'cart.coupon.applied',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `cart-coupon-applied-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`CartCouponAppliedHandler failed: ${err}`);
    }
  }
}
