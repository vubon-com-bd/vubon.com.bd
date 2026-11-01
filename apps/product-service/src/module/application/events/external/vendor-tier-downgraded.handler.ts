/**
 * VendorTierDowngradedHandler — vendor.tier.downgraded
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const VENDOR_TIER_DOWNGRADED_EVENT = 'vendor.tier.downgraded';

@Injectable()
export class VendorTierDowngradedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorTierDowngradedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_TIER_DOWNGRADED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      this.logger.log('📥 vendor.tier.downgraded: ' + JSON.stringify(p));
      // TODO: update vendor tier on products
    });
    this.logger.log('✅ Registered handler for "vendor.tier.downgraded"');
  }
}
