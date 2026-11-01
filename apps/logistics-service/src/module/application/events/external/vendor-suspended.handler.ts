/**
 * VendorSuspendedHandler — blocks shipments from suspended vendor
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  SHIPMENT_SERVICE,
  type IShipmentService,
} from '@application/services/interfaces/shipment.service.interface';

export const VENDOR_SUSPENDED_EVENT = 'vendor.vendor.suspended';

interface VendorSuspendedPayload {
  readonly vendorId: string;
  readonly reason: string;
  readonly suspendedAt: string;
}

interface VendorEvent {
  readonly id: string;
  readonly type: string;
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: VendorSuspendedPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class VendorSuspendedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorSuspendedHandler.name);
  constructor(
    @Inject(SHIPMENT_SERVICE) private readonly shipmentService: IShipmentService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_SUSPENDED_EVENT, async (event) => {
      try { await this.handle(event as unknown as VendorEvent); }
      catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.error(`VendorSuspendedHandler failed: ${msg}`);
      }
    });
    this.logger.log(`✅ Registered handler for "${VENDOR_SUSPENDED_EVENT}"`);
  }

  private async handle(event: VendorEvent): Promise<void> {
    const p = event.payload;
    if (!p?.vendorId) return;
    this.logger.log(`Received vendor.suspended — vendorId=${p.vendorId}, reason=${p.reason}`);
    try {
      const result = await this.shipmentService.list({ page: 1, limit: 500, filter: { vendorId: p.vendorId } });
      for (const shipment of result.items ?? []) {
        try {
          await this.shipmentService.putOnHold(
            { shipmentId: shipment.id, reason: `Vendor suspended: ${p.reason}` },
            'system:vendor-service',
          );
          this.logger.log(`⏸️ Shipment ${shipment.id} held (vendor ${p.vendorId} suspended)`);
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'unknown';
          this.logger.warn(`Shipment ${shipment.id} hold failed: ${msg}`);
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Shipments list failed for vendor ${p.vendorId}: ${msg}`);
    }
  }
}
