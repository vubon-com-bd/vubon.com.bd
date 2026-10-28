/**
 * ReturnReceivedHandler — notifies return receipt
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

export const RETURN_RECEIVED_EVENT = 'order.order-return.received';

@Injectable()
export class ReturnReceivedHandler implements OnModuleInit {
  private readonly logger = new Logger(ReturnReceivedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(RETURN_RECEIVED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${RETURN_RECEIVED_EVENT}"`);
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
        subject: isBn ? `রিটার্ন পণ্য গ্রহণ করা হয়েছে` : `Return Received`,
        body: isBn ? `প্রিয় ${payload?.name ?? "গ্রাহক"}, আপনার রিটার্ন পণ্য গ্রহণ করা হয়েছে। যাচাই শেষে রিফান্ড প্রসেস হবে।` : `Hi ${payload?.name ?? "Customer"}, your return has been received. Refund will process after inspection.`,
        data: { eventType: 'order.order-return.received', ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `return-received-${event.id}`,
      });
      this.logger.log(`✅ ReturnReceivedHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`ReturnReceivedHandler failed: ${err}`);
    }
  }
}
