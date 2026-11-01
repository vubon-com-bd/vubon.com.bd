/**
 * VendorDeletedHandler — cancel pending orders from vendor
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const VENDOR_DELETED_EVENT = 'vendor.vendor.deleted';

@Injectable()
export class VendorDeletedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorDeletedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_DELETED_EVENT, async (event) => {
      const payload = (event as { payload?: { vendorId?: string } }).payload;
      this.logger.warn(`📥 Vendor deleted: ${payload?.vendorId} — cancelling pending orders`);
      // TODO: this.orderService.cancelPendingByVendor(vendorId, 'vendor_deleted')
    });
    this.logger.log(`✅ Registered handler for "${VENDOR_DELETED_EVENT}"`);
  }
}
