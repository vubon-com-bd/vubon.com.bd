/**
 * OrderEventsHandler — cross-service consumer for order events
 * @module logistics-service/infrastructure/handlers
 *
 * Listens on the BullMQ 'domain-events' queue for events emitted by
 * order-service. When an `order.created` event arrives, it auto-creates a
 * corresponding shipment in logistics.
 *
 * ⚠️ Note on enrichment:
 *   OrderCreatedPayload carries only summary fields (orderId, customerId,
 *   itemCount, total, currency). Full shipping address & item details are
 *   NOT in the payload. For now we create a stub shipment with a placeholder
 *   address + a single package ref. Later enhancement: introduce a richer
 *   `order.ready_for_shipment` event with `shippingAddress`, `items`,
 *   `weightKg`, `isCOD` — OR fetch those via an explicit inter-service call.
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  SHIPMENT_SERVICE,
  type IShipmentService,
} from '../../application/services/interfaces/shipment.service.interface.js';

interface OrderCreatedItemPayload {
  readonly productId: string;
  readonly variantId?: string;
  readonly vendorId?: string;
  readonly sku: string;
  readonly name: string;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly imageUrl?: string;
}

interface OrderCreatedAddressSnapshot {
  readonly fullName?: string;
  readonly phone?: string;
  readonly line1: string;
  readonly line2?: string;
  readonly city: string;
  readonly state?: string;
  readonly district?: string;
  readonly division?: string;
  readonly postalCode?: string;
  readonly country: string;
  readonly landmark?: string;
  readonly label?: string;
}

interface OrderCreatedEventPayload {
  readonly orderId: string;
  readonly orderNumber: string;
  readonly customerId: string;
  readonly itemCount: number;
  readonly total: number;
  readonly currency: string;
  readonly status: string;
  readonly type: string;
  // Phase 1 enrich (may be undefined for legacy events)
  readonly paymentMethod?: string;
  readonly isCOD?: boolean;
  readonly shippingMethod?: string;
  readonly items?: readonly OrderCreatedItemPayload[];
  readonly shippingAddress?: OrderCreatedAddressSnapshot;
}

interface OrderDomainEvent {
  readonly id: string;
  readonly type: string;
  readonly payload: unknown;
}

@Injectable()
export class OrderEventsHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderEventsHandler.name);

  constructor(
    @Inject(SHIPMENT_SERVICE) private readonly shipmentService: IShipmentService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler('order.created', async (event) => {
      const domainEvent = event as unknown as OrderDomainEvent;
      const payload = domainEvent.payload as OrderCreatedEventPayload;

      this.logger.log(
        `📦 order.created received → order=${payload.orderId} number=${payload.orderNumber} items=${payload.itemCount} total=${payload.total} ${payload.currency}`,
      );

      const isCOD = payload.isCOD ?? false;
      const items = payload.items ?? [];

      // Real package refs from enriched items (Phase 1)
      const packages = items.length > 0
        ? items.map((i, idx) => ({
            orderItemId: `${payload.orderId}-item-${idx}`, // stable per item
            productId: i.productId,
            variantId: i.variantId,
            sku: i.sku,
            quantity: i.quantity,
            name: i.name,
          }))
        : [
            {
              orderItemId: `stub-${payload.orderId}`,
              quantity: payload.itemCount > 0 ? payload.itemCount : 1,
            },
          ];

      // Heuristic weight: sum(items) × 0.5kg/unit; fallback 1kg
      const totalUnits = items.reduce((s, i) => s + i.quantity, 0);
      const weightKg = totalUnits > 0 ? Math.max(0.5, totalUnits * 0.5) : 1;

      try {
        const shipment = await this.shipmentService.create(
          {
            orderId: payload.orderId,
            userId: payload.customerId,
            type: 'standard',
            priority: 'normal',
            currency: payload.currency,
            weightKg,
            isCOD,
            isInsured: payload.total > 5000,
            shippingAddress: payload.shippingAddress
              ? {
                  line1: payload.shippingAddress.line1,
                  line2: payload.shippingAddress.line2,
                  city: payload.shippingAddress.city,
                  state: payload.shippingAddress.state,
                  postalCode: payload.shippingAddress.postalCode,
                  country: payload.shippingAddress.country,
                }
              : {
                  line1: 'PENDING_FROM_ORDER',
                  city: 'PENDING_FROM_ORDER',
                  country: 'BD',
                },
            packages,
            notes: `Auto-created from order ${payload.orderNumber} (paymentMethod=${payload.paymentMethod ?? 'n/a'}, isCOD=${isCOD})`,
            idempotencyKey: `order.created:${domainEvent.id}`,
          },
          'system:order-events-handler',
        );

        this.logger.log(
          `✅ Shipment ${shipment.id} (${shipment.trackingNumber}) auto-created for order ${payload.orderNumber}`,
        );
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        this.logger.error(
          `❌ Failed to auto-create shipment for order ${payload.orderNumber}: ${msg}`,
        );
        // Do NOT rethrow — worker must keep consuming; idempotency key prevents
        // duplicate creates on retry.
      }
    });

    this.logger.log(`🔗 OrderEventsHandler subscribed to 'order.created' on domain-events queue`);
  }
}
