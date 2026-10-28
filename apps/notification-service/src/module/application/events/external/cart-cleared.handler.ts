/**
 * CartClearedHandler — notifies cart clear
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

export const CART_CLEARED_EVENT = 'cart.cart.cleared';

@Injectable()
export class CartClearedHandler implements OnModuleInit {
  private readonly logger = new Logger(CartClearedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(CART_CLEARED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${CART_CLEARED_EVENT}"`);
  }

  private async handle(event: any): Promise<void> {
    const payload = event.payload;
    const locale = payload?.locale ?? 'bn';
    const isBn = locale === 'bn';
    try {
      const result = await this.notificationService.send({
        userId: payload?.userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.REMINDER,
        category: NOTIFICATION_CATEGORY.SYSTEM,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.LOW,
        subject: isBn ? `🧹 কার্ট খালি করা হয়েছে` : `🧹 Cart Cleared`,
        body: isBn ? `প্রিয় ${payload?.name ?? "গ্রাহক"}, আপনার কার্টের সব পণ্য মুছে ফেলা হয়েছে।` : `Hi ${payload?.name ?? "Customer"}, all items removed from your cart.`,
        data: { eventType: 'cart.cart.cleared', ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `cart-cleared-${event.id}`,
      });
      this.logger.log(`✅ CartClearedHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`CartClearedHandler failed: ${err}`);
    }
  }
}
