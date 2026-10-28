/**
 * RefundRequestedHandler — notifies refund request received
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

export const REFUND_REQUESTED_EVENT = 'payment.refund.requested';

@Injectable()
export class RefundRequestedHandler implements OnModuleInit {
  private readonly logger = new Logger(RefundRequestedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(REFUND_REQUESTED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${REFUND_REQUESTED_EVENT}"`);
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
        subject: isBn ? `রিফান্ড request গৃহীত` : `Refund Requested`,
        body: isBn ? `প্রিয় ${payload?.name ?? "গ্রাহক"}, আপনার ৳${payload?.amount ?? 0} রিফান্ড request গৃহীত হয়েছে। ৩-৫ কর্মদিবসে প্রসেস হবে।` : `Hi ${payload?.name ?? "Customer"}, your ৳${payload?.amount ?? 0} refund request is received. Processing in 3-5 business days.`,
        data: { eventType: 'payment.refund.requested', ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `refund-requested-${event.id}`,
      });
      this.logger.log(`✅ RefundRequestedHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`RefundRequestedHandler failed: ${err}`);
    }
  }
}
