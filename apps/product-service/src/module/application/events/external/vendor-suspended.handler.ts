/**
 * VendorSuspendedHandler — unpublish products of suspended vendor
 * @module product-service/application/events/external
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

export const VENDOR_SUSPENDED_EVENT = 'vendor.vendor.suspended';

interface VendorSuspendedPayload {
  readonly vendorId: string;
  readonly reason?: string;
}

interface VendorSuspendedEvent {
  readonly id: string;
  readonly type: 'vendor.vendor.suspended';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: VendorSuspendedPayload;
  readonly occurredAt: string;
  readonly version: number;
}

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
    this.logger.warn(`📥 vendor.vendor.suspended → vendorId=${vendorId} reason=${reason ?? 'N/A'}`);

    // TODO: unpublish all products of this vendor
    this.logger.log(`Vendor ${vendorId} suspended — products should be unpublished`);
  }
}
