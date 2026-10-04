/**
 * CacheRepositoriesModule — wires Redis-backed cache repositories
 * @module order-service/infrastructure/persistence/cache
 *
 * NOTE: RedisModule (shared-kernel) is @Global() so RedisService is available.
 */
import { Module } from '@nestjs/common';
import { OrderCacheRepository } from './repositories/order.cache.repository.js';
import { CheckoutCacheRepository } from './repositories/checkout.cache.repository.js';
import { DeliveryCacheRepository } from './repositories/delivery.cache.repository.js';
import { OrderTrackingCacheRepository } from './repositories/order-tracking.cache.repository.js';

@Module({
  providers: [
    OrderCacheRepository,
    CheckoutCacheRepository,
    DeliveryCacheRepository,
    OrderTrackingCacheRepository,
  ],
  exports: [
    OrderCacheRepository,
    CheckoutCacheRepository,
    DeliveryCacheRepository,
    OrderTrackingCacheRepository,
  ],
})
export class CacheRepositoriesModule {}
