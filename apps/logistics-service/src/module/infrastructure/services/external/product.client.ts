/**
 * ProductClient — HTTP client for product-service
 * @module logistics-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface ProductDTO {
  readonly id: string;
  readonly vendorId?: string;
  readonly sku?: string;
  readonly name?: string;
  readonly weightKg?: number;
  readonly dimensionsCm?: { length?: number; width?: number; height?: number };
}

const SERVICE_URL_KEY = 'PRODUCT_SERVICE_URL';
const DEFAULT_URL = 'http://localhost:3002';
const DEFAULT_TIMEOUT_MS = 5000;

@Injectable()
export class ProductClient {
  private readonly logger = new Logger(ProductClient.name);
  private readonly baseUrl: string;
  private readonly timeoutMs: number;

  constructor() {
    this.baseUrl = getOptionalEnv(SERVICE_URL_KEY, DEFAULT_URL);
    this.timeoutMs = Number(getOptionalEnv('PRODUCT_SERVICE_TIMEOUT_MS', String(DEFAULT_TIMEOUT_MS)));
  }

  async getById(id: string): Promise<ProductDTO | null> {
    try {
      const res = await fetch(`${this.baseUrl}/products/${id}`, {
        signal: AbortSignal.timeout(this.timeoutMs),
      });
      if (!res.ok) {
        if (res.status === 404) return null;
        this.logger.warn(`Product fetch failed (${id}): HTTP ${res.status}`);
        return null;
      }
      const body = (await res.json()) as { data?: ProductDTO } | ProductDTO;
      return 'data' in body && body.data ? body.data : (body as ProductDTO);
    } catch (err) {
      this.logger.warn(`Product fetch error (${id}): ${this.errMsg(err)}`);
      return null;
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

  private errMsg(err: unknown): string {
    return err instanceof Error ? err.message : 'unknown';
  }
}
