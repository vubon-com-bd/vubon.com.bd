/**
 * VendorBlockedHandler — block new orders from vendor
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const VENDOR_BLOCKED_EVENT = 'vendor.vendor.blocked';

@Injectable()
export class VendorBlockedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorBlockedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_BLOCKED_EVENT, async (event) => {
      const payload = (event as { payload?: { vendorId?: string } }).payload;
      this.logger.warn(`📥 Vendor blocked: ${payload?.vendorId} — blocking new orders`);
      // TODO: this.orderService.blockVendorOrders(vendorId)
    });
    this.logger.log(`✅ Registered handler for "${VENDOR_BLOCKED_EVENT}"`);
  }
}
