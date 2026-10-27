/**
 * VendorApprovedHandler — approve products of approved vendor
 * @module product-service/application/events/external
 *
 * Vendor service emits 'vendor.approval.approved' when a vendor is approved.
 * This handler re-publishes vendor's pending products.
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const VENDOR_APPROVED_EVENT = 'vendor.approval.approved';

interface VendorApprovedPayload {
  readonly vendorId: string;
  readonly approvedBy?: string;
  readonly approvedAt?: string;
}

interface VendorApprovedEvent {
  readonly id: string;
  readonly type: 'vendor.approval.approved';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: VendorApprovedPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class VendorApprovedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorApprovedHandler.name);

  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_APPROVED_EVENT, async (event) => {
      await this.handle(event as unknown as VendorApprovedEvent);
    });
    this.logger.log(`✅ Registered handler for "${VENDOR_APPROVED_EVENT}"`);
  }

  private async handle(event: VendorApprovedEvent): Promise<void> {
    const { vendorId } = event.payload;
    this.logger.log(`📥 vendor.approval.approved → vendorId=${vendorId}`);

    // TODO: unpublish/hide vendor's pending products (activate them)
    this.logger.log(`Vendor ${vendorId} approved — products should activate`);
  }
}
