/**
 * Redis Repositories Module — cache layer for vendor-service
 * @module vendor-service/infrastructure/persistence/cache
 */
import { Module } from '@nestjs/common';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache';

import { VendorCacheRepository } from './repositories/vendor.cache.repository.js';
import { CommissionCacheRepository } from './repositories/commission.cache.repository.js';
import { PerformanceCacheRepository } from './repositories/performance.cache.repository.js';
import { SubscriptionCacheRepository } from './repositories/subscription.cache.repository.js';
import { IdempotencyCacheRepository } from './repositories/idempotency.cache.repository.js';

const REPOSITORIES = [
  VendorCacheRepository,
  CommissionCacheRepository,
  PerformanceCacheRepository,
  SubscriptionCacheRepository,
  IdempotencyCacheRepository,
];

@Module({
  imports: [RedisModule],
  providers: REPOSITORIES,
  exports: REPOSITORIES,
})
export class RedisRepositoriesModule {}
