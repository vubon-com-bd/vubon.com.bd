/**
 * Idempotency Flow E2E
 * @module payment-service/test/e2e/infrastructure
 *
 * Verifies:
 *  - Same idempotency key → single payment
 *  - Different keys → different payments
 *  - Concurrent requests blocked by lock
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { IdempotencyService } from '@infrastructure/services/internal/idempotency.service';
import { IdempotencyCacheRepository } from '@infrastructure/cache/repositories/idempotency.cache.repository';
import {
  makeRedisMock,
  type RedisMock,
  UUID,
} from './setup/infra-e2e-fixtures';

describe('E2E: Idempotency Flow', () => {
  let redis: RedisMock;
  let cacheRepo: IdempotencyCacheRepository;
  let service: IdempotencyService;

  beforeEach(() => {
    redis = makeRedisMock();
    cacheRepo = new IdempotencyCacheRepository(redis as never);
    service = new IdempotencyService(cacheRepo);
  });

  describe('Lookup → Remember → Replay', () => {
    it('first request: miss → process → remember', async () => {
      const key = 'idem-abc-123';

      // 1. First lookup: miss
      const first = await service.lookup(key);
      expect(first.hit).toBe(false);

      // 2. Process the payment (simulate)
      const paymentId = UUID.PAYMENT;

      // 3. Remember result
      await service.remember(key, paymentId);

      // 4. Second lookup: hit
      const second = await service.lookup(key);
      expect(second.hit).toBe(true);
      expect(second.resultId).toBe(paymentId);
    });

    it('replay returns cached resultId', async () => {
      const key = 'idem-replay';
      await service.remember(key, UUID.PAYMENT);

      const result = await service.lookup(key);
      expect(result.hit).toBe(true);
      expect(result.resultId).toBe(UUID.PAYMENT);
    });
  });

  describe('Different keys → separate payments', () => {
    it('two different keys yield different resultIds', async () => {
      await service.remember('key-1', 'pay-1');
      await service.remember('key-2', 'pay-2');

      const r1 = await service.lookup('key-1');
      const r2 = await service.lookup('key-2');
      expect(r1.resultId).toBe('pay-1');
      expect(r2.resultId).toBe('pay-2');
      expect(r1.resultId).not.toBe(r2.resultId);
    });
  });

  describe('Lock protection', () => {
    it('acquire → lock prevents second request', async () => {
      const key = 'idem-lock';

      // 1. First request acquires lock
      const acquired = await service.tryLock(key);
      expect(acquired).toBe(true);

      // 2. Second request tries lock → denied
      const second = await service.tryLock(key);
      expect(second).toBe(false);

      // 3. First request releases
      await service.releaseLock(key);

      // 4. Second request can now acquire
      const third = await service.tryLock(key);
      expect(third).toBe(true);
    });

    it('isLocked returns true during lock', async () => {
      const key = 'idem-lock-2';
      await service.tryLock(key);
      expect(await service.isLocked(key)).toBe(true);

      await service.releaseLock(key);
      expect(await service.isLocked(key)).toBe(false);
    });
  });

  describe('Full flow: client with retry', () => {
    it('client sends same key twice → one payment', async () => {
      const idemKey = 'client-request-123';

      // First request
      const lookup1 = await service.lookup(idemKey);
      expect(lookup1.hit).toBe(false);
      await service.tryLock(idemKey);
      await service.remember(idemKey, UUID.PAYMENT);
      await service.releaseLock(idemKey);

      // Retry (same key)
      const lookup2 = await service.lookup(idemKey);
      expect(lookup2.hit).toBe(true);
      expect(lookup2.resultId).toBe(UUID.PAYMENT);
      // → client gets same paymentId, no duplicate
    });
  });

  describe('Forget key', () => {
    it('forget removes idempotency record', async () => {
      await service.remember('to-forget', 'pay-x');
      expect((await service.lookup('to-forget')).hit).toBe(true);

      await service.forget('to-forget');
      expect((await service.lookup('to-forget')).hit).toBe(false);
    });
  });
});
