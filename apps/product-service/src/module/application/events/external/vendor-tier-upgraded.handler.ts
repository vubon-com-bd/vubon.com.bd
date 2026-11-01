/**
 * VendorTierUpgradedHandler — vendor.tier.upgraded
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const VENDOR_TIER_UPGRADED_EVENT = 'vendor.tier.upgraded';

@Injectable()
export class VendorTierUpgradedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorTierUpgradedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_TIER_UPGRADED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      this.logger.log('📥 vendor.tier.upgraded: ' + JSON.stringify(p));
      // TODO: update vendor tier on products
    });
    this.logger.log('✅ Registered handler for "vendor.tier.upgraded"');
  }
}
