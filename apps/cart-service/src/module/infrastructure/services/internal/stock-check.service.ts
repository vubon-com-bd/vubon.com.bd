import { Injectable, Logger } from '@nestjs/common';
import { StockCheckService as DomainStockCheck } from '../../../domain/services/stock-check.service';
import type { CartItemEntity } from '../../../domain/entities/cart-item.entity';
import { ProductClient } from '../external/product.client';

export interface StockIssue {
  readonly productId: string;
  readonly availableQuantity: number;
  readonly requested: number;
}

@Injectable()
export class StockCheckService {
  private readonly logger = new Logger(StockCheckService.name);

  constructor(
    private readonly productClient: ProductClient,
    private readonly domainStockCheck: DomainStockCheck,
  ) {}

  async findIssues(items: readonly CartItemEntity[]): Promise<readonly StockIssue[]> {
    const productIds = items.map((i) => i.productId.value);
    const stock = await this.productClient.getStock(productIds);

    const unavailable = this.domainStockCheck.findUnavailable(items, stock);

    return unavailable.map((u) => {
      const item = items.find((i) => i.productId.value === u.productId);
      return {
        productId: u.productId,
        availableQuantity: u.availableQuantity,
        requested: item?.quantity.quantity ?? 0,
      };
    });
  }
}
