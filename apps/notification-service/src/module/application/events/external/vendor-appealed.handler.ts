/**
 * VendorAppealedHandler — notifies appeal received
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

export const VENDOR_APPEALED_EVENT = 'vendor.approval.appealed';

@Injectable()
export class VendorAppealedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorAppealedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_APPEALED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${VENDOR_APPEALED_EVENT}"`);
  }

  private async handle(event: any): Promise<void> {
    const payload = event.payload;
    const locale = payload?.locale ?? 'bn';
    const isBn = locale === 'bn';
    try {
      const result = await this.notificationService.send({
        userId: payload?.userId ?? event.aggregateId,
        type: NOTIFICATION_TYPE.ACCOUNT_UPDATE,
        category: NOTIFICATION_CATEGORY.USER,
        channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
        priority: NOTIFICATION_PRIORITY.NORMAL,
        subject: isBn ? `📩 আপিল গৃহীত` : `📩 Appeal Received`,
        body: isBn ? `প্রিয় ${payload?.name ?? "ভেন্ডর"}, আপনার আপিল গৃহীত হয়েছে। ৩-৫ কর্মদিবসে সিদ্ধান্ত জানানো হবে।` : `Hi ${payload?.name ?? "Vendor"}, your appeal was received. Decision in 3-5 business days.`,
        data: { eventType: 'vendor.approval.appealed', ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `vendor-appealed-${event.id}`,
      });
      this.logger.log(`✅ VendorAppealedHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`VendorAppealedHandler failed: ${err}`);
    }
  }
}
