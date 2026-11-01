/**
 * CartConvertedHandler — notifies when cart is converted to order
 * @module notification-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { renderCartConvertedEmail } from '@infrastructure/external/email/templates/bangla-templates.js';
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

export const CART_CONVERTED_EVENT = 'cart.cart.converted';

@Injectable()
export class CartConvertedHandler implements OnModuleInit {
  private readonly logger = new Logger(CartConvertedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(CART_CONVERTED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${CART_CONVERTED_EVENT}"`);
  }

  private async handle(event: any): Promise<void> {
    const payload = event.payload;
    const locale = payload?.locale ?? 'bn';
    const isBn = locale === 'bn';
    try {
      // ─── Render Bangla HTML template ───
      const payloadAny = payload as unknown as Record<string, unknown>;
      const html = renderCartConvertedEmail({
      name: (payload.name as string) ?? 'গ্রাহক',
      cartId: (payload.cartId as string) ?? '',
      orderId: (payload.orderId as string) ?? '',
      locale: (payload.locale as 'en' | 'bn') ?? 'bn',
    });

      
      const result = await this.notificationService.send({
        userId: payload?.userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ORDER_UPDATE,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: isBn ? `আপনার অর্ডার তৈরি হয়েছে` : `Your Order is Ready`,
        body: html || isBn
          ? `প্রিয় ${payload?.name ?? "Customer"}, আপনার কার্ট থেকে অর্ডার তৈরি হয়েছে। ট্র্যাক করুন ড্যাশবোর্ডে।`
          : `Hi ${payload?.name ?? "Customer"}, your order has been created from your cart.`,
        data: {
          html, eventType: 'cart.cart.converted', ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `cart-converted-${event.id}`,
      });
      this.logger.log(`✅ CartConvertedHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`CartConvertedHandler failed: ${err}`);
    }
  }
}
