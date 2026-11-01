/**
 * CartPrismaRepository — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CartPrismaRepository } from '@infrastructure/persistence/prisma/repositories/cart.prisma.repository.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { IdempotencyKeyVO } from '@domain/value-objects/primitives/idempotency-key.vo.js';
import { CartEntity } from '@domain/entities/cart.entity.js';
import { TEST_IDS, TEST_DATES, TEST_CURRENCY } from '@fixtures/index';
import { makeUserCart } from '@fixtures/cart.fixture';
import {
  makeMockPrismaService,
  makeMockDelegate,
  type MockDelegate,
} from '@test-infra/index';

function makeRow(overrides: Record<string, unknown> = {}) {
  return {
    id: TEST_IDS.CART_ID,
    userId: TEST_IDS.USER_ID,
    sessionId: null,
    type: 'user',
    status: 'active',
    itemCount: 0,
    subtotal: 0,
    discountAmount: 0,
    taxAmount: 0,
    shippingAmount: 0,
    total: 0,
    currency: TEST_CURRENCY,
    couponId: null,
    voucherId: null,
    notes: null,
    idempotencyKey: null,
    expiresAt: new Date(TEST_DATES.NEXT_MONTH),
    lastActivityAt: new Date(TEST_DATES.NOW),
    createdAt: new Date(TEST_DATES.NOW),
    updatedAt: new Date(TEST_DATES.NOW),
    deletedAt: null,
    ...overrides,
  };
}

describe('CartPrismaRepository', () => {
  let delegate: MockDelegate;
  let repo: CartPrismaRepository;

  beforeEach(() => {
    delegate = makeMockDelegate();
    const prisma = makeMockPrismaService({ delegates: { cart: delegate } });
    repo = new CartPrismaRepository(prisma as never);
  });

  // ═══════════════ FIND ═══════════════

  describe('findByIdVO()', () => {
    it('should return entity when found', async () => {
      delegate.findFirst.mockResolvedValue(makeRow() as never);
      const result = await repo.findByIdVO(CartIdVO.reconstitute(TEST_IDS.CART_ID));
      expect(result).toBeInstanceOf(CartEntity);
      expect(result?.id).toBe(TEST_IDS.CART_ID);
    });

    it('should return null when not found', async () => {
      delegate.findFirst.mockResolvedValue(null as never);
      const result = await repo.findByIdVO(CartIdVO.reconstitute(TEST_IDS.CART_ID));
      expect(result).toBeNull();
    });

    it('should filter by deletedAt: null', async () => {
      delegate.findFirst.mockResolvedValue(null as never);
      await repo.findByIdVO(CartIdVO.reconstitute(TEST_IDS.CART_ID));
      expect(delegate.findFirst).toHaveBeenCalledWith({
        where: { id: TEST_IDS.CART_ID, deletedAt: null },
      });
    });
  });

  describe('findById()', () => {
    it('should delegate to findByIdVO', async () => {
      delegate.findFirst.mockResolvedValue(null as never);
      await repo.findById(TEST_IDS.CART_ID);
      expect(delegate.findFirst).toHaveBeenCalled();
    });
  });

  describe('findAll()', () => {
    it('should return all entities', async () => {
      delegate.findMany.mockResolvedValue([makeRow(), makeRow({ id: TEST_IDS.CART_ID_2 })] as never);
      const result = await repo.findAll();
      expect(result).toHaveLength(2);
    });
  });

  describe('exists()', () => {
    it('should return true when count > 0', async () => {
      delegate.count.mockResolvedValue(1 as never);
      expect(await repo.exists(TEST_IDS.CART_ID)).toBe(true);
    });

    it('should return false when count = 0', async () => {
      delegate.count.mockResolvedValue(0 as never);
      expect(await repo.exists(TEST_IDS.CART_ID)).toBe(false);
    });
  });

  describe('findByUserId()', () => {
    it('should return carts for user', async () => {
      delegate.findMany.mockResolvedValue([makeRow()] as never);
      const result = await repo.findByUserId(TEST_IDS.USER_ID);
      expect(result).toHaveLength(1);
      expect(delegate.findMany).toHaveBeenCalledWith({
        where: { userId: TEST_IDS.USER_ID, deletedAt: null },
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('findActiveByUserId()', () => {
    it('should return active cart', async () => {
      delegate.findFirst.mockResolvedValue(makeRow({ status: 'active' }) as never);
      const result = await repo.findActiveByUserId(TEST_IDS.USER_ID);
      expect(result).toBeInstanceOf(CartEntity);
      expect(delegate.findFirst).toHaveBeenCalledWith({
        where: { userId: TEST_IDS.USER_ID, status: 'active', deletedAt: null },
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should return null when no active cart', async () => {
      delegate.findFirst.mockResolvedValue(null as never);
      expect(await repo.findActiveByUserId(TEST_IDS.USER_ID)).toBeNull();
    });
  });

  describe('findBySessionId()', () => {
    it('should return carts by session', async () => {
      delegate.findMany.mockResolvedValue([makeRow({ sessionId: TEST_IDS.SESSION_ID })] as never);
      const result = await repo.findBySessionId(TEST_IDS.SESSION_ID);
      expect(result).toHaveLength(1);
    });
  });

  describe('findByStatus()', () => {
    it('should filter by status', async () => {
      delegate.findMany.mockResolvedValue([makeRow({ status: 'abandoned' })] as never);
      const result = await repo.findByStatus('abandoned');
      expect(result).toHaveLength(1);
    });
  });

  describe('findByIdempotencyKey()', () => {
    it('should find by idempotency key', async () => {
      delegate.findFirst.mockResolvedValue(
        makeRow({ idempotencyKey: 'idem-key-12345abcde' }) as never,
      );
      const key = IdempotencyKeyVO.create('idem-key-12345abcde');
      const result = await repo.findByIdempotencyKey(key);
      expect(result).toBeInstanceOf(CartEntity);
      expect(delegate.findFirst).toHaveBeenCalledWith({
        where: { idempotencyKey: 'idem-key-12345abcde' },
      });
    });
  });

  // ═══════════════ SAVE ═══════════════

  describe('save()', () => {
    it('should create when entity does not exist', async () => {
      delegate.findUnique.mockResolvedValue(null as never);
      delegate.create.mockResolvedValue(makeRow() as never);

      const cart = makeUserCart();
      const result = await repo.save(cart);

      expect(delegate.create).toHaveBeenCalled();
      expect(delegate.update).not.toHaveBeenCalled();
      expect(result).toBeInstanceOf(CartEntity);
    });

    it('should update when entity exists', async () => {
      delegate.findUnique.mockResolvedValue({ id: TEST_IDS.CART_ID } as never);
      delegate.update.mockResolvedValue(makeRow() as never);

      const cart = makeUserCart();
      const result = await repo.save(cart);

      expect(delegate.update).toHaveBeenCalled();
      expect(delegate.create).not.toHaveBeenCalled();
      expect(result).toBeInstanceOf(CartEntity);
    });
  });

  // ═══════════════ DELETE ═══════════════

  describe('delete()', () => {
    it('should hard-delete', async () => {
      delegate.delete.mockResolvedValue({} as never);
      await repo.delete(TEST_IDS.CART_ID);
      expect(delegate.delete).toHaveBeenCalledWith({ where: { id: TEST_IDS.CART_ID } });
    });
  });

  describe('softDelete()', () => {
    it('should set deletedAt', async () => {
      delegate.update.mockResolvedValue({} as never);
      await repo.softDelete(TEST_IDS.CART_ID, TEST_IDS.USER_ID);
      expect(delegate.update).toHaveBeenCalled();
      const callArg = (delegate.update.mock.calls[0] as unknown[])[0] as {
        data: { deletedAt: Date };
      };
      expect(callArg.data.deletedAt).toBeInstanceOf(Date);
    });
  });

  describe('restore()', () => {
    it('should clear deletedAt', async () => {
      delegate.update.mockResolvedValue({} as never);
      await repo.restore(TEST_IDS.CART_ID);
      expect(delegate.update).toHaveBeenCalledWith({
        where: { id: TEST_IDS.CART_ID },
        data: { deletedAt: null },
      });
    });
  });

  describe('bulkUpdateStatus()', () => {
    it('should update each id', async () => {
      delegate.update.mockResolvedValue({} as never);
      const count = await repo.bulkUpdateStatus(
        [TEST_IDS.CART_ID, TEST_IDS.CART_ID_2],
        'abandoned',
      );
      expect(count).toBe(2);
      expect(delegate.update).toHaveBeenCalledTimes(2);
    });
  });

  // ═══════════════ PAGINATION ═══════════════

  describe('findPaginated()', () => {
    it('should return paginated result', async () => {
      delegate.findMany.mockResolvedValue([makeRow()] as never);
      delegate.count.mockResolvedValue(1 as never);

      const result = await repo.findPaginated({ page: 1, limit: 10 });
      expect(result.items).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
      expect(result.totalPages).toBe(1);
    });

    it('should apply filter options', async () => {
      delegate.findMany.mockResolvedValue([] as never);
      delegate.count.mockResolvedValue(0 as never);

      await repo.findPaginated({
        page: 1,
        limit: 10,
        filter: { status: 'abandoned', userId: TEST_IDS.USER_ID },
      });

      const callArg = (delegate.findMany.mock.calls[0] as unknown[])[0] as {
        where: Record<string, unknown>;
      };
      expect(callArg.where['status']).toBe('abandoned');
      expect(callArg.where['userId']).toBe(TEST_IDS.USER_ID);
    });
  });

  // ═══════════════ STATS ═══════════════

  describe('getStats()', () => {
    it('should aggregate stats', async () => {
      delegate.findMany.mockResolvedValue([
        { status: 'active', type: 'user', total: 100, itemCount: 2 },
        { status: 'abandoned', type: 'user', total: 200, itemCount: 3 },
      ] as never);

      const stats = await repo.getStats();
      expect(stats.total).toBe(2);
      expect(stats.totalValue).toBe(300);
      expect(stats.averageValue).toBe(150);
      expect(stats.averageItemCount).toBe(2.5);
      expect(stats.byStatus['active']).toBe(1);
      expect(stats.byStatus['abandoned']).toBe(1);
    });
  });

  // ═══════════════ CRON ═══════════════

  describe('findStale()', () => {
    it('should filter by inactive cutoff', async () => {
      delegate.findMany.mockResolvedValue([makeRow()] as never);
      await repo.findStale(60);
      expect(delegate.findMany).toHaveBeenCalled();
    });
  });

  describe('findExpired()', () => {
    it('should filter by expiry date', async () => {
      delegate.findMany.mockResolvedValue([] as never);
      await repo.findExpired(new Date());
      expect(delegate.findMany).toHaveBeenCalled();
    });
  });

  describe('findAbandonable()', () => {
    it('should find abandonable carts', async () => {
      delegate.findMany.mockResolvedValue([] as never);
      await repo.findAbandonable(24);
      expect(delegate.findMany).toHaveBeenCalled();
    });
  });

  describe('findRetryable()', () => {
    it('should return empty array (placeholder)', async () => {
      const result = await repo.findRetryable();
      expect(result).toEqual([]);
    });
  });

  // ═══════════════ COUNT ═══════════════

  describe('countByUserId()', () => {
    it('should count carts by user', async () => {
      delegate.count.mockResolvedValue(5 as never);
      expect(await repo.countByUserId(TEST_IDS.USER_ID)).toBe(5);
    });
  });

  describe('countByStatus()', () => {
    it('should count by status', async () => {
      delegate.count.mockResolvedValue(3 as never);
      expect(await repo.countByStatus('active')).toBe(3);
    });
  });

  describe('countActiveByUserId()', () => {
    it('should count active carts', async () => {
      delegate.count.mockResolvedValue(2 as never);
      expect(await repo.countActiveByUserId(TEST_IDS.USER_ID)).toBe(2);
    });
  });
});
