/**
 * VendorApprovedHandler — resumes paused vendor orders
 * @module order-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
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

    this.logger.log(`📥 vendor.approved → vendorId=${vendorId}`);

    // TODO: Resume paused orders for this vendor
    // Requires vendorId tracking in order items
    this.logger.log(
      `Vendor ${vendorId} approved — paused orders can resume ` +
      `(requires vendorId tracking in order items)`,
    );
  }
}
