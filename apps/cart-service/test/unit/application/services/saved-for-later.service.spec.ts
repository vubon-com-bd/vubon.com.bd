import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { SavedForLaterService } from '../../../../src/module/application/services/impl/saved-for-later.service.js';
import type { SavedForLaterRepository } from '../../../../src/module/domain/repositories/saved-for-later.repository.interface.js';
import type { CartRepository } from '../../../../src/module/domain/repositories/cart.repository.interface.js';
import type { CartItemRepository } from '../../../../src/module/domain/repositories/cart-item.repository.interface.js';
import { SavedForLaterEntity } from '../../../../src/module/domain/entities/saved-for-later.entity.js';
import { CartEntity } from '../../../../src/module/domain/entities/cart.entity.js';
import { CartItemEntity } from '../../../../src/module/domain/entities/cart-item.entity.js';
import { SavedItemIdVO } from '../../../../src/module/domain/value-objects/primitives/saved-item-id.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { ProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { CartIdVO } from '../../../../src/module/domain/value-objects/primitives/cart-id.vo.js';
import { CartItemIdVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-id.vo.js';
import { CartItemQuantityVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartTypeVO } from '../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';

const CART_ID = '123e4567-e89b-12d3-a456-426614174000';
const ITEM_ID = '223e4567-e89b-12d3-a456-426614174000';
const SAVED_ID = '323e4567-e89b-12d3-a456-426614174000';
const USER_ID = '423e4567-e89b-12d3-a456-426614174000';
const PRODUCT_ID = '523e4567-e89b-12d3-a456-426614174000';
const NOW = '2024-01-15T10:00:00.000Z';

function makeCart(): CartEntity {
  return CartEntity.reconstitute({
    id: CART_ID, createdAt: NOW, updatedAt: NOW, status: 'active',
    props: {
      type: CartTypeVO.user(),
      userId: UserIdVO.create(USER_ID),
      currency: 'BDT', itemCount: 1, subtotal: 100, discountAmount: 0,
      taxAmount: 0, shippingAmount: 0, total: 100,
      expiresAt: '2099-12-31T23:59:59.000Z', lastActivityAt: NOW,
    },
  });
}

function makeItem(): CartItemEntity {
  return CartItemEntity.reconstitute({
    id: ITEM_ID, createdAt: NOW, updatedAt: NOW,
    props: {
      cartId: CartIdVO.create(CART_ID),
      productId: ProductIdVO.create(PRODUCT_ID),
      quantity: CartItemQuantityVO.create(1),
      status: CartItemStatusVO.active(),
      unitPrice: 100,
      currency: 'BDT',
    },
  });
}

function makeSaved(): SavedForLaterEntity {
  return SavedForLaterEntity.create({
    id: SavedItemIdVO.create(SAVED_ID),
    now: NOW,
    props: {
      userId: UserIdVO.create(USER_ID),
      productId: ProductIdVO.create(PRODUCT_ID),
      savedAt: NOW,
    },
  });
}

function makeSavedRepo(): jest.Mocked<SavedForLaterRepository> {
  return {
    findById: jest.fn(), findByIdVO: jest.fn(), findAll: jest.fn(),
    save: jest.fn(), delete: jest.fn(), exists: jest.fn(),
    findByUserId: jest.fn(), findActiveByUserId: jest.fn(),
    findByUserAndProduct: jest.fn(), existsForUser: jest.fn(),
    findByStatus: jest.fn(), findMovedToCart: jest.fn(),
    findPaginated: jest.fn(), getStats: jest.fn(),
    findStale: jest.fn(), findPurgeable: jest.fn(),
    deleteByUserId: jest.fn(), bulkUpdateStatus: jest.fn(),
    softDelete: jest.fn(), restore: jest.fn(),
  } as unknown as jest.Mocked<SavedForLaterRepository>;
}

function makeCartRepo(): jest.Mocked<CartRepository> {
  return {
    findById: jest.fn(), findByIdVO: jest.fn(), findAll: jest.fn(),
    save: jest.fn(), delete: jest.fn(), exists: jest.fn(),
    findByUserId: jest.fn(), findActiveByUserId: jest.fn(),
    findBySessionId: jest.fn(), findActiveBySessionId: jest.fn(),
    findByStatus: jest.fn(), findByIdempotencyKey: jest.fn(),
    findPaginated: jest.fn(), getStats: jest.fn(),
    findStale: jest.fn(), findExpired: jest.fn(), findAbandonable: jest.fn(),
    findRetryable: jest.fn(),
    countByUserId: jest.fn(), countByStatus: jest.fn(), countActiveByUserId: jest.fn(),
    softDelete: jest.fn(), restore: jest.fn(), bulkUpdateStatus: jest.fn(),
  } as unknown as jest.Mocked<CartRepository>;
}

function makeItemRepo(): jest.Mocked<CartItemRepository> {
  return {
    findById: jest.fn(), findByIdVO: jest.fn(), findAll: jest.fn(),
    save: jest.fn(), delete: jest.fn(), exists: jest.fn(),
    findByCartId: jest.fn(), findActiveByCartId: jest.fn(), countByCartId: jest.fn(),
    findByProductId: jest.fn(), findInCartByProduct: jest.fn(), existsInCart: jest.fn(),
    findByStatus: jest.fn(), findUnavailableItems: jest.fn(),
    findPaginated: jest.fn(), getStats: jest.fn(),
    findStale: jest.fn(),
    deleteByCartId: jest.fn(), bulkUpdateStatus: jest.fn(),
    softDelete: jest.fn(), restore: jest.fn(),
  } as unknown as jest.Mocked<CartItemRepository>;
}

describe('SavedForLaterService', () => {
  let service: SavedForLaterService;

  let mockEventBridge: { publishFromEntity: ReturnType<typeof jest.fn> };
  let savedRepo: jest.Mocked<SavedForLaterRepository>;
  let cartRepo: jest.Mocked<CartRepository>;
  let itemRepo: jest.Mocked<CartItemRepository>;

  beforeEach(() => {
    savedRepo = makeSavedRepo();
    cartRepo = makeCartRepo();
    itemRepo = makeItemRepo();
    mockEventBridge = {

      publishFromEntity: jest.fn().mockResolvedValue(undefined),

    };

    service = new SavedForLaterService(savedRepo, cartRepo, itemRepo, mockEventBridge as never);
  });

  describe('save', () => {
    it('should save item for later', async () => {
      itemRepo.findById.mockResolvedValue(makeItem());
      cartRepo.findById.mockResolvedValue(makeCart());
      savedRepo.save.mockImplementation(async (e) => e);
      itemRepo.save.mockImplementation(async (e) => e);
      cartRepo.save.mockImplementation(async (e) => e);

      const result = await service.save({ cartId: CART_ID, itemId: ITEM_ID });

      expect(result.productId).toBe(PRODUCT_ID);
      expect(savedRepo.save).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return saved item when found', async () => {
      savedRepo.findByIdVO.mockResolvedValue(makeSaved());

      const result = await service.getById(SAVED_ID);

      expect(result.id).toBe(SAVED_ID);
      expect(result.productId).toBe(PRODUCT_ID);
    });

    it('should throw when not found', async () => {
      savedRepo.findByIdVO.mockResolvedValue(null);

      await expect(service.getById(SAVED_ID)).rejects.toThrow();
    });
  });

  describe('listByUser', () => {
    it('should return list of saved items', async () => {
      savedRepo.findActiveByUserId.mockResolvedValue([makeSaved()]);

      const result = await service.listByUser(USER_ID);

      expect(result).toHaveLength(1);
    });
  });

  describe('list', () => {
    it('should return paginated list', async () => {
      savedRepo.findPaginated.mockResolvedValue({
        items: [makeSaved()],
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      });

      const result = await service.list({ page: 1, limit: 10 });

      expect(result.items).toHaveLength(1);
      expect(result.total).toBe(1);
    });
  });

  describe('remove', () => {
    it('should remove saved item', async () => {
      savedRepo.findByIdVO.mockResolvedValue(makeSaved());
      savedRepo.save.mockImplementation(async (e) => e);

      const result = await service.remove({ savedItemId: SAVED_ID });

      expect(result.success).toBe(true);
    });
  });
});
