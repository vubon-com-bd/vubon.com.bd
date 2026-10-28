/**
 * CartCouponRejectedHandler — reacts to cart.coupon.rejected
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
import { I18nService } from '../../../domain/services/i18n.service.js';
import { renderCouponRejectedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
import { resolveTemplate, getLocale } from './_handler-helpers.js';
import { UserClient } from '@infrastructure/services/external/user.client.js';

export const CART_COUPON_REJECTED_EVENT = 'cart.coupon.rejected';

interface CartCouponRejectedHandlerPayload {
  readonly name?: string;
  readonly locale?: string;
  readonly [key: string]: unknown;
}

interface CartCouponRejectedHandlerEvent {
  readonly id: string;
  readonly type: 'cart.coupon.rejected';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: CartCouponRejectedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class CartCouponRejectedHandler implements OnModuleInit {
  private readonly logger = new Logger(CartCouponRejectedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly i18n: I18nService,
    private readonly eventBus: EventBusService,
    private readonly userClient: UserClient,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(CART_COUPON_REJECTED_EVENT, async (event) => {
      await this.handle(event as unknown as CartCouponRejectedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${CART_COUPON_REJECTED_EVENT}"`);
  }

  private async handle(event: CartCouponRejectedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received cart.coupon.rejected — ${JSON.stringify(payload)}`);

    try {
      const locale = getLocale(payload as Record<string, unknown>);
      const resolved = resolveTemplate(
        this.i18n,
        'cart.coupon.rejected',
        locale,
        payload as Record<string, unknown>,
        {
          subject: 'Coupon Not Accepted',
          body: 'Sorry, coupon {{code}} could not be applied. Reason: {{reason}}',
        },
      );

      // ─── HTML template ───
      let html = '';
      try {
        html = renderCouponRejectedEmail({
          name: (payload as any).name ?? 'Customer',
          code: (payload as any).code ?? '',
          reason: (payload as any).reason,
          locale: (payload as any).locale ?? 'bn',
        });
      } catch (err) {
        this.logger.warn(`HTML template render failed: ${err}`);
      }

      // ─── Fetch user email for real delivery ───
      let userEmail: string | undefined;
      try {
        const userId = (payload as { userId?: string }).userId;
        if (userId) {
          const user = await this.userClient.getById(userId);
          userEmail = user?.email ?? (payload as { email?: string }).email;
        } else {
          userEmail = (payload as { email?: string }).email;
        }
      } catch (err) {
        this.logger.warn(`UserClient email fetch failed: ${err}`);
        userEmail = (payload as { email?: string }).email;
      }

      const channels = userEmail
        ? [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL]
        : [NOTIFICATION_CHANNEL.IN_APP];

      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        email: userEmail,
        type: NOTIFICATION_TYPE.SYSTEM,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels,
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: resolved.subject,
        body: resolved.body,
        data: {
          html,
          eventType: 'cart.coupon.rejected',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `cart-coupon-rejected-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`CartCouponRejectedHandler failed: ${msg}`);
    }
  }
}
