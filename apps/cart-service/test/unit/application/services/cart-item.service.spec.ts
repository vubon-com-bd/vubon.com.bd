import { jest } from '@jest/globals';
/**
 * CartItemService — Unit Tests (mocked repository)
 */
import { CartItemService } from '../../../../src/module/application/services/impl/cart-item.service.js';
import { CartEntity } from '../../../../src/module/domain/entities/cart.entity.js';
import { CartItemEntity } from '../../../../src/module/domain/entities/cart-item.entity.js';
import { CartStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { CartItemQuantityVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import type { CartRepository } from '../../../../src/module/domain/repositories/cart.repository.interface.js';
import { CART_STATUS, CART_TYPE, CART_ITEM_STATUS } from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const ITEM_UUID = '11111111-1111-1111-1111-111111111111';
const USER = '00000000-0000-0000-0000-000000000001';
const NOW = '2026-01-01T00:00:00Z';
const FUTURE = '2099-12-31T23:59:59Z';

function makeRepo(): jest.Mocked<CartRepository> {
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

function makeItem(id = ITEM_UUID, qty = 2) {
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

const baseAddDto = {
  cartId: UUID,
  productId: UUID,
  sku: 'SKU-NEW',
  name: 'New Item',
  unitPrice: 150,
  quantity: 1,
  currency: 'BDT',
};

describe('CartItemService', () => {
  let repo: jest.Mocked<CartRepository>;
  let svc: CartItemService;

  beforeEach(() => {
    repo = makeRepo();
    svc = new CartItemService(repo);
  });

  describe('add()', () => {
    it('adds item to empty cart', async () => {
      repo.findById.mockResolvedValue(makeCart());
      const r = await svc.add(baseAddDto);
      expect(r.items.length).toBe(1);
      expect(repo.save).toHaveBeenCalled();
    });

    it('throws when cart not found', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(svc.add(baseAddDto)).rejects.toThrow();
    });
  });

  describe('update()', () => {
    it('updates quantity', async () => {
      repo.findById.mockResolvedValue(makeCart([makeItem()]));
      const r = await svc.update({ cartId: UUID, itemId: ITEM_UUID, quantity: 5 });
      expect(r.items[0].quantity).toBe(5);
    });

    it('updates unit price', async () => {
      repo.findById.mockResolvedValue(makeCart([makeItem()]));
      const r = await svc.update({ cartId: UUID, itemId: ITEM_UUID, unitPrice: 999 });
      expect(r.items[0].unitPrice).toBe(999);
    });

    it('throws when item not found', async () => {
      repo.findById.mockResolvedValue(makeCart());
      await expect(
        svc.update({ cartId: UUID, itemId: 'missing', quantity: 5 }),
      ).rejects.toThrow();
    });
  });

  describe('remove()', () => {
    it('removes item', async () => {
      repo.findById.mockResolvedValue(makeCart([makeItem()]));
      const r = await svc.remove({ cartId: UUID, itemId: ITEM_UUID });
      expect(r.items.length).toBe(0);
    });
  });

  describe('updateQuantity()', () => {
    it('updates quantity via domain method', async () => {
      repo.findById.mockResolvedValue(makeCart([makeItem()]));
      const r = await svc.updateQuantity({ cartId: UUID, itemId: ITEM_UUID, quantity: 10 });
      expect(r.items[0].quantity).toBe(10);
    });

    it('throws on invalid item', async () => {
      repo.findById.mockResolvedValue(makeCart());
      await expect(
        svc.updateQuantity({ cartId: UUID, itemId: 'missing', quantity: 5 }),
      ).rejects.toThrow();
    });
  });

  describe('getItem()', () => {
    it('returns item DTO', async () => {
      repo.findById.mockResolvedValue(makeCart([makeItem()]));
      const r = await svc.getItem(UUID, ITEM_UUID);
      expect(r.id).toBe(ITEM_UUID);
      expect(r.cartId).toBe(UUID);
    });

    it('throws when item not found', async () => {
      repo.findById.mockResolvedValue(makeCart());
      await expect(svc.getItem(UUID, 'missing')).rejects.toThrow();
    });
  });

  describe('listItems()', () => {
    it('returns all items', async () => {
      repo.findById.mockResolvedValue(makeCart([makeItem('i1'), makeItem('i2')]));
      const r = await svc.listItems(UUID);
      expect(r.length).toBe(2);
    });

    it('returns empty array for empty cart', async () => {
      repo.findById.mockResolvedValue(makeCart());
      const r = await svc.listItems(UUID);
      expect(r.length).toBe(0);
    });
  });
});
