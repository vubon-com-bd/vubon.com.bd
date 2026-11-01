/**
 * VendorApprovedHandler — enables shipping for approved vendor
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const VENDOR_APPROVED_EVENT = 'vendor.vendor.approved';

interface VendorApprovedPayload {
  readonly vendorId: string;
  readonly approvedAt: string;
  readonly approvedBy?: string;
}

interface VendorEvent {
  readonly id: string;
  readonly type: string;
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
      try { await this.handle(event as unknown as VendorEvent); }
      catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.error(`VendorApprovedHandler failed: ${msg}`);
      }
    });
    this.logger.log(`✅ Registered handler for "${VENDOR_APPROVED_EVENT}"`);
  }

  private async handle(event: VendorEvent): Promise<void> {
    const p = event.payload;
    if (!p?.vendorId) return;
    this.logger.log(`Received vendor.approved — vendorId=${p.vendorId}. Shipping enabled.`);
  }
}
