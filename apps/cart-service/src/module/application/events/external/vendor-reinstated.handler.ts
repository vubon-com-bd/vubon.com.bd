/**
 * VendorReinstatedHandler — vendor can sell again
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const VENDOR_REINSTATED_EVENT = 'vendor.vendor.reinstated';

@Injectable()
export class VendorReinstatedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorReinstatedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_REINSTATED_EVENT, async (event) => {
      const p = (event as { payload?: { vendorId?: string } }).payload;
      this.logger.log(`📥 Vendor reinstated: ${p?.vendorId} — can sell again`);
      // TODO: If cart items were from this vendor, re-enable them
    });
    this.logger.log(`✅ Registered handler for "${VENDOR_REINSTATED_EVENT}"`);
  }
}
