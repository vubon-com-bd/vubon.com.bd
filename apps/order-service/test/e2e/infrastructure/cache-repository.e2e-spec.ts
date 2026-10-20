/**
 * CacheRepository E2E
 * @module order-service/test/e2e/infrastructure
 */
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { OrderCacheRepository } from '@infrastructure/cache/repositories/order.cache.repository.js';
import { IdempotencyCacheRepository } from '@infrastructure/cache/repositories/idempotency.cache.repository.js';

describe('CacheRepository E2E', () => {
  let redis: RedisService;
  let orderCache: OrderCacheRepository;
  let idempotencyCache: IdempotencyCacheRepository;

  beforeAll(async () => {
    redis = new RedisService();
    await redis.onModuleInit();
    orderCache = new OrderCacheRepository(redis);
    idempotencyCache = new IdempotencyCacheRepository(redis);
  });

  afterAll(async () => {
    await redis.onModuleDestroy();
  });

  describe('OrderCacheRepository', () => {
    it('should return null for missing key', async () => {
      const result = await orderCache.get('nonexistent-order-id');
      expect(result).toBeNull();
    });

    it('should set and retrieve cached DTO', async () => {
      const dto = {
        id: 'order-test-1',
        orderNumber: 'ORD-2026-000001',
        status: 'pending',
      } as never;

      await orderCache.set('order-test-1', dto);
      const retrieved = await orderCache.get('order-test-1');
      expect(retrieved).toEqual(dto);

      await orderCache.invalidate('order-test-1');
    });

    it('should invalidate cached entry', async () => {
      const dto = { id: 'order-test-2' } as never;
      await orderCache.set('order-test-2', dto);
      await orderCache.invalidate('order-test-2');
      const retrieved = await orderCache.get('order-test-2');
      expect(retrieved).toBeNull();
    });

    it('should invalidate list by customer', async () => {
      await expect(
        orderCache.invalidateList('customer-1'),
      ).resolves.not.toThrow();
    });

    it('should invalidate list for all (no customer)', async () => {
      await expect(orderCache.invalidateList()).resolves.not.toThrow();
    });
  });

  describe('IdempotencyCacheRepository', () => {
    it('should return null for missing idempotency key', async () => {
      const result = await idempotencyCache.get('nonexistent-idem-key');
      expect(result).toBeNull();
    });

    it('should set and get idempotency record', async () => {
      await idempotencyCache.set('idem-test-1', 'order-xyz');
      const record = await idempotencyCache.get('idem-test-1');
      expect(record).not.toBeNull();
      expect(record?.orderId).toBe('order-xyz');
      expect(record?.createdAt).toBeDefined();

      await idempotencyCache.delete('idem-test-1');
    });

    it('should delete idempotency record', async () => {
      await idempotencyCache.set('idem-test-2', 'order-abc');
      await idempotencyCache.delete('idem-test-2');
      const record = await idempotencyCache.get('idem-test-2');
      expect(record).toBeNull();
    });

    it('should acquire lock', async () => {
      const acquired = await idempotencyCache.tryLock('lock-test-1');
      expect(acquired).toBe(true);

      await idempotencyCache.releaseLock('lock-test-1');
    });

    it('should fail to acquire already-locked lock', async () => {
      const first = await idempotencyCache.tryLock('lock-test-2');
      expect(first).toBe(true);

      const second = await idempotencyCache.tryLock('lock-test-2');
      expect(second).toBe(false);

      await idempotencyCache.releaseLock('lock-test-2');
    });

    it('should release lock', async () => {
      await idempotencyCache.tryLock('lock-test-3');
      await idempotencyCache.releaseLock('lock-test-3');
      const reacquired = await idempotencyCache.tryLock('lock-test-3');
      expect(reacquired).toBe(true);
      await idempotencyCache.releaseLock('lock-test-3');
    });
  });
});
