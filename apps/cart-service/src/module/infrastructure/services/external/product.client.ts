/**
 * ProductClient — HTTP client for product-service
 * @module cart-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface ProductDTO {
  readonly id: string;
  readonly name: string;
  readonly sku: string;
  readonly price: number;
  readonly currency: string;
  readonly isAvailable: boolean;
  readonly imageUrl?: string;
}

@Injectable()
export class ProductClient {
  private readonly logger = new Logger(ProductClient.name);
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor() {
    this.baseUrl = getOptionalEnv('PRODUCT_SERVICE_URL', 'http://localhost:3001');
    this.timeout = Number(getOptionalEnv('PRODUCT_SERVICE_TIMEOUT', '5000'));
  }

  async getById(id: string): Promise<ProductDTO | null> {
    return this.fetchOne(`/products/${id}`);
  }

  async getByIds(ids: readonly string[]): Promise<readonly ProductDTO[]> {
    if (ids.length === 0) return [];
    return this.fetchMany('/products/batch', { ids });
  }

  async checkAvailability(id: string): Promise<boolean> {
    const product = await this.getById(id);
    return product?.isAvailable ?? false;
  }

  async isHealthy(): Promise<boolean> {
    return this.healthCheck('/health');
  }

  private async fetchOne(path: string): Promise<ProductDTO | null> {
    try {
      const res = await fetch(`${this.baseUrl}${path}`, {
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`HTTP ${res.status}`);
      }
      return (await res.json()) as ProductDTO;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Fetch failed (${path}): ${msg.slice(0, 100)}`);
      return null;
    }
  }

  private async fetchMany(
    path: string,
    body: unknown,
  ): Promise<readonly ProductDTO[]> {
    try {
      const res = await fetch(`${this.baseUrl}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) return [];
      return (await res.json()) as readonly ProductDTO[];
    } catch {
      return [];
    }
  }

  private async healthCheck(path: string): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}${path}`, {
        signal: AbortSignal.timeout(2000),
      });
      return res.ok;
    } catch {
      return false;
    }
  }
}
