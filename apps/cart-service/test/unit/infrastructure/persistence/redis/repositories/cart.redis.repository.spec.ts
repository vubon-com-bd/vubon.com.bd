/**
 * CartRedisRepository — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { CartRedisRepository } from '@infrastructure/persistence/redis/repositories/cart.redis.repository.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { IdempotencyKeyVO } from '@domain/value-objects/primitives/idempotency-key.vo.js';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';
import {
  makeMockCartRedisService,
  type MockCartRedisService,
} from '@test-infra/index';

describe('CartRedisRepository', () => {
  let redis: MockCartRedisService;
  let repo: CartRedisRepository;

  beforeEach(() => {
    redis = makeMockCartRedisService();
    repo = new CartRedisRepository(redis as never);
  });

  // ═══════════════ SAVE + FIND ═══════════════

  describe('save() + findByIdVO()', () => {
    it('should save and retrieve cart by id', async () => {
      const { makeUserCart } = await import('@fixtures/cart.fixture');
      const cart = makeUserCart();

      await repo.save(cart);
      expect(redis.set).toHaveBeenCalled();

      const found = await repo.findByIdVO(CartIdVO.reconstitute(cart.id));
      expect(found).not.toBeNull();
      expect(found?.id).toBe(cart.id);
    });

    it('should return null for missing id', async () => {
      const found = await repo.findByIdVO(CartIdVO.reconstitute(TEST_IDS.CART_ID));
      expect(found).toBeNull();
    });
  });

  describe('exists()', () => {
    it('should return true after save', async () => {
      const { makeUserCart } = await import('@fixtures/cart.fixture');
      const cart = makeUserCart();
      await repo.save(cart);
      expect(await repo.exists(cart.id)).toBe(true);
    });

    it('should return false for missing', async () => {
      expect(await repo.exists('missing-id')).toBe(false);
    });
  });

  // ═══════════════ SAVE INDEXES ═══════════════

  describe('save() indexes', () => {
    it('should index by user + active', async () => {
      const { makeUserCart } = await import('@fixtures/cart.fixture');
      const cart = makeUserCart();
      await repo.save(cart);

      const active = await repo.findActiveByUserId(TEST_IDS.USER_ID);
      expect(active?.id).toBe(cart.id);
    });

    it('should index by status', async () => {
      const { makeUserCart } = await import('@fixtures/cart.fixture');
      const cart = makeUserCart();
      await repo.save(cart);

      const active = await repo.findByStatus('active');
      expect(active.length).toBeGreaterThan(0);
    });

    it('should index idempotency key (manual index)', async () => {
      const { makeUserCart } = await import('@fixtures/cart.fixture');
      const cart = makeUserCart();
      const key = IdempotencyKeyVO.create('idem-key-test-12345');

      // Save cart + manually set idempotency key index (simulates mapper-persisted state)
      await repo.save(cart);
      await redis.set(`cart:by-idem:${key.value}`, cart.id);

      const found = await repo.findByIdempotencyKey(key);
      expect(found?.id).toBe(cart.id);
    });

    it('should return null for unknown idempotency key', async () => {
      const key = IdempotencyKeyVO.create('unknown-key-12345678');
      const found = await repo.findByIdempotencyKey(key);
      expect(found).toBeNull();
    });
  });

  // ═══════════════ FIND ALL ═══════════════

  describe('findAll()', () => {
    it('should return all saved carts', async () => {
      const { makeUserCart } = await import('@fixtures/cart.fixture');
      await repo.save(makeUserCart());
      const all = await repo.findAll();
      expect(all.length).toBeGreaterThan(0);
    });
  });

  // ═══════════════ COUNT ═══════════════

  describe('countByUserId()', () => {
    it('should count user carts', async () => {
      const { makeUserCart } = await import('@fixtures/cart.fixture');
      await repo.save(makeUserCart());
      const count = await repo.countByUserId(TEST_IDS.USER_ID);
      expect(count).toBeGreaterThan(0);
    });
  });

  describe('countActiveByUserId()', () => {
    it('should count active carts', async () => {
      const { makeUserCart } = await import('@fixtures/cart.fixture');
      await repo.save(makeUserCart());
      const count = await repo.countActiveByUserId(TEST_IDS.USER_ID);
      expect(count).toBe(1);
    });
  });

  // ═══════════════ PAGINATION ═══════════════

  describe('findPaginated()', () => {
    it('should paginate correctly', async () => {
      const { makeUserCart } = await import('@fixtures/cart.fixture');
      await repo.save(makeUserCart());

      const result = await repo.findPaginated({ page: 1, limit: 10 });
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
      expect(result.totalPages).toBeGreaterThanOrEqual(1);
    });
  });

  // ═══════════════ STATS ═══════════════

  describe('getStats()', () => {
    it('should aggregate stats', async () => {
      const { makeUserCart } = await import('@fixtures/cart.fixture');
      await repo.save(makeUserCart());
      const stats = await repo.getStats();
      expect(stats.total).toBeGreaterThan(0);
      expect(stats.byStatus).toBeDefined();
      expect(stats.byType).toBeDefined();
    });
  });

  // ═══════════════ DELETE ═══════════════

  describe('delete()', () => {
    it('should remove cart', async () => {
      const { makeUserCart } = await import('@fixtures/cart.fixture');
      const cart = makeUserCart();
      await repo.save(cart);
      await repo.delete(cart.id);
      const found = await repo.findById(cart.id);
      expect(found).toBeNull();
    });
  });

  describe('softDelete()', () => {
    it('should clear cart content', async () => {
      const { makeUserCart } = await import('@fixtures/cart.fixture');
      const cart = makeUserCart();
      await repo.save(cart);
      await repo.softDelete(cart.id);
      const found = await repo.findById(cart.id);
      expect(found?.isCleared()).toBe(true);
    });
  });

  // ═══════════════ BULK ═══════════════

  describe('bulkUpdateStatus()', () => {
    it('should update multiple carts (with "expired" status)', async () => {
      const { makeUserCart } = await import('@fixtures/cart.fixture');
      const cart = makeUserCart();
      await repo.save(cart);
      const count = await repo.bulkUpdateStatus([cart.id], 'expired');
      expect(count).toBe(1);
    });

    it('should update multiple carts (with "cleared" status)', async () => {
      const { makeUserCart } = await import('@fixtures/cart.fixture');
      const cart = makeUserCart();
      await repo.save(cart);
      const count = await repo.bulkUpdateStatus([cart.id], 'cleared');
      expect(count).toBe(1);
    });

    it('should skip non-existent carts', async () => {
      const count = await repo.bulkUpdateStatus(['missing-id'], 'expired');
      expect(count).toBe(0);
    });
  });

  // ═══════════════ CRON ═══════════════

  describe('findStale()', () => {
    it('should return stale carts', async () => {
      const stale = await repo.findStale(0); // 0 min = everything is stale
      expect(Array.isArray(stale)).toBe(true);
    });
  });

  describe('findExpired()', () => {
    it('should find expired carts', async () => {
      const expired = await repo.findExpired(new Date(Date.now() + 1000 * 60 * 60 * 24 * 9999));
      expect(Array.isArray(expired)).toBe(true);
    });
  });

  describe('findAbandonable()', () => {
    it('should find abandonable carts', async () => {
      const abandonable = await repo.findAbandonable(0);
      expect(Array.isArray(abandonable)).toBe(true);
    });
  });

  describe('findRetryable()', () => {
    it('should return empty (placeholder)', async () => {
      expect(await repo.findRetryable()).toEqual([]);
    });
  });
});
