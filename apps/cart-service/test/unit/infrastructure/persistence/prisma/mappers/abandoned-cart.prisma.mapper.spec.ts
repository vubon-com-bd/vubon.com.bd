/**
 * AbandonedCartPrismaMapper — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import {
  AbandonedCartPrismaMapper,
  type PrismaAbandonedCartRow,
} from '@infrastructure/persistence/prisma/mappers/abandoned-cart.prisma.mapper.js';
import { TEST_IDS, TEST_DATES, TEST_CURRENCY } from '@fixtures/index';

function makeRow(
  overrides: Partial<PrismaAbandonedCartRow> = {},
): PrismaAbandonedCartRow {
  return {
    id: TEST_IDS.ABANDONED_CART_ID,
    cartId: TEST_IDS.CART_ID,
    userId: TEST_IDS.USER_ID,
    email: 'customer@example.com',
    status: 'pending',
    reminderType: 'email',
    itemCount: 3,
    cartValue: 500.5,
    currency: TEST_CURRENCY,
    abandonedAt: new Date(TEST_DATES.YESTERDAY),
    remindersSent: 0,
    lastReminderAt: null,
    recoveredAt: null,
    recoveredOrderId: null,
    recoveryDiscountPercent: null,
    createdAt: new Date(TEST_DATES.TWO_DAYS_AGO),
    updatedAt: new Date(TEST_DATES.YESTERDAY),
    deletedAt: null,
    ...overrides,
  };
}

describe('AbandonedCartPrismaMapper', () => {
  describe('toDomain()', () => {
    it('should map row to AbandonedCartEntity', () => {
      const entity = AbandonedCartPrismaMapper.toDomain(makeRow());
      expect(entity.id).toBe(TEST_IDS.ABANDONED_CART_ID);
      expect(entity.cartId.value).toBe(TEST_IDS.CART_ID);
      expect(entity.userId?.value).toBe(TEST_IDS.USER_ID);
      expect(entity.email).toBe('customer@example.com');
      expect(entity.status.value).toBe('pending');
      expect(entity.itemCount).toBe(3);
      expect(entity.cartValue).toBe(500.5);
    });

    it('should handle Prisma Decimal cart value', () => {
      const entity = AbandonedCartPrismaMapper.toDomain(
        makeRow({ cartValue: { toNumber: () => 123.45 } }),
      );
      expect(entity.cartValue).toBe(123.45);
    });

    it('should map recovered fields', () => {
      const recoveredAt = new Date(TEST_DATES.NOW);
      const entity = AbandonedCartPrismaMapper.toDomain(
        makeRow({
          status: 'recovered',
          recoveredAt,
          recoveredOrderId: TEST_IDS.CART_ID_2,
        }),
      );
      expect(entity.status.value).toBe('recovered');
      expect(entity.recoveredAt).toBe(recoveredAt.toISOString());
      expect(entity.recoveredOrderId).toBe(TEST_IDS.CART_ID_2);
    });

    it('should handle null optional fields', () => {
      const entity = AbandonedCartPrismaMapper.toDomain(
        makeRow({ userId: null, email: null, lastReminderAt: null }),
      );
      expect(entity.userId).toBeUndefined();
      expect(entity.email).toBeUndefined();
      expect(entity.lastReminderAt).toBeUndefined();
    });

    it('should map recovery discount percent', () => {
      const entity = AbandonedCartPrismaMapper.toDomain(
        makeRow({ recoveryDiscountPercent: 10 }),
      );
      expect(entity.recoveryDiscountPercent).toBe(10);
    });
  });

  describe('toPersistence()', () => {
    it('should map entity to persistence shape', () => {
      const entity = AbandonedCartPrismaMapper.toDomain(makeRow());
      const persisted = AbandonedCartPrismaMapper.toPersistence(entity);
      expect(persisted['id']).toBe(TEST_IDS.ABANDONED_CART_ID);
      expect(persisted['cartId']).toBe(TEST_IDS.CART_ID);
      expect(persisted['status']).toBe('pending');
      expect(persisted['itemCount']).toBe(3);
    });
  });

  describe('idOf() / whereForId()', () => {
    it('should return the entity id', () => {
      const entity = AbandonedCartPrismaMapper.toDomain(makeRow());
      expect(AbandonedCartPrismaMapper.idOf(entity)).toBe(TEST_IDS.ABANDONED_CART_ID);
    });

    it('should build where clause', () => {
      expect(AbandonedCartPrismaMapper.whereForId('abc')).toEqual({ id: 'abc' });
    });
  });
});
