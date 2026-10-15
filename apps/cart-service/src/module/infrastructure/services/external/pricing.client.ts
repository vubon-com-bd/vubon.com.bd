/**
 * PricingClient — HTTP client for pricing data
 * @module cart-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface PriceDTO {
  readonly productId: string;
  readonly variantId?: string;
  readonly price: number;
  readonly currency: string;
  readonly compareAtPrice?: number;
}

@Injectable()
export class PricingClient {
  private readonly logger = new Logger(PricingClient.name);
  private readonly baseUrl = getOptionalEnv('PRODUCT_SERVICE_URL', 'http://localhost:3001');
  private readonly timeout = Number(getOptionalEnv('PRICING_TIMEOUT', '5000'));

  async getPrice(productId: string, variantId?: string): Promise<PriceDTO | null> {
    const path = variantId
      ? `/pricing/${productId}?variantId=${variantId}`
      : `/pricing/${productId}`;
    try {
      const res = await fetch(`${this.baseUrl}${path}`, {
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) return null;
      return (await res.json()) as PriceDTO;
    } catch {
      return null;
    }
  }

  async getPrices(ids: readonly string[]): Promise<readonly PriceDTO[]> {
    try {
      const res = await fetch(`${this.baseUrl}/pricing/batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) return [];
      return (await res.json()) as readonly PriceDTO[];
    } catch {
      return [];
    }
  }
}
