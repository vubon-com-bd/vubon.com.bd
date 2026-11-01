/**
 * CartPrismaMapper — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { CartPrismaMapper, type PrismaCartRow } from '@infrastructure/persistence/prisma/mappers/cart.prisma.mapper.js';
import { CartEntity } from '@domain/entities/cart.entity.js';
import { TEST_IDS, TEST_DATES, TEST_CURRENCY } from '@fixtures/index';
import { makeUserCart } from '@fixtures/cart.fixture';

function makeRow(overrides: Partial<PrismaCartRow> = {}): PrismaCartRow {
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

describe('CartPrismaMapper', () => {
  describe('toDomain()', () => {
    it('should map a valid row to CartEntity', () => {
      const entity = CartPrismaMapper.toDomain(makeRow());
      expect(entity.id).toBe(TEST_IDS.CART_ID);
      expect(entity.userId?.value).toBe(TEST_IDS.USER_ID);
      expect(entity.status.value).toBe('active');
      expect(entity.type.value).toBe('user');
      expect(entity.currency).toBe(TEST_CURRENCY);
    });

    it('should handle Prisma Decimal objects', () => {
      const entity = CartPrismaMapper.toDomain(
        makeRow({ subtotal: { toNumber: () => 100.5 }, total: { toNumber: () => 100.5 } }),
      );
      expect(entity.subtotal).toBe(100.5);
      expect(entity.total).toBe(100.5);
    });

    it('should handle string numbers', () => {
      const entity = CartPrismaMapper.toDomain(makeRow({ subtotal: '250.75', total: '250.75' }));
      expect(entity.subtotal).toBe(250.75);
    });

    it('should handle null userId (guest cart)', () => {
      const entity = CartPrismaMapper.toDomain(
        makeRow({ userId: null, type: 'guest', sessionId: TEST_IDS.SESSION_ID }),
      );
      expect(entity.userId).toBeUndefined();
      expect(entity.sessionId?.value).toBe(TEST_IDS.SESSION_ID);
    });

    it('should handle null deletedAt', () => {
      const entity = CartPrismaMapper.toDomain(makeRow({ deletedAt: null }));
      expect(entity.deletedAt).toBeNull();
    });

    it('should handle soft-deleted rows', () => {
      const deletedAt = new Date(TEST_DATES.YESTERDAY);
      const entity = CartPrismaMapper.toDomain(makeRow({ deletedAt }));
      expect(entity.deletedAt).toBe(deletedAt.toISOString());
    });

    it('should map idempotencyKey', () => {
      const entity = CartPrismaMapper.toDomain(
        makeRow({ idempotencyKey: 'idem-key-test-12345' }),
      );
      expect(entity.idempotencyKey?.value).toBe('idem-key-test-12345');
    });
  });

  describe('toPersistence()', () => {
    it('should map entity to persistence shape', () => {
      const cart = makeUserCart();
      const row = CartPrismaMapper.toPersistence(cart);
      expect(row['id']).toBe(cart.id);
      expect(row['userId']).toBe(TEST_IDS.USER_ID);
      expect(row['status']).toBe('active');
      expect(row['type']).toBe('user');
      expect(row['currency']).toBe(TEST_CURRENCY);
      expect(row['expiresAt']).toBeInstanceOf(Date);
      expect(row['updatedAt']).toBeInstanceOf(Date);
    });

    it('should use null for optional fields', () => {
      const cart = makeUserCart();
      const row = CartPrismaMapper.toPersistence(cart);
      expect(row['sessionId']).toBeNull();
      expect(row['couponId']).toBeNull();
      expect(row['notes']).toBeNull();
    });
  });

  describe('idOf() / whereForId()', () => {
    it('should return the entity id', () => {
      const cart = makeUserCart();
      expect(CartPrismaMapper.idOf(cart)).toBe(cart.id);
    });

    it('should build where clause', () => {
      expect(CartPrismaMapper.whereForId('abc')).toEqual({ id: 'abc' });
    });
  });

  describe('round-trip', () => {
    it('should preserve data through toDomain → toPersistence', () => {
      const original = makeRow({
        id: TEST_IDS.CART_ID,
        subtotal: 100,
        total: 100,
        itemCount: 3,
      });
      const entity: CartEntity = CartPrismaMapper.toDomain(original);
      const persisted = CartPrismaMapper.toPersistence(entity);
      expect(persisted['id']).toBe(original.id);
      expect(persisted['itemCount']).toBe(3);
      expect(persisted['subtotal']).toBe(100);
    });
  });
});
