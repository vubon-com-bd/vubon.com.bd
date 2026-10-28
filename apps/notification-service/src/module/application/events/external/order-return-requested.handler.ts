/**
 * OrderReturnRequestedHandler — notifies when return request is placed
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

export const ORDER_RETURN_REQUESTED_EVENT = 'order.order-return.requested';

@Injectable()
export class OrderReturnRequestedHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderReturnRequestedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_RETURN_REQUESTED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_RETURN_REQUESTED_EVENT}"`);
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
        subject: isBn ? `রিটার্ন request গৃহীত - #${payload?.orderId ?? ""}` : `Return Requested - #${payload?.orderId ?? ""}`,
        body: isBn
          ? `প্রিয় ${payload?.name ?? "Customer"}, আপনার অর্ডার #${payload?.orderId ?? ""}-এর রিটার্ন request গৃহীত হয়েছে।`
          : `Hi ${payload?.name ?? "Customer"}, return request for order #${payload?.orderId ?? ""} has been received.`,
        data: { eventType: 'order.order-return.requested', ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `order-return-req-${event.id}`,
      });
      this.logger.log(`✅ OrderReturnRequestedHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`OrderReturnRequestedHandler failed: ${err}`);
    }
  }
}
