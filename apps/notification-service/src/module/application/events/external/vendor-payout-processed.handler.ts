/**
 * VendorPayoutProcessedHandler — payout processed notification
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

export const VENDOR_PAYOUT_PROCESSED_EVENT = 'vendor.payout.processed';

@Injectable()
export class VendorPayoutProcessedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorPayoutProcessedHandler.name);
  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly notificationService: INotificationService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_PAYOUT_PROCESSED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      const userId = (p.vendorId as string) ?? (event as { aggregateId: string }).aggregateId;
      try {
        await this.notificationService.send({
          userId,
          type: NOTIFICATION_TYPE.PAYMENT_UPDATE,
          category: NOTIFICATION_CATEGORY.PAYMENT,
          channels: [NOTIFICATION_CHANNEL.IN_APP, NOTIFICATION_CHANNEL.EMAIL],
          priority: NOTIFICATION_PRIORITY.HIGH,
          subject: 'Payout Processed',
          body: `Your payout of ${p.amount ?? 0} ${p.currency ?? 'BDT'} has been processed.`,
          data: { eventType: VENDOR_PAYOUT_PROCESSED_EVENT, ...p },
          idempotencyKey: `payout-processed-${(event as { id: string }).id}`,
        });
        this.logger.log(`✅ Payout notification sent for vendor ${userId}`);
      } catch (err) {
        this.logger.error(`Failed: ${err instanceof Error ? err.message : 'unknown'}`);
      }
    });
    this.logger.log(`✅ Registered handler for "${VENDOR_PAYOUT_PROCESSED_EVENT}"`);
  }
}
