/**
 * VendorDeactivatedHandler — vendor.vendor.deactivated
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
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      this.logger.log('📥 vendor.vendor.deactivated: ' + JSON.stringify(p));
      // TODO: block orders from deactivated vendor
    });
    this.logger.log('✅ Registered handler for "vendor.vendor.deactivated"');
  }
}
