/**
 * VendorActivatedHandler — reactivate vendor products
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const VENDOR_ACTIVATED_EVENT = 'vendor.vendor.activated';

@Injectable()
export class VendorActivatedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorActivatedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_ACTIVATED_EVENT, async (event) => {
      const payload = (event as { payload?: { vendorId?: string } }).payload;
      this.logger.log(`📥 Vendor activated: ${payload?.vendorId} — reactivating products`);
      // TODO: this.productRepo.activateByVendor(vendorId)
    });
    this.logger.log(`✅ Registered handler for "${VENDOR_ACTIVATED_EVENT}"`);
  }
}
