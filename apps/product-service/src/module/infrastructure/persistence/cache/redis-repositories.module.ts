/**
 * Redis Repositories Module
 * @module product-service/infrastructure/persistence/cache
 */
import { Module } from '@nestjs/common';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { ProductCacheRepository } from './repositories/product.cache.repository.js';
import { ProductVariantCacheRepository } from './repositories/product-variant.cache.repository.js';
import { ProductPricingCacheRepository } from './repositories/product-pricing.cache.repository.js';
import { ProductReviewCacheRepository } from './repositories/product-review.cache.repository.js';
import { IdempotencyCacheRepository } from './repositories/idempotency.cache.repository.js';

const REPOSITORIES = [
  ProductCacheRepository,
  ProductVariantCacheRepository,
  ProductPricingCacheRepository,
  ProductReviewCacheRepository,
  IdempotencyCacheRepository,
];

@Module({
  imports: [RedisModule],
  providers: REPOSITORIES,
  exports: REPOSITORIES,
})
export class RedisRepositoriesModule {}
