/**
 * RedisRepositoriesModule — wires cache repositories
 * @module vendor-service/infrastructure/persistence/cache
 */
import { Module } from '@nestjs/common';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache';

import { VendorCacheRepository } from './repositories/vendor.cache.repository.js';
import { VendorSlugCacheRepository } from './repositories/vendor-slug.cache.repository.js';
import { VendorStatsCacheRepository } from './repositories/vendor-stats.cache.repository.js';
import { VendorSearchCacheRepository } from './repositories/vendor-search.cache.repository.js';

const CACHE_REPOS = [
  VendorCacheRepository,
  VendorSlugCacheRepository,
  VendorStatsCacheRepository,
  VendorSearchCacheRepository,
];

@Module({
  imports: [RedisModule],
  providers: [...CACHE_REPOS],
  exports: [...CACHE_REPOS],
})
export class RedisRepositoriesModule {}
