/**
 * VendorVerifiedHandler — add verified badge to products
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const VENDOR_VERIFIED_EVENT = 'vendor.vendor.verified';

@Injectable()
export class VendorVerifiedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorVerifiedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_VERIFIED_EVENT, async (event) => {
      const payload = (event as { payload?: { vendorId?: string } }).payload;
      this.logger.log(`📥 Vendor verified: ${payload?.vendorId} — adding verified badge`);
      // TODO: this.productRepo.markVendorVerified(vendorId)
    });
    this.logger.log(`✅ Registered handler for "${VENDOR_VERIFIED_EVENT}"`);
  }
}
