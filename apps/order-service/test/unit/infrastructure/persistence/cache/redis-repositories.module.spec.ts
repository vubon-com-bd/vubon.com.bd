/**
 * RedisRepositoriesModule Tests
 * @module order-service/test/unit/infrastructure/persistence/cache
 */
import { RedisRepositoriesModule } from '@infrastructure/cache/redis-repositories.module.js';
import { OrderCacheRepository } from '@infrastructure/cache/repositories/order.cache.repository.js';
import { CheckoutCacheRepository } from '@infrastructure/cache/repositories/checkout.cache.repository.js';
import { DeliveryCacheRepository } from '@infrastructure/cache/repositories/delivery.cache.repository.js';
import { OrderTrackingCacheRepository } from '@infrastructure/cache/repositories/order-tracking.cache.repository.js';
import { IdempotencyCacheRepository } from '@infrastructure/cache/repositories/idempotency.cache.repository.js';

describe('RedisRepositoriesModule', () => {
  it('should be defined', () => {
    expect(RedisRepositoriesModule).toBeDefined();
  });

  it('should expose all 5 cache repositories as provider classes', () => {
    const repos = [
      OrderCacheRepository,
      CheckoutCacheRepository,
      DeliveryCacheRepository,
      OrderTrackingCacheRepository,
      IdempotencyCacheRepository,
    ];
    repos.forEach((repo) => {
      expect(repo).toBeDefined();
      expect(typeof repo).toBe('function');
    });
  });

  it('should have module metadata with providers array', () => {
    const providers = Reflect.getMetadata('providers', RedisRepositoriesModule);
    expect(providers).toBeDefined();
    expect(Array.isArray(providers)).toBe(true);
    expect((providers as unknown[]).length).toBeGreaterThanOrEqual(5);
  });

  it('should have module metadata with exports array', () => {
    const exports = Reflect.getMetadata('exports', RedisRepositoriesModule);
    expect(exports).toBeDefined();
    expect(Array.isArray(exports)).toBe(true);
    expect((exports as unknown[]).length).toBeGreaterThanOrEqual(5);
  });
});
