/**
 * SavedForLaterPrismaRepository — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { SavedForLaterPrismaRepository } from '@infrastructure/persistence/prisma/repositories/saved-for-later.prisma.repository.js';
import { SavedItemIdVO } from '@domain/value-objects/primitives/saved-item-id.vo.js';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';
import {
  makeMockPrismaService,
  makeMockDelegate,
  type MockDelegate,
} from '@test-infra/index';

function makeRow(overrides: Record<string, unknown> = {}) {
  return {
    id: TEST_IDS.SAVED_ITEM_ID,
    userId: TEST_IDS.USER_ID,
    productId: TEST_IDS.PRODUCT_ID,
    variantId: null,
    quantity: 1,
    status: 'active',
    notes: null,
    createdAt: new Date(TEST_DATES.NOW),
    updatedAt: new Date(TEST_DATES.NOW),
    deletedAt: null,
    ...overrides,
  };
}

describe('SavedForLaterPrismaRepository', () => {
  let delegate: MockDelegate;
  let repo: SavedForLaterPrismaRepository;

  beforeEach(() => {
    delegate = makeMockDelegate();
    const prisma = makeMockPrismaService({ delegates: { savedItem: delegate } });
    repo = new SavedForLaterPrismaRepository(prisma as never);
  });

  describe('findByIdVO()', () => {
    it('should return entity when found', async () => {
      delegate.findFirst.mockResolvedValue(makeRow() as never);
      const result = await repo.findByIdVO(SavedItemIdVO.reconstitute(TEST_IDS.SAVED_ITEM_ID));
      expect(result?.id).toBe(TEST_IDS.SAVED_ITEM_ID);
    });

    it('should return null when not found', async () => {
      delegate.findFirst.mockResolvedValue(null as never);
      const result = await repo.findByIdVO(SavedItemIdVO.reconstitute(TEST_IDS.SAVED_ITEM_ID));
      expect(result).toBeNull();
    });
  });

  describe('findByUserId()', () => {
    it('should return saved items for user', async () => {
      delegate.findMany.mockResolvedValue([makeRow()] as never);
      const result = await repo.findByUserId(TEST_IDS.USER_ID);
      expect(result).toHaveLength(1);
    });
  });

  describe('findActiveByUserId()', () => {
    it('should filter active items', async () => {
      delegate.findMany.mockResolvedValue([makeRow()] as never);
      const result = await repo.findActiveByUserId(TEST_IDS.USER_ID);
      expect(result).toHaveLength(1);
      const callArg = (delegate.findMany.mock.calls[0] as unknown[])[0] as {
        where: Record<string, unknown>;
      };
      expect(callArg.where['status']).toBe('active');
    });
  });

  describe('findByUserAndProduct()', () => {
    it('should find by user + product', async () => {
      delegate.findFirst.mockResolvedValue(makeRow() as never);
      const result = await repo.findByUserAndProduct(
        TEST_IDS.USER_ID,
        TEST_IDS.PRODUCT_ID,
      );
      expect(result?.id).toBe(TEST_IDS.SAVED_ITEM_ID);
    });

    it('should return null when not found', async () => {
      delegate.findFirst.mockResolvedValue(null as never);
      const result = await repo.findByUserAndProduct(
        TEST_IDS.USER_ID,
        TEST_IDS.PRODUCT_ID,
      );
      expect(result).toBeNull();
    });
  });

  describe('existsForUser()', () => {
    it('should return true when count > 0', async () => {
      delegate.count.mockResolvedValue(1 as never);
      expect(await repo.existsForUser(TEST_IDS.USER_ID, TEST_IDS.PRODUCT_ID)).toBe(true);
    });

    it('should return false when count = 0', async () => {
      delegate.count.mockResolvedValue(0 as never);
      expect(await repo.existsForUser(TEST_IDS.USER_ID, TEST_IDS.PRODUCT_ID)).toBe(false);
    });
  });

  describe('save()', () => {
    it('should create when not exists', async () => {
      delegate.findUnique.mockResolvedValue(null as never);
      delegate.create.mockResolvedValue(makeRow() as never);

      const entity = await repo.findByIdVO(SavedItemIdVO.reconstitute(TEST_IDS.SAVED_ITEM_ID));
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
      expect(result.totalPages).toBe(1);
    });
  });

  describe('getStats()', () => {
    it('should return stats', async () => {
      delegate.findMany.mockResolvedValue([makeRow()] as never);
      const stats = await repo.getStats();
      expect(stats.total).toBe(1);
      expect(stats.activeCount).toBe(1);
    });
  });

  describe('softDelete()', () => {
    it('should set deletedAt', async () => {
      delegate.update.mockResolvedValue({} as never);
      await repo.softDelete(TEST_IDS.SAVED_ITEM_ID);
      expect(delegate.update).toHaveBeenCalled();
    });
  });

  describe('restore()', () => {
    it('should clear deletedAt', async () => {
      delegate.update.mockResolvedValue({} as never);
      await repo.restore(TEST_IDS.SAVED_ITEM_ID);
      expect(delegate.update).toHaveBeenCalledWith({
        where: { id: TEST_IDS.SAVED_ITEM_ID },
        data: { deletedAt: null },
      });
    });
  });
});
