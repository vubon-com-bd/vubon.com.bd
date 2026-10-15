/**
 * SavedItemPrismaMapper — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import {
  SavedItemPrismaMapper,
  type PrismaSavedItemRow,
} from '@infrastructure/persistence/prisma/mappers/saved-item.prisma.mapper.js';
import { TEST_IDS, TEST_DATES } from '@fixtures/index';

function makeRow(overrides: Partial<PrismaSavedItemRow> = {}): PrismaSavedItemRow {
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

describe('SavedItemPrismaMapper', () => {
  describe('toDomain()', () => {
    it('should map row to SavedForLaterEntity', () => {
      const entity = SavedItemPrismaMapper.toDomain(makeRow());
      expect(entity.id).toBe(TEST_IDS.SAVED_ITEM_ID);
      expect(entity.userId.value).toBe(TEST_IDS.USER_ID);
      expect(entity.productId.value).toBe(TEST_IDS.PRODUCT_ID);
      expect(entity.status.value).toBe('active');
    });

    it('should handle optional variantId', () => {
      const entity = SavedItemPrismaMapper.toDomain(
        makeRow({ variantId: TEST_IDS.VARIANT_ID }),
      );
      expect(entity.variantId?.value).toBe(TEST_IDS.VARIANT_ID);
    });

    it('should handle null variantId', () => {
      const entity = SavedItemPrismaMapper.toDomain(makeRow({ variantId: null }));
      expect(entity.variantId).toBeUndefined();
    });

    it('should handle notes', () => {
      const entity = SavedItemPrismaMapper.toDomain(
        makeRow({ notes: 'My favourite item' }),
      );
      expect(entity.note).toBe('My favourite item');
    });
  });

  describe('toPersistence()', () => {
    it('should map entity to persistence shape', () => {
      const row = makeRow();
      const entity = SavedItemPrismaMapper.toDomain(row);
      const persisted = SavedItemPrismaMapper.toPersistence(entity);
      expect(persisted['id']).toBe(TEST_IDS.SAVED_ITEM_ID);
      expect(persisted['userId']).toBe(TEST_IDS.USER_ID);
      expect(persisted['productId']).toBe(TEST_IDS.PRODUCT_ID);
      expect(persisted['status']).toBe('active');
    });
  });

  describe('idOf() / whereForId()', () => {
    it('should return the entity id', () => {
      const entity = SavedItemPrismaMapper.toDomain(makeRow());
      expect(SavedItemPrismaMapper.idOf(entity)).toBe(TEST_IDS.SAVED_ITEM_ID);
    });

    it('should build where clause', () => {
      expect(SavedItemPrismaMapper.whereForId('xyz')).toEqual({ id: 'xyz' });
    });
  });
});
