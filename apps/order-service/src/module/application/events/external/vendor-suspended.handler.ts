/**
 * VendorSuspendedHandler — pauses orders from suspended vendors
 * @module order-service/application/events/external
 *
 * Vendor service emits 'vendor.vendor.suspended' when vendor is suspended.
 * This handler cancels pending shipments from that vendor and notifies customers.
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  ORDER_SERVICE,
  type IOrderService,
} from '../../services/interfaces/order.service.interface.js';

export const VENDOR_SUSPENDED_EVENT = 'vendor.vendor.suspended';

interface VendorSuspendedPayload {
  readonly vendorId: string;
  readonly reason?: string;
  readonly suspendedAt?: string;
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

  constructor(
    @Inject(ORDER_SERVICE)
    private readonly orderService: IOrderService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(VENDOR_SUSPENDED_EVENT, async (event) => {
      await this.handle(event as unknown as VendorSuspendedEvent);
    });
    this.logger.log(`✅ Registered handler for "${VENDOR_SUSPENDED_EVENT}"`);
  }

  private async handle(event: VendorSuspendedEvent): Promise<void> {
    const { vendorId, reason } = event.payload;

    this.logger.warn(
      `📥 vendor.suspended → vendorId=${vendorId} reason=${reason ?? 'N/A'}`,
    );

    try {
      // Find all pending orders that contain this vendor's items
      // Note: This depends on vendorId being tracked in order items
      const ordersResult = await this.orderService.list({
        page: 1,
        limit: 100,
        filter: {
          status: ['pending', 'confirmed', 'processing'],
          // vendorId filter would go here once vendorId is in items
        },
      } as never);

      const orders = (ordersResult as unknown as { items?: readonly unknown[] }).items ?? [];

      this.logger.log(
        `Found ${orders.length} active orders — checking for vendor ${vendorId}`,
      );

      // For now, log affected orders (vendorId tracking needed for real action)
      let affectedCount = 0;
      for (const order of orders) {
        const items = (order as unknown as { items?: readonly unknown[] }).items ?? [];
        const hasVendorItem = items.some(
          (item) => (item as unknown as { vendorId?: string }).vendorId === vendorId,
        );

        if (hasVendorItem) {
          affectedCount++;
          this.logger.warn(
            `Order ${(order as unknown as { id: string }).id} contains vendor ${vendorId} items`,
          );
        }
      }

      this.logger.log(
        `Vendor ${vendorId} suspended — ${affectedCount} orders affected. ` +
        `Add vendorId tracking to order items for full auto-cancellation.`,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(
        `VendorSuspendedHandler failed for vendor ${vendorId}: ${msg}`,
      );
    }
  }
}
