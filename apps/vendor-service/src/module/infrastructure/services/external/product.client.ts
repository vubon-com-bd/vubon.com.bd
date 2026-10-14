/**
 * ProductClient — HTTP client for product-service (vendor product counts)
 * @module vendor-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface ProductCountDTO {
  readonly vendorId: string;
  readonly totalProducts: number;
}

@Injectable()
export class ProductClient {
  private readonly logger = new Logger(ProductClient.name);
  private readonly baseUrl: string;
  private readonly timeoutMs: number;

  constructor() {
    this.baseUrl = getOptionalEnv('PRODUCT_SERVICE_URL', 'http://localhost:3003');
    this.timeoutMs = Number(getOptionalEnv('PRODUCT_SERVICE_TIMEOUT', '5000'));
  }

  async getVendorProductCount(vendorId: string): Promise<number> {
    try {
      const res = await fetch(`${this.baseUrl}/products/stats/vendor/${vendorId}`, {
        signal: AbortSignal.timeout(this.timeoutMs),
      });
      if (!res.ok) return 0;
      const data = (await res.json()) as ProductCountDTO;
      return data.totalProducts ?? 0;
    } catch {
      return 0;
    }
  }

  async isHealthy(): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/health`, {
        signal: AbortSignal.timeout(2000),
      });
      return res.ok;
    } catch {
      return false;
    }
  }
}
