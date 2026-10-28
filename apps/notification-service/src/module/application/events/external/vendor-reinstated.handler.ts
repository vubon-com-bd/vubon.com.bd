/**
 * VendorReinstatedHandler — welcome back notification
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
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.vendorId as string) ?? (event as { aggregateId: string }).aggregateId;
      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.SYSTEM,
          category: NOTIFICATION_CATEGORY.SYSTEM,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.HIGH,
          subject: 'Welcome Back!',
          body: 'Your vendor account has been reinstated. You can now resume selling.',
          data: { eventType: VENDOR_REINSTATED_EVENT, ...p },
          idempotencyKey: `vendor-reinstated-${(event as { id: string }).id}`,
        });
        this.logger.log(`✅ Reinstatement notification sent for vendor ${userId}`);
      } catch (err) {
        this.logger.error(`Failed: ${err instanceof Error ? err.message : 'unknown'}`);
      }
    });
    this.logger.log(`✅ Registered handler for "${VENDOR_REINSTATED_EVENT}"`);
  }
}
