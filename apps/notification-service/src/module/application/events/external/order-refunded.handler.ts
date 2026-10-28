/**
 * OrderRefundedHandler — notifies order refund
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

export const ORDER_REFUNDED_EVENT = 'order.order.refunded';

@Injectable()
export class OrderRefundedHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderRefundedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_REFUNDED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_REFUNDED_EVENT}"`);
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
        subject: isBn ? `💰 অর্ডার রিফান্ড - #${payload?.orderId ?? ""}` : `💰 Order Refunded - #${payload?.orderId ?? ""}`,
        body: isBn ? `প্রিয় ${payload?.name ?? "গ্রাহক"}, আপনার অর্ডার #${payload?.orderId ?? ""} রিফান্ড করা হয়েছে। ৳${payload?.amount ?? 0} ফেরত দেওয়া হচ্ছে।` : `Hi ${payload?.name ?? "Customer"}, order #${payload?.orderId ?? ""} refunded. ৳${payload?.amount ?? 0} being returned.`,
        data: { eventType: 'order.order.refunded', ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `order-refunded-${event.id}`,
      });
      this.logger.log(`✅ OrderRefundedHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`OrderRefundedHandler failed: ${err}`);
    }
  }
}
