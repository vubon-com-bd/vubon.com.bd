/**
 * RedisRepositoriesModule — wires cache repositories into DI
 * @module notification-service/infrastructure/persistence/cache
 */
import { Global, Module } from '@nestjs/common';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache';

import { NotificationCacheRepository } from './repositories/notification.cache.repository.js';
import { TemplateCacheRepository } from './repositories/template.cache.repository.js';
import { PreferenceCacheRepository } from './repositories/preference.cache.repository.js';
import { RateLimitCacheRepository } from './repositories/rate-limit.cache.repository.js';
import { IdempotencyCacheRepository } from './repositories/idempotency.cache.repository.js';
import { DeviceTokenCacheRepository } from './repositories/device-token.cache.repository.js';

const CACHE_REPOSITORIES = [
  NotificationCacheRepository,
  TemplateCacheRepository,
  PreferenceCacheRepository,
  RateLimitCacheRepository,
  IdempotencyCacheRepository,
  DeviceTokenCacheRepository,
];

@Global()
@Module({
  imports: [RedisModule],
  providers: [...CACHE_REPOSITORIES],
  exports: [...CACHE_REPOSITORIES],
})
export class RedisRepositoriesModule {}
