/**
 * Product Health Indicator
 * @module product-service/modules/product/health
 */
import { Injectable, Logger } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY,
  type ProductRepository,
} from '../../../domain/repositories/product.repository.interface.js';
import { Inject } from '@nestjs/common';

export interface ProductFeatureHealthReport {
  readonly name: string;
  readonly healthy: boolean;
  readonly message?: string;
}

@Injectable()
export class ProductFeatureHealthIndicator {
  private readonly logger = new Logger(ProductFeatureHealthIndicator.name);

  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repo: ProductRepository,
  ) {}

  async check(): Promise<ProductFeatureHealthReport> {
    try {
      const rows = await this.repo.findAll();
      return {
        name: 'product-repository',
        healthy: true,
        message: `${rows.length} products`,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.warn(`Product health failed: ${msg}`);
      return { name: 'product-repository', healthy: false, message: msg };
    }
  }
}
