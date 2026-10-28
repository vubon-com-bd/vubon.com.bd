/**
 * VendorInfoRequestedHandler — notifies info request
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

export const VENDOR_INFO_REQUESTED_EVENT = 'vendor.approval.info_requested';

@Injectable()
export class VendorInfoRequestedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorInfoRequestedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_INFO_REQUESTED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${VENDOR_INFO_REQUESTED_EVENT}"`);
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
        subject: isBn ? `❓ আরও তথ্য প্রয়োজন` : `❓ Additional Info Needed`,
        body: isBn ? `প্রিয় ${payload?.name ?? "ভেন্ডর"}, আপনার application-এ আরও তথ্য প্রয়োজন: ${payload?.infoRequested ?? ""}` : `Hi ${payload?.name ?? "Vendor"}, additional info needed for your application: ${payload?.infoRequested ?? ""}`,
        data: { eventType: 'vendor.approval.info_requested', ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `vendor-info-req-${event.id}`,
      });
      this.logger.log(`✅ VendorInfoRequestedHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`VendorInfoRequestedHandler failed: ${err}`);
    }
  }
}
