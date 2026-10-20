/**
 * CartCheckedOutHandler — creates order when cart checkout completes
 * @module order-service/application/events/external
 *
 * Cart service emits 'cart.cart.checked_out' when user completes checkout.
 * This handler creates an order in PENDING state.
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import { ORDER_SERVICE } from '../../services/interfaces/order.service.interface.js';
import type { IOrderService } from '../../services/interfaces/order.service.interface.js';

export const CART_CHECKED_OUT_EVENT = 'cart.cart.checked_out';

interface CartCheckedOutPayload {
  readonly cartId: string;
  readonly userId: string;
  readonly items: readonly {
    readonly productId: string;
    readonly variantId?: string;
    readonly name: string;
    readonly sku: string;
    readonly quantity: number;
    readonly unitPrice: number;
    readonly totalPrice: number;
  }[];
  readonly subtotal: number;
  readonly discountAmount?: number;
  readonly taxAmount?: number;
  readonly shippingAmount?: number;
  readonly total: number;
  readonly currency: string;
  readonly shippingAddressId?: string;
  readonly shippingAddress?: {
    readonly fullName: string;
    readonly phone: string;
    readonly addressLine1: string;
    readonly addressLine2?: string;
    readonly city: string;
    readonly state: string;
    readonly postalCode: string;
    readonly country: string;
  };
  readonly checkedOutAt: string;
}

interface CartCheckedOutEvent {
  readonly id: string;
  readonly type: 'cart.cart.checked_out';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: CartCheckedOutPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class CartCheckedOutHandler implements OnModuleInit {
  private readonly logger = new Logger(CartCheckedOutHandler.name);

  constructor(
    @Inject(ORDER_SERVICE)
    private readonly orderService: IOrderService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(CART_CHECKED_OUT_EVENT, async (event) => {
      await this.handle(event as unknown as CartCheckedOutEvent);
    });
    this.logger.log(`✅ Registered handler for "${CART_CHECKED_OUT_EVENT}"`);
  }

  private async handle(event: CartCheckedOutEvent): Promise<void> {
    const p = event.payload;

    this.logger.log(
      `Received cart.cart.checked_out — cartId=${p.cartId} userId=${p.userId}`,
    );

    try {
      const result = await this.orderService.create(
        {
          items: p.items,
          subtotal: p.subtotal,
          discountAmount: p.discountAmount ?? 0,
          taxAmount: p.taxAmount ?? 0,
          shippingAmount: p.shippingAmount ?? 0,
          total: p.total,
          currency: p.currency,
          shippingAddressId: p.shippingAddressId,
          shippingAddress: p.shippingAddress,
          cartId: p.cartId,
        } as never,
        p.userId,
      );

      this.logger.log(
        `✅ Order ${result.orderId} created from cart ${p.cartId}`,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(
        `CartCheckedOutHandler failed for cart ${p.cartId}: ${msg}`,
      );
    }
  }
}
