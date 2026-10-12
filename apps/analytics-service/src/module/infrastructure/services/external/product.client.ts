/**
 * Product Service Client
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface ProductDTO {
  readonly id: string;
  readonly name: string;
  readonly categoryId?: string;
  readonly brandId?: string;
  readonly vendorId?: string;
  readonly price?: number;
  readonly currency?: string;
}

@Injectable()
export class ProductClient {
  private readonly logger = new Logger(ProductClient.name);
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor() {
    this.baseUrl = getOptionalEnv('PRODUCT_SERVICE_URL', 'http://localhost:3003');
    this.timeout = Number(getOptionalEnv('PRODUCT_SERVICE_TIMEOUT', '5000'));
  }

  async getById(productId: string): Promise<ProductDTO | null> {
    try {
      const res = await fetch(`${this.baseUrl}/products/${productId}`, {
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`HTTP ${res.status}`);
      }
      return (await res.json()) as ProductDTO;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Product fetch failed (${productId}): ${msg.slice(0, 100)}`);
      return null;
    }
  }

  async getByIds(productIds: readonly string[]): Promise<readonly ProductDTO[]> {
    if (productIds.length === 0) return [];
    try {
      const res = await fetch(`${this.baseUrl}/products/batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: productIds }),
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) return [];
      return (await res.json()) as readonly ProductDTO[];
    } catch {
      return [];
    }
  }

  async isHealthy(): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/health`, { signal: AbortSignal.timeout(2000) });
      return res.ok;
    } catch {
      return false;
    }
  }
}
