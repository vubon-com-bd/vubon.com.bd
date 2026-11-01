import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CartTaxService } from '../../../../src/module/application/services/impl/cart-tax.service.js';
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
import { CartNotFoundApplicationError } from '../../../../src/module/application/errors/cart.errors.js';

const CART_ID = '123e4567-e89b-12d3-a456-426614174000';
const ITEM_ID = '223e4567-e89b-12d3-a456-426614174000';
const PRODUCT_ID = '323e4567-e89b-12d3-a456-426614174000';
const NOW = '2024-01-15T10:00:00.000Z';

function makeCart(currency = 'BDT'): CartEntity {
  return CartEntity.reconstitute({
    id: CART_ID, createdAt: NOW, updatedAt: NOW, status: 'active',
    props: {
      type: CartTypeVO.user(),
      currency, itemCount: 1, subtotal: 100, discountAmount: 0,
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

describe('CartTaxService', () => {
  let service: CartTaxService;
  let cartRepo: jest.Mocked<CartRepository>;
  let itemRepo: jest.Mocked<CartItemRepository>;

  beforeEach(() => {
    cartRepo = makeCartRepo();
    itemRepo = makeItemRepo();
    service = new CartTaxService(cartRepo, itemRepo);
  });

  describe('calculate', () => {
    it('should calculate with default VAT for BDT', async () => {
      cartRepo.findByIdVO.mockResolvedValue(makeCart('BDT'));
      itemRepo.findByCartId.mockResolvedValue([makeItem()]);

      const result = await service.calculate(CART_ID);

      expect(result.subtotal).toBe(100);
      expect(result.tax).toBe(15);
      expect(result.total).toBe(115);
    });

    it('should exempt VAT for USD', async () => {
      cartRepo.findByIdVO.mockResolvedValue(makeCart('USD'));
      itemRepo.findByCartId.mockResolvedValue([makeItem()]);

      const result = await service.calculate(CART_ID);

      expect(result.tax).toBe(0);
    });

    it('should use override tax rate when provided', async () => {
      cartRepo.findByIdVO.mockResolvedValue(makeCart('BDT'));
      itemRepo.findByCartId.mockResolvedValue([makeItem()]);

      const result = await service.calculate(CART_ID, 10);

      expect(result.tax).toBe(10);
    });

    it('should throw when cart not found', async () => {
      cartRepo.findByIdVO.mockResolvedValue(null);

      await expect(service.calculate(CART_ID)).rejects.toThrow(
        CartNotFoundApplicationError,
      );
    });
  });

  describe('recalculate', () => {
    it('should recalculate and persist totals', async () => {
      cartRepo.findByIdVO.mockResolvedValue(makeCart('BDT'));
      itemRepo.findByCartId.mockResolvedValue([makeItem()]);
      cartRepo.save.mockImplementation(async (e) => e);

      const result = await service.recalculate(CART_ID);

      expect(result.tax).toBe(15);
      expect(cartRepo.save).toHaveBeenCalled();
    });
  });
});
