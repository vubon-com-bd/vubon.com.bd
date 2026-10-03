import { jest } from '@jest/globals';
/**
 * CartService — Unit Tests (mocked repository)
 */
import { CartService } from '../../../../src/module/application/services/impl/cart.service.js';
import { CartEntity } from '../../../../src/module/domain/entities/cart.entity.js';
import { CartItemEntity } from '../../../../src/module/domain/entities/cart-item.entity.js';
import { CartStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { CartItemQuantityVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import type { CartRepository } from '../../../../src/module/domain/repositories/cart.repository.interface.js';
import {
  CART_STATUS,
  CART_TYPE,
  CART_ITEM_STATUS,
} from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const USER = '00000000-0000-0000-0000-000000000001';
const NOW = '2026-01-01T00:00:00Z';
const FUTURE = '2099-12-31T23:59:59Z';

function makeCartRepo(): jest.Mocked<CartRepository> {
  return {
    findById: jest.fn(),
    findByIdVO: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(async (c) => c),
    delete: jest.fn(),
    exists: jest.fn(),
    findByUserId: jest.fn(),
    findBySessionId: jest.fn(),
    findActiveByUserId: jest.fn(),
    findAllByUserId: jest.fn(),
    findExpired: jest.fn(),
    findInactive: jest.fn(),
    findPaginated: jest.fn(),
    countByUserId: jest.fn(),
    softDelete: jest.fn(),
  };
}

function makeCart(items: CartItemEntity[] = []): CartEntity {
  const c = CartEntity.create({
    id: UUID,
    now: NOW,
    props: {
      type: CartTypeVO.create(CART_TYPE.USER),
      status: CartStatusVO.create(CART_STATUS.ACTIVE),
      userId: CartUserIdVO.create(USER),
      currency: 'BDT',
      expiresAt: FUTURE,
      lastActivityAt: NOW,
    },
  });
  c['_items'] = items;
  return c;
}

function makeItem(id = 'i1', qty = 2) {
  return CartItemEntity.create({
    id,
    now: NOW,
    props: {
      productId: CartProductIdVO.create(UUID),
      sku: 'SKU',
      name: 'Item',
      unitPrice: 100,
      quantity: CartItemQuantityVO.create(qty),
      discountAmount: 0,
      status: CartItemStatusVO.create(CART_ITEM_STATUS.ACTIVE),
      isAvailable: true,
      currency: 'BDT',
    },
  });
}

describe('CartService', () => {
  let repo: jest.Mocked<CartRepository>;
  let svc: CartService;

  beforeEach(() => {
    repo = makeCartRepo();
    svc = new CartService(repo);
  });

  describe('create()', () => {
    it('creates cart and saves it', async () => {
      const r = await svc.create({ type: 'user', userId: USER, currency: 'BDT' });
      expect(repo.save).toHaveBeenCalled();
      expect(r.type).toBe('user');
      expect(r.status).toBe('active');
      expect(r.currency).toBe('BDT');
    });

    it('defaults to user type + BDT currency', async () => {
      const r = await svc.create({ type: 'user', userId: USER });
      expect(r.currency).toBe('BDT');
    });

    it('respects custom expiry', async () => {
      const r = await svc.create({ type: 'user', userId: USER, expiresAt: '2030-01-01T00:00:00Z' });
      expect(r.expiresAt).toBe('2030-01-01T00:00:00Z');
    });
  });

  describe('getById()', () => {
    it('returns cart when found', async () => {
      repo.findById.mockResolvedValue(makeCart());
      const r = await svc.getById(UUID);
      expect(r.id).toBe(UUID);
    });

    it('throws CartNotFoundApplicationError when missing', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(svc.getById('missing')).rejects.toThrow();
    });
  });

  describe('getByUserId()', () => {
    it('returns cart from repo', async () => {
      repo.findByUserId.mockResolvedValue(makeCart());
      const r = await svc.getByUserId(USER);
      expect(r?.id).toBe(UUID);
    });

    it('returns null when no cart', async () => {
      repo.findByUserId.mockResolvedValue(null);
      const r = await svc.getByUserId(USER);
      expect(r).toBeNull();
    });
  });

  describe('clear()', () => {
    it('clears items', async () => {
      repo.findById.mockResolvedValue(makeCart([makeItem()]));
      const r = await svc.clear({ cartId: UUID });
      expect(r.items.length).toBe(0);
    });

    it('throws when cart not found', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(svc.clear({ cartId: 'x' })).rejects.toThrow();
    });
  });

  describe('delete()', () => {
    it('calls softDelete on repo', async () => {
      repo.findById.mockResolvedValue(makeCart());
      await svc.delete({ cartId: UUID });
      expect(repo.softDelete).toHaveBeenCalledWith(UUID, undefined);
    });
  });

  describe('getSummary()', () => {
    it('returns summary DTO', async () => {
      repo.findById.mockResolvedValue(makeCart([makeItem()]));
      const r = await svc.getSummary(UUID);
      expect(r.id).toBe(UUID);
      expect(r.itemCount).toBe(2);
    });
  });

  describe('recalculateTotals()', () => {
    it('recalculates and persists totals', async () => {
      repo.findById.mockResolvedValue(makeCart([makeItem()]));
      const r = await svc.recalculateTotals(UUID);
      expect(r.subtotal).toBe(200);
      expect(repo.save).toHaveBeenCalled();
    });
  });
});
