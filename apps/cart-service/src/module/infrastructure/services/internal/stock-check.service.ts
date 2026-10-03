/**
 * StockCheckService (infrastructure) — fetch stock + check sufficiency
 * @module cart-service/infrastructure/services/internal
 */
import { Injectable, Logger } from '@nestjs/common';
import { CartEntity } from '../../../domain/entities/cart.entity.js';
import { StockCheckService as DomainStock, type BulkStockCheckResult, type StockSnapshot } from '../../../domain/services/stock-check.service.js';
import { ProductClient } from '../external/product.client.js';

export const STOCK_CHECK_SERVICE = Symbol('STOCK_CHECK_SERVICE');

@Injectable()
export class StockCheckService {
  private readonly logger = new Logger(StockCheckService.name);
  private readonly domain = new DomainStock();

  constructor(private readonly product: ProductClient) {}

  async checkCart(cart: CartEntity): Promise<BulkStockCheckResult> {
    const ids = cart.items.map((i) => i.productId.value);
    const products = await this.product.getProducts(ids);

    const snapshot: StockSnapshot[] = products.map((p) => ({
      productId: p.id,
      available: p.stock,
    }));

    return this.domain.checkCart(cart, snapshot);
  }

  async getAvailableStock(productId: string, variantId?: string): Promise<number> {
    return this.product.getStock(productId, variantId);
  }
}
