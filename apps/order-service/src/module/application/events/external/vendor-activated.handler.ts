/**
 * VendorActivatedHandler — vendor.vendor.activated
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
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      this.logger.log('📥 vendor.vendor.activated: ' + JSON.stringify(p));
      // TODO: allow orders from newly activated vendor
    });
    this.logger.log('✅ Registered handler for "vendor.vendor.activated"');
  }
}
