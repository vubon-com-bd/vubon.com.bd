/**
 * PriceSyncService (infrastructure) — fetch prices + detect changes
 * @module cart-service/infrastructure/services/internal
 */
import { Injectable, Logger } from '@nestjs/common';
import { CartEntity } from '../../../domain/entities/cart.entity.js';
import { PriceSyncService as DomainSync, type PriceSyncResult, type CurrentPriceSnapshot } from '../../../domain/services/price-sync.service.js';
import { PricingClient } from '../external/pricing.client.js';
import { ProductClient } from '../external/product.client.js';

export const PRICE_SYNC_SERVICE = Symbol('PRICE_SYNC_SERVICE');

@Injectable()
export class PriceSyncService {
  private readonly logger = new Logger(PriceSyncService.name);
  private readonly domain = new DomainSync();

  constructor(
    private readonly pricing: PricingClient,
    private readonly product: ProductClient,
  ) {}

  async detectChanges(cart: CartEntity): Promise<PriceSyncResult> {
    const prices = await this.pricing.getPrices(
      cart.items.map((i) => ({
        productId: i.productId.value,
        variantId: i.variantId?.value,
      })),
    );

    if (prices.length === 0) {
      return { hasChanges: false, changes: [], totalDelta: 0, currency: cart.currency };
    }

    const products = await this.product.getProducts(
      cart.items.map((i) => i.productId.value),
    );
    const availMap = new Map(products.map((p) => [p.id, p.available]));

    const snapshot: CurrentPriceSnapshot[] = prices.map((p) => ({
      productId: p.productId,
      variantId: p.variantId,
      price: p.price,
      currency: p.currency,
      available: availMap.get(p.productId) ?? true,
    }));

    return this.domain.detectChanges(cart, snapshot);
  }

  async syncAndApply(cart: CartEntity, now: string): Promise<PriceSyncResult> {
    const result = await this.detectChanges(cart);
    if (result.hasChanges) {
      this.domain.applyChanges(cart, result.changes, now);
      this.logger.log(`Applied ${result.changes.length} price changes to cart ${cart.id}`);
    }
    return result;
  }
}
