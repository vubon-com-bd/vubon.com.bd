import { Injectable, Logger } from '@nestjs/common';
import type { CartItemEntity } from '../../../domain/entities/cart-item.entity';
import { ProductClient } from '../external/product.client';
import { PricingClient } from '../external/pricing.client';

export interface PriceChange {
  readonly productId: string;
  readonly oldPrice: number;
  readonly newPrice: number;
}

@Injectable()
export class PriceSyncService {
  private readonly logger = new Logger(PriceSyncService.name);

  constructor(
    private readonly productClient: ProductClient,
    private readonly pricingClient: PricingClient,
  ) {}

  async detectChanges(
    items: readonly CartItemEntity[],
  ): Promise<readonly PriceChange[]> {
    const productIds = items.map((i) => i.productId.value);
    const latestPrices = await this.productClient.getPrices(productIds);

    const changes: PriceChange[] = [];
    for (const item of items) {
      const latest = latestPrices[item.productId.value];
      if (typeof latest === 'number' && latest !== item.unitPrice) {
        changes.push({
          productId: item.productId.value,
          oldPrice: item.unitPrice,
          newPrice: latest,
        });
      }
    }

    if (changes.length > 0) {
      this.logger.log(`Detected ${changes.length} price changes`);
    }
    return changes;
  }

  async refetchQuote(productId: string, quantity: number): Promise<number | null> {
    const quote = await this.pricingClient.quote(productId, quantity);
    return quote?.unitPrice ?? null;
  }
}
