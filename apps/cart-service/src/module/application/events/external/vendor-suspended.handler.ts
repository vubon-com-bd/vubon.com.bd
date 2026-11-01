/**
 * VendorSuspendedHandler — reacts to vendor.vendor.suspended
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import type { VendorSuspendedEvent } from './external-event.types.js';

export const VENDOR_SUSPENDED_EVENT = 'vendor.vendor.suspended';

@Injectable()
export class VendorSuspendedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorSuspendedHandler.name);

  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_SUSPENDED_EVENT, async (event) => {
      await this.handle(event as unknown as VendorSuspendedEvent);
    });
    this.logger.log(`✅ Registered handler for "${VENDOR_SUSPENDED_EVENT}"`);
  }

  private async handle(event: VendorSuspendedEvent): Promise<void> {
    const { vendorId, reason } = event.payload;
    this.logger.warn(`Vendor suspended: vendorId=${vendorId}, reason=${reason ?? 'N/A'}`);
  }
}
