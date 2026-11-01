/**
 * VendorSuspendedHandler — pause payments to vendor
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const VENDOR_SUSPENDED_EVENT = 'vendor.vendor.suspended';

@Injectable()
export class VendorSuspendedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorSuspendedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_SUSPENDED_EVENT, async (event) => {
      const p = (event as { payload?: { vendorId?: string; reason?: string } }).payload;
      this.logger.warn(`📥 Vendor suspended: ${p?.vendorId} — pausing payouts`);
      // TODO: this.payoutRepo.pauseForVendor(vendorId)
    });
    this.logger.log(`✅ Registered handler for "${VENDOR_SUSPENDED_EVENT}"`);
  }
}
