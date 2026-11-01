/**
 * VendorCommissionUpdatedHandler — vendor.commission.updated
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const VENDOR_COMMISSION_UPDATED_EVENT = 'vendor.commission.updated';

@Injectable()
export class VendorCommissionUpdatedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorCommissionUpdatedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_COMMISSION_UPDATED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      this.logger.log('📥 vendor.commission.updated: ' + JSON.stringify(p));
      // TODO: update product commission
    });
    this.logger.log('✅ Registered handler for "vendor.commission.updated"');
  }
}
