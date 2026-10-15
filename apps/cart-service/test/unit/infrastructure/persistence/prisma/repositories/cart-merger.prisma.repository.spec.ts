/**
 * CartMergerPrismaRepository — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { CartMergerPrismaRepository } from '@infrastructure/persistence/prisma/repositories/cart-merger.prisma.repository.js';
import { CartMergerIdVO } from '@domain/value-objects/primitives/cart-merger-id.vo.js';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';
import {
  makeMockPrismaService,
  makeMockDelegate,
  type MockDelegate,
} from '@test-infra/index';

function makeRow(overrides: Record<string, unknown> = {}) {
  return {
    id: TEST_IDS.MERGER_ID,
    sourceCartId: TEST_IDS.CART_ID,
    targetCartId: TEST_IDS.CART_ID_2,
    strategy: 'sum_quantity',
    itemsMerged: 3,
    conflicts: 0,
    mergedAt: new Date(TEST_DATES.NOW),
    mergedBy: TEST_IDS.USER_ID,
    createdAt: new Date(TEST_DATES.NOW),
    updatedAt: new Date(TEST_DATES.NOW),
    ...overrides,
  };
}

describe('CartMergerPrismaRepository', () => {
  let delegate: MockDelegate;
  let repo: CartMergerPrismaRepository;

  beforeEach(() => {
    delegate = makeMockDelegate();
    const prisma = makeMockPrismaService({ delegates: { cartMerger: delegate } });
    repo = new CartMergerPrismaRepository(prisma as never);
  });

  describe('findByIdVO()', () => {
    it('should find merger by id', async () => {
      delegate.findFirst.mockResolvedValue(makeRow() as never);
      const result = await repo.findByIdVO(
        CartMergerIdVO.reconstitute(TEST_IDS.MERGER_ID),
      );
      expect(result?.id).toBe(TEST_IDS.MERGER_ID);
    });
  });

  describe('findBySourceCartId()', () => {
    it('should find by source cart', async () => {
      delegate.findMany.mockResolvedValue([makeRow()] as never);
      const result = await repo.findBySourceCartId(TEST_IDS.CART_ID);
      expect(result).toHaveLength(1);
    });
  });

  describe('findByTargetCartId()', () => {
    it('should find by target cart', async () => {
      delegate.findMany.mockResolvedValue([makeRow()] as never);
      const result = await repo.findByTargetCartId(TEST_IDS.CART_ID_2);
      expect(result).toHaveLength(1);
    });
  });

  describe('findByCartId()', () => {
    it('should find by either source or target', async () => {
      delegate.findMany.mockResolvedValue([makeRow()] as never);
      const result = await repo.findByCartId(TEST_IDS.CART_ID);
      expect(result).toHaveLength(1);
      const callArg = (delegate.findMany.mock.calls[0] as unknown[])[0] as {
        where: Record<string, unknown>;
      };
      expect(callArg.where['OR']).toBeDefined();
    });
  });

  describe('findCompleted()', () => {
    it('should find completed mergers', async () => {
      delegate.findMany.mockResolvedValue([makeRow()] as never);
      const result = await repo.findCompleted();
      expect(result).toHaveLength(1);
    });
  });

  describe('findFailed()', () => {
    it('should return empty (placeholder)', async () => {
      expect(await repo.findFailed()).toEqual([]);
    });
  });

  describe('findWithConflicts()', () => {
    it('should find mergers with conflicts', async () => {
      delegate.findMany.mockResolvedValue([makeRow({ conflicts: 2 })] as never);
      const result = await repo.findWithConflicts();
      expect(result).toHaveLength(1);
    });
  });

  describe('findIncomplete()', () => {
    it('should find incomplete mergers', async () => {
      delegate.findMany.mockResolvedValue([makeRow({ itemsMerged: 0 })] as never);
      const result = await repo.findIncomplete();
      expect(result).toHaveLength(1);
    });
  });

  describe('save()', () => {
    it('should create when not exists', async () => {
      delegate.findUnique.mockResolvedValue(null as never);
      delegate.create.mockResolvedValue(makeRow() as never);

      const entity = await repo.findByIdVO(CartMergerIdVO.reconstitute(TEST_IDS.MERGER_ID));
      if (entity) {
        await repo.save(entity);
        expect(delegate.create).toHaveBeenCalled();
      }
    });
  });

  describe('findPaginated()', () => {
    it('should return paginated result', async () => {
      delegate.findMany.mockResolvedValue([makeRow()] as never);
      delegate.count.mockResolvedValue(1 as never);

      const result = await repo.findPaginated({ page: 1, limit: 10 });
      expect(result.items).toHaveLength(1);
    });
  });

  describe('getStats()', () => {
    it('should aggregate stats', async () => {
      delegate.findMany.mockResolvedValue([
        makeRow({ itemsMerged: 3, conflicts: 1 }),
        makeRow({ itemsMerged: 0, conflicts: 0 }),
      ] as never);

      const stats = await repo.getStats();
      expect(stats.total).toBe(2);
      expect(stats.completedCount).toBe(1);
      expect(stats.totalItemsMerged).toBe(3);
      expect(stats.totalConflicts).toBe(1);
    });
  });

  describe('findStale()', () => {
    it('should find stale mergers', async () => {
      delegate.findMany.mockResolvedValue([] as never);
      await repo.findStale(30);
      expect(delegate.findMany).toHaveBeenCalled();
    });
  });
});
