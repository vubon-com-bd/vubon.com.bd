/**
 * CacheRepositoriesModule — wires cache repositories
 * @module logistics-service/infrastructure/persistence/cache
 */
import { Global, Module } from '@nestjs/common';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import {
  ShipmentCacheRepository, CourierCacheRepository, WarehouseCacheRepository,
  DeliveryCacheRepository, TrackingCacheRepository, RouteCacheRepository,
  ZoneCacheRepository, ShippingMethodCacheRepository,
} from './repositories/index.js';

const CACHES = [
  ShipmentCacheRepository, CourierCacheRepository, WarehouseCacheRepository,
  DeliveryCacheRepository, TrackingCacheRepository, RouteCacheRepository,
  ZoneCacheRepository, ShippingMethodCacheRepository,
] as const;

@Global()
@Module({
  imports: [RedisModule],
  providers: [...CACHES],
  exports: [...CACHES],
})
export class CacheRepositoriesModule {}
