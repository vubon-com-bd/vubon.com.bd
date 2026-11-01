/**
 * VendorPayoutProcessedHandler — vendor.payout.processed
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const VENDOR_PAYOUT_PROCESSED_EVENT = 'vendor.payout.processed';

@Injectable()
export class VendorPayoutProcessedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorPayoutProcessedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_PAYOUT_PROCESSED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      this.logger.log('📥 vendor.payout.processed: ' + JSON.stringify(p));
    });
    this.logger.log('✅ Registered handler for "vendor.payout.processed"');
  }
}
