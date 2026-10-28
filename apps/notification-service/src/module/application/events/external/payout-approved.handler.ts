/**
 * PayoutApprovedHandler — notifies vendor when payout is approved
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

export const PAYOUT_APPROVED_EVENT = 'vendor.payout.approved';

@Injectable()
export class PayoutApprovedHandler implements OnModuleInit {
  private readonly logger = new Logger(PayoutApprovedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PAYOUT_APPROVED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${PAYOUT_APPROVED_EVENT}"`);
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
        subject: isBn ? `পেআউট অনুমোদিত` : `Payout Approved`,
        body: isBn ? `প্রিয় ${payload?.name ?? "ভেন্ডর"}, আপনার ৳${payload?.amount ?? 0} পেআউট অনুমোদিত হয়েছে। ১-৩ কর্মদিবসে পাঠানো হবে।` : `Hi ${payload?.name ?? "Vendor"}, your ৳${payload?.amount ?? 0} payout is approved. It will be sent within 1-3 business days.`,
        data: { eventType: 'vendor.payout.approved', ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `payout-approved-${event.id}`,
      });
      this.logger.log(`✅ PayoutApprovedHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`PayoutApprovedHandler failed: ${err}`);
    }
  }
}
