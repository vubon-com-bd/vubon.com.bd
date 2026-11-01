/**
 * VendorDeletedHandler — cancels pending shipments for deleted vendor
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  SHIPMENT_SERVICE,
  type IShipmentService,
} from '@application/services/interfaces/shipment.service.interface';

export const VENDOR_DELETED_EVENT = 'vendor.vendor.deleted';

interface VendorDeletedPayload {
  readonly vendorId: string;
  readonly deletedAt: string;
}

interface VendorEvent {
  readonly id: string;
  readonly type: string;
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: VendorDeletedPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class VendorDeletedHandler implements OnModuleInit {
  private readonly logger = new Logger(VendorDeletedHandler.name);
  constructor(
    @Inject(SHIPMENT_SERVICE) private readonly shipmentService: IShipmentService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_DELETED_EVENT, async (event) => {
      try { await this.handle(event as unknown as VendorEvent); }
      catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.error(`VendorDeletedHandler failed: ${msg}`);
      }
    });
    this.logger.log(`✅ Registered handler for "${VENDOR_DELETED_EVENT}"`);
  }

  private async handle(event: VendorEvent): Promise<void> {
    const p = event.payload;
    if (!p?.vendorId) return;
    this.logger.log(`Received vendor.deleted — vendorId=${p.vendorId}`);
    try {
      const result = await this.shipmentService.list({ page: 1, limit: 500, filter: { vendorId: p.vendorId } });
      for (const shipment of result.items ?? []) {
        try {
          await this.shipmentService.cancel(
            { shipmentId: shipment.id, reason: 'Vendor deleted' },
            'system:vendor-service',
          );
          this.logger.log(`❌ Shipment ${shipment.id} cancelled (vendor ${p.vendorId} deleted)`);
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'unknown';
          this.logger.warn(`Shipment ${shipment.id} cancel failed: ${msg}`);
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Shipments list failed for vendor ${p.vendorId}: ${msg}`);
    }
  }
}
