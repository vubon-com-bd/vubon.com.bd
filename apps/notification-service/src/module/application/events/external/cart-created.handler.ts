/**
 * CartCreatedHandler — notifies cart creation
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

export const CART_CREATED_EVENT = 'cart.cart.created';

@Injectable()
export class CartCreatedHandler implements OnModuleInit {
  private readonly logger = new Logger(CartCreatedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(CART_CREATED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${CART_CREATED_EVENT}"`);
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
        subject: isBn ? `🛒 কার্ট তৈরি` : `🛒 Cart Created`,
        body: isBn ? `প্রিয় ${payload?.name ?? "গ্রাহক"}, আপনার কার্ট প্রস্তুত। এখনই শপিং শুরু করুন।` : `Hi ${payload?.name ?? "Customer"}, your cart is ready. Start shopping now!`,
        data: { eventType: 'cart.cart.created', ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `cart-created-${event.id}`,
      });
      this.logger.log(`✅ CartCreatedHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`CartCreatedHandler failed: ${err}`);
    }
  }
}
