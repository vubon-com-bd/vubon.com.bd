/**
 * PaymentCancelledHandler — notifies payment cancellation
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

export const PAYMENT_CANCELLED_EVENT = 'payment.payment.cancelled';

@Injectable()
export class PaymentCancelledHandler implements OnModuleInit {
  private readonly logger = new Logger(PaymentCancelledHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PAYMENT_CANCELLED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${PAYMENT_CANCELLED_EVENT}"`);
  }

  private async handle(event: any): Promise<void> {
    const payload = event.payload;
    const locale = payload?.locale ?? 'bn';
    const isBn = locale === 'bn';
    try {
      const result = await this.notificationService.send({
        userId: payload?.userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.PAYMENT_UPDATE,
        category: NOTIFICATION_CATEGORY.PAYMENT,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: isBn ? `🚫 পেমেন্ট বাতিল` : `🚫 Payment Cancelled`,
        body: isBn ? `প্রিয় ${payload?.name ?? "গ্রাহক"}, আপনার ৳${payload?.amount ?? 0} পেমেন্ট বাতিল হয়েছে।` : `Hi ${payload?.name ?? "Customer"}, ৳${payload?.amount ?? 0} payment was cancelled.`,
        data: { eventType: 'payment.payment.cancelled', ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `pay-cancelled-${event.id}`,
      });
      this.logger.log(`✅ PaymentCancelledHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`PaymentCancelledHandler failed: ${err}`);
    }
  }
}
