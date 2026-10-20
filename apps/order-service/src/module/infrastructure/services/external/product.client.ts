/**
 * ProductClient — HTTP client for product-service
 * @module order-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface ProductDTO {
  readonly id: string;
  readonly name?: string;
  readonly sku?: string;
  readonly price?: number;
  readonly currency?: string;
  readonly stock?: number;
}

@Injectable()
export class ProductClient {
  private readonly logger = new Logger(ProductClient.name);
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor() {
    this.baseUrl = getOptionalEnv('PRODUCT_SERVICE_URL', 'http://localhost:3002');
    this.timeout = Number(getOptionalEnv('PRODUCT_SERVICE_TIMEOUT', '5000'));
  }

  async getById(id: string): Promise<ProductDTO | null> {
    try {
      const res = await fetch(`${this.baseUrl}/products/${id}`, {
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`HTTP ${res.status}`);
      }
      return (await res.json()) as ProductDTO;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Fetch failed (${id}): ${msg.slice(0, 100)}`);
      return null;
    }
  }

  async getByIds(ids: readonly string[]): Promise<readonly ProductDTO[]> {
    if (ids.length === 0) return [];
    try {
      const res = await fetch(`${this.baseUrl}/products/batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) return [];
      return (await res.json()) as readonly ProductDTO[];
    } catch {
      return [];
    }
  }
}
