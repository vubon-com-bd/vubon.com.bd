/**
 * Redis Repositories Module
 * @module cart-service/infrastructure/persistence/cache
 */
import { Module } from '@nestjs/common';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache';

import { CartTotalsCacheRepository } from './repositories/cart-totals.cache.repository.js';
import { CartSummaryCacheRepository } from './repositories/cart-summary.cache.repository.js';
import { IdempotencyCacheRepository } from './repositories/idempotency.cache.repository.js';

const REPOSITORIES = [
  CartTotalsCacheRepository,
  CartSummaryCacheRepository,
  IdempotencyCacheRepository,
];

@Module({
  imports: [RedisModule],
  providers: REPOSITORIES,
  exports: REPOSITORIES,
})
export class RedisRepositoriesModule {}
