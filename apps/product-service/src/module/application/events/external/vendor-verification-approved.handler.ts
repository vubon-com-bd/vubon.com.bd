/**
 * VendorVerificationApprovedHandler — vendor.verification.approved
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const VENDOR_VERIFICATION_APPROVED_EVENT = 'vendor.verification.approved';

@Injectable()
export class VendorVerificationApprovedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorVerificationApprovedHandler.name);
  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_VERIFICATION_APPROVED_EVENT, async (event) => {
      const p = (event as { payload?: Record<string, unknown> }).payload ?? {};
      this.logger.log('📥 vendor.verification.approved: ' + JSON.stringify(p));
      // TODO: add verified badge to vendor products
    });
    this.logger.log('✅ Registered handler for "vendor.verification.approved"');
  }
}
