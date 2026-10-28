/**
 * VendorDeactivatedHandler — deactivate vendor products
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const VENDOR_DEACTIVATED_EVENT = 'vendor.vendor.deactivated';

@Injectable()
export class VendorDeactivatedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorDeactivatedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_DEACTIVATED_EVENT, async (event) => {
      const payload = (event as { payload?: { vendorId?: string } }).payload;
      this.logger.warn(`📥 Vendor deactivated: ${payload?.vendorId} — deactivating products`);
      // TODO: this.productRepo.deactivateByVendor(vendorId)
    });
    this.logger.log(`✅ Registered handler for "${VENDOR_DEACTIVATED_EVENT}"`);
  }
}
