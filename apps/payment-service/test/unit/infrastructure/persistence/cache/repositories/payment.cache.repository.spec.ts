/**
 * PaymentCacheRepository — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { PaymentCacheRepository } from '@infrastructure/cache/repositories/payment.cache.repository';
import {
  makeMockRedisService,
  type MockRedisService,
} from '@test-infra/redis-mock';

const DTO = {
  id: 'pay-1',
  orderId: 'ord-1',
  userId: 'usr-1',
  status: 'pending' as const,
  method: 'card' as const,
  amount: 1000,
  currency: 'BDT',
  createdAt: '2025-01-15T10:00:00.000Z',
  updatedAt: '2025-01-15T10:00:00.000Z',
};

describe('PaymentCacheRepository', () => {
  let redis: MockRedisService;
  let repo: PaymentCacheRepository;

  beforeEach(() => {
    redis = makeMockRedisService();
    repo = new PaymentCacheRepository(redis as never);
  });

  describe('get()', () => {
    it('returns null when not cached', async () => {
      expect(await repo.get('pay-1')).toBeNull();
    });

    it('returns cached DTO after set', async () => {
      await repo.set('pay-1', DTO);
      const cached = await repo.get('pay-1');
      expect(cached).toEqual(DTO);
    });

    it('uses prefixed key', async () => {
      await repo.set('pay-1', DTO);
      expect(redis.__store.has('payment-service:payment:pay-1')).toBe(true);
    });
  });

  describe('set()', () => {
    it('caches DTO with TTL 300 seconds', async () => {
      await repo.set('pay-1', DTO);
      expect(redis.set).toHaveBeenCalledWith(
        'payment-service:payment:pay-1',
        DTO,
        300,
      );
    });
  });

  describe('invalidate()', () => {
    it('deletes the cache key', async () => {
      await repo.set('pay-1', DTO);
      await repo.invalidate('pay-1');
      expect(await repo.get('pay-1')).toBeNull();
      expect(redis.del).toHaveBeenCalledWith('payment-service:payment:pay-1');
    });

    it('is idempotent on missing key', async () => {
      await repo.invalidate('missing');
      expect(redis.del).toHaveBeenCalledWith('payment-service:payment:missing');
    });
  });

  describe('invalidateList()', () => {
    it('does nothing when ownerId missing', async () => {
      await repo.invalidateList();
      expect(redis.del).not.toHaveBeenCalled();
    });

    it('deletes list key when ownerId given', async () => {
      await repo.invalidateList('usr-1');
      expect(redis.del).toHaveBeenCalledWith(
        'payment-service:payment:list:owner:usr-1',
      );
    });
  });
});
