/**
 * CartMergerPrismaMapper — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import {
  CartMergerPrismaMapper,
  type PrismaCartMergerRow,
} from '@infrastructure/persistence/prisma/mappers/cart-merger.prisma.mapper.js';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

function makeRow(
  overrides: Partial<PrismaCartMergerRow> = {},
): PrismaCartMergerRow {
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

describe('CartMergerPrismaMapper', () => {
  describe('toDomain()', () => {
    it('should map row to CartMergerEntity', () => {
      const entity = CartMergerPrismaMapper.toDomain(makeRow());
      expect(entity.id).toBe(TEST_IDS.MERGER_ID);
      expect(entity.sourceCartId.value).toBe(TEST_IDS.CART_ID);
      expect(entity.targetCartId.value).toBe(TEST_IDS.CART_ID_2);
      expect(entity.strategy.value).toBe('sum_quantity');
      expect(entity.itemsMerged).toBe(3);
      expect(entity.conflicts).toBe(0);
    });

    it('should mark completed when itemsMerged > 0', () => {
      const entity = CartMergerPrismaMapper.toDomain(makeRow({ itemsMerged: 5 }));
      expect(entity.isCompleted()).toBe(true);
    });

    it('should not mark completed when itemsMerged is 0', () => {
      const entity = CartMergerPrismaMapper.toDomain(makeRow({ itemsMerged: 0 }));
      expect(entity.isCompleted()).toBe(false);
    });

    it('should handle conflicts', () => {
      const entity = CartMergerPrismaMapper.toDomain(makeRow({ conflicts: 2 }));
      expect(entity.conflicts).toBe(2);
      expect(entity.hasConflicts()).toBe(true);
    });

    it('should handle all merge strategies', () => {
      const strategies = ['sum_quantity', 'max_quantity', 'keep_latest', 'keep_existing', 'replace'] as const;
      for (const s of strategies) {
        const entity = CartMergerPrismaMapper.toDomain(makeRow({ strategy: s }));
        expect(entity.strategy.value).toBe(s);
      }
    });
  });

  describe('toPersistence()', () => {
    it('should map entity to persistence shape', () => {
      const entity = CartMergerPrismaMapper.toDomain(makeRow());
      const persisted = CartMergerPrismaMapper.toPersistence(entity);
      expect(persisted['id']).toBe(TEST_IDS.MERGER_ID);
      expect(persisted['sourceCartId']).toBe(TEST_IDS.CART_ID);
      expect(persisted['targetCartId']).toBe(TEST_IDS.CART_ID_2);
      expect(persisted['strategy']).toBe('sum_quantity');
      expect(persisted['itemsMerged']).toBe(3);
    });
  });

  describe('idOf() / whereForId()', () => {
    it('should return the entity id', () => {
      const entity = CartMergerPrismaMapper.toDomain(makeRow());
      expect(CartMergerPrismaMapper.idOf(entity)).toBe(TEST_IDS.MERGER_ID);
    });

    it('should build where clause', () => {
      expect(CartMergerPrismaMapper.whereForId('xyz')).toEqual({ id: 'xyz' });
    });
  });
});
