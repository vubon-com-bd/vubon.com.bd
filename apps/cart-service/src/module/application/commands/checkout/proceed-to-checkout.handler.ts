import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { ProceedToCheckoutCommand } from './proceed-to-checkout.command.js';
import {
  CART_SERVICE,
  type ICartService,
} from '../../services/interfaces/cart.service.interface.js';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto.js';
import { ProceedToCheckoutError } from '../../errors/checkout.errors.js';
import { CartCheckedOutEvent } from '../../../domain/events/cart.events.js';
import { ProductClient } from '../../../infrastructure/services/external/product.client.js';

@CommandHandler(ProceedToCheckoutCommand)
export class ProceedToCheckoutHandler
  implements ICommandHandler<ProceedToCheckoutCommand, CartResponseDTO>
{
  private readonly logger = new Logger(ProceedToCheckoutHandler.name);

  constructor(
    @Inject(CART_SERVICE)
    private readonly cartService: ICartService,
    private readonly eventBus: EventBusService,
    private readonly productClient: ProductClient,
  ) {}

  async execute(c: ProceedToCheckoutCommand): Promise<CartResponseDTO> {
    try {
      const cart = await this.cartService.getById(c.dto.cartId);
      if (cart.itemCount === 0) {
        throw new ProceedToCheckoutError(c.dto.cartId, 'Cart is empty');
      }

      // Load full detail (with items)
      const detail = await this.cartService.getDetail(c.dto.cartId);

      // ✅ Enrich product data (graceful fallback if product-service down)
      const productIds = [...new Set(detail.items.map((i) => i.productId))];
      const productMap = new Map<string, { name: string; sku: string }>();

      try {
        const products = await this.productClient.getByIds(productIds);
        for (const p of products) {
          productMap.set(p.id, { name: p.name, sku: p.sku });
        }
        this.logger.log(
          `Enriched ${productMap.size}/${productIds.length} products`,
        );
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.warn(`Product enrichment failed (using fallback): ${msg}`);
      }

      // Publish CartCheckedOutEvent for order-service
      await this.eventBus.publish(
        new CartCheckedOutEvent({
          aggregateId: cart.id,
          payload: {
            cartId: cart.id,
            userId: cart.userId ?? '',
            items: detail.items.map((item) => {
              const product = productMap.get(item.productId);
              return {
                productId: item.productId,
                vendorId: item.vendorId,
                variantId: item.variantId,
                name: product?.name ?? item.productId,
                sku: product?.sku ?? item.productId,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                totalPrice: item.subtotal,
              };
            }),
            subtotal: cart.subtotal,
            discountAmount: cart.discountAmount,
            taxAmount: cart.taxAmount,
            shippingAmount: cart.shippingAmount,
            total: cart.total,
            currency: cart.currency,
            checkedOutAt: new Date().toISOString(),
          },
        }),
      );

      this.logger.log(
        `✅ cart.cart.checked_out published — cartId=${cart.id} items=${detail.items.length}`,
      );

      return cart;
    } catch (e) {
      if (e instanceof ProceedToCheckoutError) throw e;
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new ProceedToCheckoutError(c.dto.cartId, msg);
    }
  }
}
