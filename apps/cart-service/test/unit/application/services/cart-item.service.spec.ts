import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CartItemService } from '../../../../src/module/application/services/impl/cart-item.service.js';
import type { CartRepository } from '../../../../src/module/domain/repositories/cart.repository.interface.js';
import type { CartItemRepository } from '../../../../src/module/domain/repositories/cart-item.repository.interface.js';
import { CartEntity } from '../../../../src/module/domain/entities/cart.entity.js';
import { CartItemEntity } from '../../../../src/module/domain/entities/cart-item.entity.js';
import { CartIdVO } from '../../../../src/module/domain/value-objects/primitives/cart-id.vo.js';
import { CartItemIdVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-id.vo.js';
import { ProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { CartItemQuantityVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartTypeVO } from '../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CartItemNotFoundApplicationError, CartItemAlreadyExistsApplicationError } from '../../../../src/module/application/errors/cart-item.errors.js';

const CART_ID = '123e4567-e89b-12d3-a456-426614174000';
const ITEM_ID = '223e4567-e89b-12d3-a456-426614174000';
const PRODUCT_ID = '323e4567-e89b-12d3-a456-426614174000';
const NOW = '2024-01-15T10:00:00.000Z';

function makeCart(): CartEntity {
  return CartEntity.reconstitute({
    id: CART_ID, createdAt: NOW, updatedAt: NOW, status: 'active',
    props: {
      type: CartTypeVO.user(),
      currency: 'BDT', itemCount: 1, subtotal: 0, discountAmount: 0,
      taxAmount: 0, shippingAmount: 0, total: 0,
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
      quantity: CartItemQuantityVO.create(2),
      status: CartItemStatusVO.active(),
      unitPrice: 100,
      currency: 'BDT',
    },
  });
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

describe('CartItemService', () => {
  let service: CartItemService;
  let itemRepo: jest.Mocked<CartItemRepository>;
  let cartRepo: jest.Mocked<CartRepository>;

  beforeEach(() => {
    itemRepo = makeItemRepo();
    cartRepo = makeCartRepo();
    service = new CartItemService(itemRepo, cartRepo);
  });

  describe('add', () => {
    it('should add a new item to cart', async () => {
      cartRepo.findByIdVO.mockResolvedValue(makeCart());
      itemRepo.findInCartByProduct.mockResolvedValue(null);
      itemRepo.save.mockImplementation(async (e) => e);
      cartRepo.save.mockImplementation(async (e) => e);

      const result = await service.add({
        cartId: CART_ID,
        productId: PRODUCT_ID,
        quantity: 2,
      });

      expect(result.productId).toBe(PRODUCT_ID);
      expect(result.quantity).toBe(2);
      expect(itemRepo.save).toHaveBeenCalled();
    });

    it('should throw when duplicate item exists', async () => {
      cartRepo.findByIdVO.mockResolvedValue(makeCart());
      itemRepo.findInCartByProduct.mockResolvedValue(makeItem());

      await expect(
        service.add({ cartId: CART_ID, productId: PRODUCT_ID, quantity: 1 }),
      ).rejects.toThrow(CartItemAlreadyExistsApplicationError);
    });
  });

  describe('getById', () => {
    it('should return item when found', async () => {
      itemRepo.findByIdVO.mockResolvedValue(makeItem());

      const result = await service.getById(ITEM_ID);

      expect(result.id).toBe(ITEM_ID);
      expect(result.quantity).toBe(2);
    });

    it('should throw CartItemNotFoundApplicationError when not found', async () => {
      itemRepo.findByIdVO.mockResolvedValue(null);

      await expect(service.getById(ITEM_ID)).rejects.toThrow(
        CartItemNotFoundApplicationError,
      );
    });
  });

  describe('update', () => {
    it('should update item quantity', async () => {
      itemRepo.findByIdVO.mockResolvedValue(makeItem());
      itemRepo.save.mockImplementation(async (e) => e);

      const result = await service.update({
        cartId: CART_ID,
        itemId: ITEM_ID,
        quantity: 5,
      });

      expect(result.quantity).toBe(5);
    });
  });

  describe('remove', () => {
    it('should mark item removed and update cart count', async () => {
      itemRepo.findByIdVO.mockResolvedValue(makeItem());
      itemRepo.save.mockImplementation(async (e) => e);
      cartRepo.findById.mockResolvedValue(makeCart());
      cartRepo.save.mockImplementation(async (e) => e);

      const result = await service.remove({ cartId: CART_ID, itemId: ITEM_ID });

      expect(result.success).toBe(true);
      expect(result.message).toBe('Item removed');
    });
  });

  describe('listByCart', () => {
    it('should return all items for cart', async () => {
      itemRepo.findByCartId.mockResolvedValue([makeItem(), makeItem()]);

      const result = await service.listByCart(CART_ID);

      expect(result).toHaveLength(2);
    });
  });

  describe('countByCart', () => {
    it('should return count', async () => {
      itemRepo.countByCartId.mockResolvedValue(3);

      const result = await service.countByCart(CART_ID);

      expect(result).toBe(3);
    });
  });
});
