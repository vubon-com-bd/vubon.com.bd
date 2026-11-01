/**
 * CartCouponValidatedHandler — reacts to cart.coupon.validated
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
import { renderCartCouponValidatedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';

import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

export const CART_COUPON_VALIDATED_EVENT = 'cart.coupon.validated';

interface CartCouponValidatedHandlerPayload {
  readonly couponCode: string;
  readonly userId?: string;
  readonly [key: string]: unknown;
}

interface CartCouponValidatedHandlerEvent {
  readonly id: string;
  readonly type: 'cart.coupon.validated';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: CartCouponValidatedHandlerPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class CartCouponValidatedHandler implements OnModuleInit {
  private readonly logger = new Logger(CartCouponValidatedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(CART_COUPON_VALIDATED_EVENT, async (event) => {
      await this.handle(event as unknown as CartCouponValidatedHandlerEvent);
    });
    this.logger.log(`✅ Registered handler for "${CART_COUPON_VALIDATED_EVENT}"`);
  }

  private async handle(event: CartCouponValidatedHandlerEvent): Promise<void> {
    const payload = event.payload;
    this.logger.log(`Received cart.coupon.validated — ${JSON.stringify(payload)}`);

    try {
      const html = renderCartCouponValidatedEmail({ ...payload, name: (payload as { userId?: string }).userId ?? 'গ্রাহক' });
      const result = await this.notificationService.send({
        userId: (payload as { userId?: string }).userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.SYSTEM,
        category: NOTIFICATION_CATEGORY.PROMOTION,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: 'কুপন যাচাই সফল হয়েছে',
        body: 'আপনার কুপন সফলভাবে যাচাই করা হয়েছে।\n\nYour coupon has been validated successfully.',
        html,
        data: {
          eventType: 'cart.coupon.validated',
          eventId: event.id,
          ...payload,
        },
        idempotencyKey: `cart_coupon_validated-${event.id}`,
      });

      this.logger.log(`✅ Notification sent — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`CartCouponValidatedHandler failed: ${msg}`);
    }
  }
}
