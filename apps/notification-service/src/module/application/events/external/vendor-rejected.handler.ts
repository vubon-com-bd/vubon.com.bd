/**
 * VendorRejectedHandler — notifies vendor rejection
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

export const VENDOR_REJECTED_EVENT = 'vendor.approval.rejected';

@Injectable()
export class VendorRejectedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorRejectedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_REJECTED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${VENDOR_REJECTED_EVENT}"`);
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
        priority: NOTIFICATION_PRIORITY.HIGH,
        subject: isBn ? `❌ ভেন্ডর application rejected` : `❌ Vendor Application Rejected`,
        body: isBn ? `প্রিয় ${payload?.name ?? "ভেন্ডর"}, দুঃখিত! আপনার ভেন্ডর application rejected হয়েছে। কারণ: ${payload?.reason ?? "Policy violation"}। আবার apply করতে পারবেন।` : `Hi ${payload?.name ?? "Vendor"}, sorry! Your vendor application is rejected. Reason: ${payload?.reason ?? "Policy violation"}. You can reapply.`,
        data: { eventType: 'vendor.approval.rejected', ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `vendor-rejected-${event.id}`,
      });
      this.logger.log(`✅ VendorRejectedHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`VendorRejectedHandler failed: ${err}`);
    }
  }
}
