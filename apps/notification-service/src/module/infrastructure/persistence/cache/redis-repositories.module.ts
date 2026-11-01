/**
 * Redis Repositories Module
 * @module notification-service/infrastructure/persistence/cache
 */
import { Module } from '@nestjs/common';
import { NotificationCacheRepository } from './repositories/notification.cache.repository.js';
import { TemplateCacheRepository } from './repositories/template.cache.repository.js';
import { PreferenceCacheRepository } from './repositories/preference.cache.repository.js';
import { DeviceCacheRepository } from './repositories/device.cache.repository.js';
import { IdempotencyCacheRepository } from './repositories/idempotency.cache.repository.js';

const CACHE_REPOSITORIES = [
  NotificationCacheRepository,
  TemplateCacheRepository,
  PreferenceCacheRepository,
  DeviceCacheRepository,
  IdempotencyCacheRepository,
];

@Module({
  providers: CACHE_REPOSITORIES,
  exports: CACHE_REPOSITORIES,
})
export class RedisRepositoriesModule {}
