/**
 * RefundCompletedHandler — notifies refund completion
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

export const REFUND_COMPLETED_EVENT = 'payment.refund.completed';

@Injectable()
export class RefundCompletedHandler implements OnModuleInit {
  private readonly logger = new Logger(RefundCompletedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(REFUND_COMPLETED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${REFUND_COMPLETED_EVENT}"`);
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
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: isBn ? `💰 রিফান্ড সম্পন্ন` : `💰 Refund Completed`,
        body: isBn ? `প্রিয় ${payload?.name ?? "গ্রাহক"}, আপনার ৳${payload?.amount ?? 0} রিফান্ড সম্পন্ন হয়েছে। আপনার অ্যাকাউন্টে জমা হয়েছে।` : `Hi ${payload?.name ?? "Customer"}, your ৳${payload?.amount ?? 0} refund is complete and deposited to your account.`,
        data: { eventType: 'payment.refund.completed', ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `refund-completed-${event.id}`,
      });
      this.logger.log(`✅ RefundCompletedHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`RefundCompletedHandler failed: ${err}`);
    }
  }
}
