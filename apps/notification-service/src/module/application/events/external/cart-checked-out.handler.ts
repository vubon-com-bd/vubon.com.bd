/**
 * CartCheckedOutHandler — notifies when cart checkout is completed
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

export const CART_CHECKED_OUT_EVENT = 'cart.cart.checked_out';

@Injectable()
export class CartCheckedOutHandler implements OnModuleInit {
  private readonly logger = new Logger(CartCheckedOutHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(CART_CHECKED_OUT_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${CART_CHECKED_OUT_EVENT}"`);
  }

  private async handle(event: any): Promise<void> {
    const payload = event.payload;
    const locale = payload?.locale ?? 'bn';
    const isBn = locale === 'bn';
    try {
      const result = await this.notificationService.send({
        userId: payload?.userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ORDER_UPDATE,
        category: NOTIFICATION_CATEGORY.ORDER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: isBn ? `চেকআউট সম্পন্ন` : `Checkout Complete`,
        body: isBn
          ? `প্রিয় ${payload?.name ?? "Customer"}, আপনার চেকআউট সম্পন্ন হয়েছে। অর্ডার প্রসেসিং শুরু হয়েছে।`
          : `Hi ${payload?.name ?? "Customer"}, your checkout is complete. Order processing has started.`,
        data: { eventType: 'cart.cart.checked_out', ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `cart-checked-out-${event.id}`,
      });
      this.logger.log(`✅ CartCheckedOutHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`CartCheckedOutHandler failed: ${err}`);
    }
  }
}
