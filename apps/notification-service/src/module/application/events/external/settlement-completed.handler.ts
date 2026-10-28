/**
 * SettlementCompletedHandler — notifies settlement completion
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

export const SETTLEMENT_COMPLETED_EVENT = 'vendor.settlement.completed';

@Injectable()
export class SettlementCompletedHandler implements OnModuleInit {
  private readonly logger = new Logger(SettlementCompletedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(SETTLEMENT_COMPLETED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${SETTLEMENT_COMPLETED_EVENT}"`);
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
        subject: isBn ? `✅ সেটেলমেন্ট সম্পন্ন` : `✅ Settlement Completed`,
        body: isBn ? `প্রিয় ${payload?.name ?? "ভেন্ডর"}, আপনার ৳${payload?.amount ?? 0} সেটেলমেন্ট সম্পন্ন হয়েছে।` : `Hi ${payload?.name ?? "Vendor"}, your ৳${payload?.amount ?? 0} settlement is complete.`,
        data: { eventType: 'vendor.settlement.completed', ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `settlement-done-${event.id}`,
      });
      this.logger.log(`✅ SettlementCompletedHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`SettlementCompletedHandler failed: ${err}`);
    }
  }
}
