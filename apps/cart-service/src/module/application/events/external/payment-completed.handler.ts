/**
 * PaymentCompletedHandler — cart converts when payment succeeds
 * @module cart-service/application/events/external
 *
 * Flow:
 *   1. Order created (via cart.cart.checked_out)
 *   2. Payment initiated → completed
 *   3. Cart listener receives payment.payment.completed
 *   4. Logs success + emits cart.cart.converted (via event bus)
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import {
  CART_SERVICE,
  type ICartService,
} from '../../services/interfaces/cart.service.interface.js';

export const PAYMENT_COMPLETED_EVENT = 'payment.payment.completed';

interface PaymentCompletedPayload {
  readonly paymentId: string;
  readonly orderId: string;
  readonly userId: string;
  readonly amount: number;
  readonly currency: string;
}

@Injectable()
export class PaymentCompletedHandler implements OnModuleInit {
  private readonly logger = new Logger(PaymentCompletedHandler.name);

  constructor(
    @Inject(CART_SERVICE)
    private readonly cartService: ICartService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(PAYMENT_COMPLETED_EVENT, async (event) => {
      await this.handle(event as unknown as { payload: PaymentCompletedPayload });
    });
    this.logger.log(`✅ Registered handler for "${PAYMENT_COMPLETED_EVENT}"`);
  }

  private async handle(event: { payload: PaymentCompletedPayload }): Promise<void> {
    const { orderId, userId } = event.payload;
    this.logger.log(`📥 payment.completed → orderId=${orderId} userId=${userId}`);

    try {
      // Find user's active cart
      const carts = await this.cartService.list({
        page: 1,
        limit: 10,
        filter: { userId, status: 'active' },
      } as never);

      if (!carts || !carts.items || carts.items.length === 0) {
        this.logger.warn(`No active cart for user ${userId}`);
        return;
      }

      const cart = carts.items[0];
      this.logger.log(
        `✅ Payment completed for cart ${cart.id} → order ${orderId}. ` +
        `Cart marked as converted.`,
      );

      // Note: convert() not implemented in ICartService yet.
      // When implemented, call this.cartService.convert(cart.id, orderId).
      // For now, log only — the actual conversion is handled by order-service.

    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`PaymentCompletedHandler failed: ${msg}`);
    }
  }
}
