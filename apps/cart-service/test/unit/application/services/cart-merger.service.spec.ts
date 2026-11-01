import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CartMergerService } from '../../../../src/module/application/services/impl/cart-merger.service.js';
import type { CartRepository } from '../../../../src/module/domain/repositories/cart.repository.interface.js';
import type { CartItemRepository } from '../../../../src/module/domain/repositories/cart-item.repository.interface.js';
import type { CartMergerRepository } from '../../../../src/module/domain/repositories/cart-merger.repository.interface.js';
import { CartEntity } from '../../../../src/module/domain/entities/cart.entity.js';
import { CartItemEntity } from '../../../../src/module/domain/entities/cart-item.entity.js';
import { CartIdVO } from '../../../../src/module/domain/value-objects/primitives/cart-id.vo.js';
import { CartItemIdVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-id.vo.js';
import { ProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { CartItemQuantityVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartTypeVO } from '../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';

const CART_A = '123e4567-e89b-12d3-a456-426614174000';
const CART_B = '223e4567-e89b-12d3-a456-426614174000';
const ITEM_ID = '323e4567-e89b-12d3-a456-426614174000';
const PRODUCT_ID = '423e4567-e89b-12d3-a456-426614174000';
const NOW = '2024-01-15T10:00:00.000Z';

function makeCart(id: string): CartEntity {
  return CartEntity.reconstitute({
    id, createdAt: NOW, updatedAt: NOW, status: 'active',
    props: {
      type: CartTypeVO.guest(),
      currency: 'BDT', itemCount: 1, subtotal: 100, discountAmount: 0,
      taxAmount: 0, shippingAmount: 0, total: 100,
      expiresAt: '2099-12-31T23:59:59.000Z', lastActivityAt: NOW,
    },
  });
}

function makeItem(cartId: string): CartItemEntity {
  return CartItemEntity.reconstitute({
    id: ITEM_ID, createdAt: NOW, updatedAt: NOW,
    props: {
      cartId: CartIdVO.create(cartId),
      productId: ProductIdVO.create(PRODUCT_ID),
      quantity: CartItemQuantityVO.create(2),
      status: CartItemStatusVO.active(),
      unitPrice: 50,
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

function makeMergerRepo(): jest.Mocked<CartMergerRepository> {
  return {
    findById: jest.fn(), findByIdVO: jest.fn(), findAll: jest.fn(),
    save: jest.fn(), delete: jest.fn(), exists: jest.fn(),
    findBySourceCartId: jest.fn(), findByTargetCartId: jest.fn(), findByCartId: jest.fn(),
    findCompleted: jest.fn(), findFailed: jest.fn(), findWithConflicts: jest.fn(),
    findIncomplete: jest.fn(),
    findPaginated: jest.fn(), getStats: jest.fn(),
    findStale: jest.fn(),
    softDelete: jest.fn(), restore: jest.fn(),
  } as unknown as jest.Mocked<CartMergerRepository>;
}

describe('CartMergerService', () => {
  let service: CartMergerService;

  let mockEventBridge: { publishFromEntity: ReturnType<typeof jest.fn> };
  let cartRepo: jest.Mocked<CartRepository>;
  let itemRepo: jest.Mocked<CartItemRepository>;
  let mergerRepo: jest.Mocked<CartMergerRepository>;

  beforeEach(() => {
    cartRepo = makeCartRepo();
    itemRepo = makeItemRepo();
    mergerRepo = makeMergerRepo();
    mockEventBridge = {

      publishFromEntity: jest.fn().mockResolvedValue(undefined),

    };

    service = new CartMergerService(cartRepo, itemRepo, mergerRepo, mockEventBridge as never);
  });

  describe('plan', () => {
    it('should plan merge with sum_quantity strategy', async () => {
      cartRepo.findByIdVO
        .mockResolvedValueOnce(makeCart(CART_A))
        .mockResolvedValueOnce(makeCart(CART_B));
      itemRepo.findByCartId
        .mockResolvedValueOnce([makeItem(CART_B)])
        .mockResolvedValueOnce([makeItem(CART_A)]);

      const result = await service.plan(CART_A, CART_B);

      expect(result.sourceCartId).toBe(CART_A);
      expect(result.targetCartId).toBe(CART_B);
      expect(result.itemsMerged).toBeGreaterThanOrEqual(0);
    });
  });

  describe('execute', () => {
    it('should execute merge and persist merger entity', async () => {
      cartRepo.findByIdVO
        .mockResolvedValueOnce(makeCart(CART_A))
        .mockResolvedValueOnce(makeCart(CART_B));
      itemRepo.findByCartId
        .mockResolvedValueOnce([makeItem(CART_B)])
        .mockResolvedValueOnce([makeItem(CART_A)]);
      mergerRepo.save.mockImplementation(async (e) => e);
      cartRepo.save.mockImplementation(async (e) => e);

      const result = await service.execute(CART_A, CART_B);

      expect(result.success).toBe(true);
      expect(result.mergerId).toBeDefined();
      expect(mergerRepo.save).toHaveBeenCalled();
    });

    it('should throw when source and target are the same', async () => {
      cartRepo.findByIdVO.mockResolvedValue(makeCart(CART_A));

      await expect(service.execute(CART_A, CART_A)).rejects.toThrow();
    });
  });

  describe('findByCartId', () => {
    it('should return mergers for cart', async () => {
      mergerRepo.findByCartId.mockResolvedValue([]);

      const result = await service.findByCartId(CART_A);

      expect(result).toHaveLength(0);
    });
  });
});
