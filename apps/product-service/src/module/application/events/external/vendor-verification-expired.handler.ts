/**
 * VendorVerificationExpiredHandler — vendor.verification.expired
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const VENDOR_VERIFICATION_EXPIRED_EVENT = 'vendor.verification.expired';

@Injectable()
export class VendorVerificationExpiredHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorVerificationExpiredHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_VERIFICATION_EXPIRED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      this.logger.log('📥 vendor.verification.expired: ' + JSON.stringify(p));
      // TODO: remove verified badge from products
    });
    this.logger.log('✅ Registered handler for "vendor.verification.expired"');
  }
}
