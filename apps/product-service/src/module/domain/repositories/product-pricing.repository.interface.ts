/**
 * Product Pricing Repository Interface
 * @module product-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { ProductPricingEntity } from '../entities/product-pricing.entity.js';
import type { PriceIdVO } from '../value-objects/primitives/price-id.vo.js';
import type { ProductIdVO } from '../value-objects/primitives/product-id.vo.js';

export const PRICING_REPOSITORY = Symbol('PRICING_REPOSITORY');

export interface PricingListFilter {
  readonly productId?: string;
  readonly currency?: string;
  readonly hasDiscount?: boolean;
  readonly effectiveAt?: string;
}

export interface PricingListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'sellingPrice' | 'updatedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: PricingListFilter;
}

export interface PricingPaginationResult {
  readonly items: readonly ProductPricingEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface PricingStats {
  readonly total: number;
  readonly averageSellingPrice: number;
  readonly minPrice: number;
  readonly maxPrice: number;
  readonly discountedCount: number;
  readonly byCurrency: Readonly<Record<string, number>>;
}

export interface ProductPricingRepository extends BaseRepository<ProductPricingEntity, string> {
  findByIdVO(id: PriceIdVO): Promise<ProductPricingEntity | null>;

  findByProduct(productId: ProductIdVO): Promise<ProductPricingEntity | null>;

  findPaginated(options: PricingListOptions): Promise<PricingPaginationResult>;

  getStats(filter?: PricingListFilter): Promise<PricingStats>;

  // Cron
  findExpired(at: string): Promise<readonly ProductPricingEntity[]>;
  findExpiringSoon(withinHours: number, at: string): Promise<readonly ProductPricingEntity[]>;

  softDelete(id: string, deletedBy?: string): Promise<void>;
}
