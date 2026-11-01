/**
 * Redis Repositories Module
 * @module order-service/infrastructure/persistence/cache
 */
import { Module } from '@nestjs/common';
import { RedisModule } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { OrderCacheRepository } from './repositories/order.cache.repository.js';
import { CheckoutCacheRepository } from './repositories/checkout.cache.repository.js';
import { DeliveryCacheRepository } from './repositories/delivery.cache.repository.js';
import { OrderTrackingCacheRepository } from './repositories/order-tracking.cache.repository.js';
import { IdempotencyCacheRepository } from './repositories/idempotency.cache.repository.js';

const REPOSITORIES = [
  OrderCacheRepository,
  CheckoutCacheRepository,
  DeliveryCacheRepository,
  OrderTrackingCacheRepository,
  IdempotencyCacheRepository,
];

@Module({
  imports: [RedisModule],
  providers: REPOSITORIES,
  exports: REPOSITORIES,
})
export class RedisRepositoriesModule {}
