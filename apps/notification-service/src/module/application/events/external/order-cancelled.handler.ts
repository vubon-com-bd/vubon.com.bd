/**
 * OrderCancelledHandler — notifies customer when order is cancelled
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

export const ORDER_CANCELLED_EVENT = 'order.order.cancelled';

@Injectable()
export class OrderCancelledHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderCancelledHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_CANCELLED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_CANCELLED_EVENT}"`);
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
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: isBn ? `অর্ডার বাতিল হয়েছে - #${payload?.orderId ?? ""}` : `Order Cancelled - #${payload?.orderId ?? ""}`,
        body: isBn
          ? `প্রিয় ${payload?.name ?? "Customer"}, আপনার অর্ডার #${payload?.orderId ?? ""} বাতিল করা হয়েছে। কারণ: ${payload?.reason ?? "N/A"}।`
          : `Hi ${payload?.name ?? "Customer"}, your order #${payload?.orderId ?? ""} has been cancelled. Reason: ${payload?.reason ?? "N/A"}.`,
        data: { eventType: 'order.order.cancelled', ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `order-cancelled-${event.id}`,
      });
      this.logger.log(`✅ OrderCancelledHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`OrderCancelledHandler failed: ${err}`);
    }
  }
}
