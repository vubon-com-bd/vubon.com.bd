/**
 * Product Service Client
 * @module notification-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface ProductSummaryDTO {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly status: string;
  readonly thumbnailUrl?: string;
}

@Injectable()
export class ProductClient {
  private readonly logger = new Logger(ProductClient.name);
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = getOptionalEnv('PRODUCT_SERVICE_URL', 'http://localhost:3003');
  }

  async getById(id: string): Promise<ProductSummaryDTO | null> {
    try {
      const res = await fetch(`${this.baseUrl}/products/${id}`, {
        signal: AbortSignal.timeout(3000),
      });
      if (!res.ok) return null;
      return (await res.json()) as ProductSummaryDTO;
    } catch (err) {
      this.logger.warn(`Fetch product ${id} failed: ${String(err).slice(0, 100)}`);
      return null;
    }
  }
}
