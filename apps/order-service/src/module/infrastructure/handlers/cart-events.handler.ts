/**
 * CartEventsHandler — cross-service consumer for cart events
 * @module order-service/infrastructure/handlers
 *
 * Listens on the BullMQ 'domain-events' queue for events emitted by
 * cart-service. On `cart.checkout_initiated`, auto-creates an Order via
 * the existing CreateOrderCommand (CQRS).
 *
 * Chain:
 *   Cart.initiateCheckout()
 *     → emits cart.checkout_initiated
 *     → [this handler] → CreateOrderCommand
 *     → order.created emitted
 *     → logistics auto-creates shipment
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import { CreateOrderCommand } from '../../application/commands/order/create-order.command.js';
import type { CreateOrderRequestDTO } from '../../application/dtos/requests/order/create-order.dto.js';
import type { OrderResponseDTO } from '../../application/dtos/responses/order-response.dto.js';

// ─── Cart event payload shapes (mirrors cart-service cart.events.ts) ───

interface CartCheckoutItemPayload {
  readonly productId: string;
  readonly variantId?: string;
  readonly vendorId?: string;
  readonly sku: string;
  readonly name: string;
  readonly quantity: number;
  readonly unitPrice: number;
}

interface CartCheckoutAddressPayload {
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
  readonly fullName?: string;
  readonly phone?: string;
}

interface CartCheckoutInitiatedPayload {
  readonly cartId: string;
  readonly customerId: string;
  readonly items: readonly CartCheckoutItemPayload[];
  readonly shippingAddress: CartCheckoutAddressPayload;
  readonly billingAddress?: CartCheckoutAddressPayload;
  readonly paymentMethod?: string;
  readonly shippingMethod?: string;
  readonly currency: string;
  readonly subtotal: number;
  readonly total: number;
  readonly customerNotes?: string;
  readonly notes?: string;
  readonly initiatedAt: string;
}

interface DomainEventEnvelope {
  readonly id: string;
  readonly type: string;
  readonly payload: unknown;
}

@Injectable()
export class CartEventsHandler implements OnModuleInit {
  private readonly logger = new Logger(CartEventsHandler.name);

  constructor(
    private readonly eventBus: EventBusService,
    private readonly commandBus: CommandBus,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler('cart.checkout_initiated', async (event) => {
      const env = event as unknown as DomainEventEnvelope;
      const payload = env.payload as CartCheckoutInitiatedPayload;

      this.logger.log(
        `🛒 cart.checkout_initiated received → cart=${payload.cartId} customer=${payload.customerId} items=${payload.items.length} total=${payload.total} ${payload.currency}`,
      );

      // Build CreateOrderRequestDTO from cart payload
      const dto: CreateOrderRequestDTO = {
        customerId: payload.customerId,
        cartId: payload.cartId,
        items: payload.items.map((i) => ({
          productId: i.productId,
          variantId: i.variantId,
          vendorId: i.vendorId,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
        })),
        shippingAddress: payload.shippingAddress as never,
        billingAddress: payload.billingAddress as never,
        shippingMethod: payload.shippingMethod,
        paymentMethod: payload.paymentMethod,
        currency: payload.currency,
        customerNotes: payload.customerNotes,
        notes: payload.notes,
        // Deterministic idempotency key — cart checkout is one order
        idempotencyKey: `cart.checkout:${env.id}`,
      };

      try {
        const order: OrderResponseDTO = await this.commandBus.execute(
          new CreateOrderCommand(dto, 'system:cart-events-handler'),
        );
        this.logger.log(
          `✅ Order ${order.id} (${order.orderNumber ?? order.id}) auto-created from cart ${payload.cartId}`,
        );
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        this.logger.error(
          `❌ Failed to auto-create order from cart ${payload.cartId}: ${msg}`,
        );
        // Do NOT rethrow — BullMQ worker must keep consuming
      }
    });

    this.logger.log(
      `🔗 CartEventsHandler subscribed to 'cart.checkout_initiated' on domain-events queue`,
    );
  }
}
