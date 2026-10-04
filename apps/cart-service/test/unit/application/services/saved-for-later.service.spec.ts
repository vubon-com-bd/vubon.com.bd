import { jest } from '@jest/globals';

/**
 * SavedForLaterService — Unit Tests
 */
import { SavedForLaterService } from '../../../../src/module/application/services/impl/saved-for-later.service.js';
import { CartEntity } from '../../../../src/module/domain/entities/cart.entity.js';
import { CartItemEntity } from '../../../../src/module/domain/entities/cart-item.entity.js';
import { SavedForLaterEntity } from '../../../../src/module/domain/entities/saved-for-later.entity.js';
import { CartStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { CartItemQuantityVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { SavedItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/saved-item-status.vo.js';
import type { CartRepository } from '../../../../src/module/domain/repositories/cart.repository.interface.js';
import type { SavedForLaterRepository } from '../../../../src/module/domain/repositories/saved-for-later.repository.interface.js';
import { CART_STATUS, CART_TYPE, CART_ITEM_STATUS, SAVED_ITEM_STATUS } from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const ITEM_UUID = '11111111-1111-1111-1111-111111111111';
const SAVED_UUID = '22222222-2222-2222-2222-222222222222';
const USER = '00000000-0000-0000-0000-000000000001';
const NOW = '2026-01-01T00:00:00Z';
const FUTURE = '2099-12-31T23:59:59Z';

function makeCartRepo(): jest.Mocked<CartRepository> {
  return {
    findById: jest.fn(), findByIdVO: jest.fn(), findAll: jest.fn(),
    save: jest.fn(async (c) => c), delete: jest.fn(), exists: jest.fn(),
    findByUserId: jest.fn(), findBySessionId: jest.fn(), findActiveByUserId: jest.fn(),
    findAllByUserId: jest.fn(), findExpired: jest.fn(), findInactive: jest.fn(),
    findPaginated: jest.fn(), countByUserId: jest.fn(), softDelete: jest.fn(),
  };
}

function makeSavedRepo(): jest.Mocked<SavedForLaterRepository> {
  return {
    findById: jest.fn(), findByIdVO: jest.fn(), findAll: jest.fn(),
    save: jest.fn(async (e) => e), delete: jest.fn(), exists: jest.fn(),
    findByUserId: jest.fn(), findByProduct: jest.fn(),
    findActiveByUserId: jest.fn(), findPaginated: jest.fn(), countByUserId: jest.fn(),
  };
}

function makeItem() {
  return CartItemEntity.create({
    id: ITEM_UUID,
    now: NOW,
    props: {
      productId: CartProductIdVO.create(UUID),
      sku: 'SKU',
      name: 'Item',
      unitPrice: 100,
      quantity: CartItemQuantityVO.create(2),
      discountAmount: 0,
      status: CartItemStatusVO.create(CART_ITEM_STATUS.ACTIVE),
      isAvailable: true,
      currency: 'BDT',
    },
  });
}

function makeCart(items: CartItemEntity[] = [makeItem()]) {
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

function makeSavedEntity() {
  return SavedForLaterEntity.create({
    id: SAVED_UUID,
    now: NOW,
    props: {
      userId: CartUserIdVO.create(USER),
      productId: CartProductIdVO.create(UUID),
      quantity: 2,
      status: SavedItemStatusVO.create(SAVED_ITEM_STATUS.ACTIVE),
    },
  });
}

describe('SavedForLaterService', () => {
  let cartRepo: jest.Mocked<CartRepository>;
  let savedRepo: jest.Mocked<SavedForLaterRepository>;
  let svc: SavedForLaterService;

  beforeEach(() => {
    cartRepo = makeCartRepo();
    savedRepo = makeSavedRepo();
    svc = new SavedForLaterService(cartRepo, savedRepo);
  });

  describe('save()', () => {
    it('saves item from cart and removes from cart', async () => {
      cartRepo.findById.mockResolvedValue(makeCart());
      const r = await svc.save({ cartId: UUID, itemId: ITEM_UUID, userId: USER });
      expect(r.id).toBeDefined();
      expect(r.userId).toBe(USER);
      expect(savedRepo.save).toHaveBeenCalled();
      expect(cartRepo.save).toHaveBeenCalled();
    });

    it('throws when cart not found', async () => {
      cartRepo.findById.mockResolvedValue(null);
      await expect(
        svc.save({ cartId: 'x', itemId: ITEM_UUID, userId: USER }),
      ).rejects.toThrow();
    });

    it('throws when item not in cart', async () => {
      cartRepo.findById.mockResolvedValue(makeCart([]));
      await expect(
        svc.save({ cartId: UUID, itemId: 'missing', userId: USER }),
      ).rejects.toThrow();
    });
  });

  describe('moveToCart()', () => {
    it('moves saved item back to cart', async () => {
      savedRepo.findById.mockResolvedValue(makeSavedEntity());
      cartRepo.findById.mockResolvedValue(makeCart([]));
      await svc.moveToCart({ savedItemId: SAVED_UUID, cartId: UUID, userId: USER });
      expect(savedRepo.save).toHaveBeenCalled();
    });

    it('throws when saved item not found', async () => {
      savedRepo.findById.mockResolvedValue(null);
      await expect(
        svc.moveToCart({ savedItemId: 'x', cartId: UUID, userId: USER }),
      ).rejects.toThrow();
    });
  });

  describe('remove()', () => {
    it('removes saved item', async () => {
      savedRepo.findById.mockResolvedValue(makeSavedEntity());
      await svc.remove({ savedItemId: SAVED_UUID, userId: USER });
      expect(savedRepo.delete).toHaveBeenCalledWith(SAVED_UUID);
    });

    it('no-op when item missing', async () => {
      savedRepo.findById.mockResolvedValue(null);
      await expect(
        svc.remove({ savedItemId: 'x', userId: USER }),
      ).resolves.toBeUndefined();
    });
  });

  describe('listByUser()', () => {
    it('returns paginated saved items', async () => {
      savedRepo.findPaginated.mockResolvedValue({
        items: [makeSavedEntity()],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
      });
      const r = await svc.listByUser(USER);
      expect(r.items.length).toBe(1);
      expect(r.total).toBe(1);
    });

    it('handles empty result', async () => {
      savedRepo.findPaginated.mockResolvedValue({
        items: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      });
      const r = await svc.listByUser(USER);
      expect(r.items.length).toBe(0);
    });
  });
});
