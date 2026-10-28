/**
 * VendorReinstatedHandler — notifies vendor reinstatement
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

export const VENDOR_REINSTATED_EVENT = 'vendor.vendor.reinstated';

@Injectable()
export class VendorReinstatedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorReinstatedHandler.name);

  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_REINSTATED_EVENT, async (event) => {
      await this.handle(event);
    });
    this.logger.log(`✅ Registered handler for "${VENDOR_REINSTATED_EVENT}"`);
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
        subject: isBn ? `🎉 ভেন্ডর অ্যাকাউন্ট reinstated` : `🎉 Vendor Account Reinstated`,
        body: isBn ? `প্রিয় ${payload?.name ?? "ভেন্ডর"}, আপনার ভেন্ডর অ্যাকাউন্ট reinstated হয়েছে। এখন আবার business পরিচালনা করতে পারবেন।` : `Hi ${payload?.name ?? "Vendor"}, your vendor account is reinstated. You can now resume business.`,
        data: { eventType: 'vendor.vendor.reinstated', ...payload },
        email: payload?.email,
        phone: payload?.phone,
        idempotencyKey: `vendor-reinstated-${event.id}`,
      });
      this.logger.log(`✅ VendorReinstatedHandler — ${result.notificationIds?.length ?? 0} channel(s)`);
    } catch (err) {
      this.logger.error(`VendorReinstatedHandler failed: ${err}`);
    }
  }
}
