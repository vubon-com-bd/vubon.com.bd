import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CartShippingService } from '../../../../src/module/application/services/impl/cart-shipping.service.js';
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

const CART_ID = '123e4567-e89b-12d3-a456-426614174000';
const ITEM_ID = '223e4567-e89b-12d3-a456-426614174000';
const PRODUCT_ID = '323e4567-e89b-12d3-a456-426614174000';
const NOW = '2024-01-15T10:00:00.000Z';

function makeCart(): CartEntity {
  return CartEntity.reconstitute({
    id: CART_ID, createdAt: NOW, updatedAt: NOW, status: 'active',
    props: {
      type: CartTypeVO.user(),
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

describe('CartShippingService', () => {
  let service: CartShippingService;
  let cartRepo: jest.Mocked<CartRepository>;
  let itemRepo: jest.Mocked<CartItemRepository>;

  beforeEach(() => {
    cartRepo = makeCartRepo();
    itemRepo = makeItemRepo();
    service = new CartShippingService(cartRepo, itemRepo);
  });

  describe('setMethod', () => {
    it('should set standard shipping method with default cost', async () => {
      cartRepo.findByIdVO.mockResolvedValue(makeCart());
      itemRepo.findByCartId.mockResolvedValue([makeItem()]);
      cartRepo.save.mockImplementation(async (e) => e);

      const result = await service.setMethod({ cartId: CART_ID, method: 'standard' });

      expect(result.shipping).toBe(60);
    });

    it('should set pickup with zero cost', async () => {
      cartRepo.findByIdVO.mockResolvedValue(makeCart());
      itemRepo.findByCartId.mockResolvedValue([makeItem()]);
      cartRepo.save.mockImplementation(async (e) => e);

      const result = await service.setMethod({ cartId: CART_ID, method: 'pickup' });

      expect(result.shipping).toBe(0);
    });

    it('should use custom cost when provided', async () => {
      cartRepo.findByIdVO.mockResolvedValue(makeCart());
      itemRepo.findByCartId.mockResolvedValue([makeItem()]);
      cartRepo.save.mockImplementation(async (e) => e);

      const result = await service.setMethod({
        cartId: CART_ID, method: 'standard', cost: 99,
      });

      expect(result.shipping).toBe(99);
    });
  });

  describe('calculate', () => {
    it('should return shipping calc for standard', async () => {
      cartRepo.findByIdVO.mockResolvedValue(makeCart());

      const result = await service.calculate({ cartId: CART_ID, method: 'standard' });

      expect(result.cost).toBe(60);
      expect(result.isFree).toBe(false);
      expect(result.estimatedDays).toBe(5);
    });

    it('should return free for pickup', async () => {
      cartRepo.findByIdVO.mockResolvedValue(makeCart());

      const result = await service.calculate({ cartId: CART_ID, method: 'pickup' });

      expect(result.isFree).toBe(true);
    });
  });

  describe('clear', () => {
    it('should clear shipping cost', async () => {
      cartRepo.findByIdVO.mockResolvedValue(makeCart());
      cartRepo.save.mockImplementation(async (e) => e);

      const result = await service.clear(CART_ID);

      expect(result.shipping).toBe(0);
    });
  });
});
