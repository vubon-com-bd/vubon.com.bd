import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CartService } from '../../../../src/module/application/services/impl/cart.service.js';
import type { CartRepository } from '../../../../src/module/domain/repositories/cart.repository.interface.js';
import { CartEntity } from '../../../../src/module/domain/entities/cart.entity.js';
import { CartIdVO } from '../../../../src/module/domain/value-objects/primitives/cart-id.vo.js';
import { CartTypeVO } from '../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { CartNotFoundApplicationError, CartAlreadyExistsApplicationError } from '../../../../src/module/application/errors/cart.errors.js';

const CART_ID = '123e4567-e89b-12d3-a456-426614174000';
const USER_ID = '223e4567-e89b-12d3-a456-426614174000';
const NOW = '2024-01-15T10:00:00.000Z';

function makeCart(): CartEntity {
  return CartEntity.reconstitute({
    id: CART_ID,
    createdAt: NOW,
    updatedAt: NOW,
    status: 'active',
    props: {
      type: CartTypeVO.user(),
      userId: UserIdVO.create(USER_ID),
      currency: 'BDT',
      itemCount: 0,
      subtotal: 0,
      discountAmount: 0,
      taxAmount: 0,
      shippingAmount: 0,
      total: 0,
      expiresAt: '2099-12-31T23:59:59.000Z',
      lastActivityAt: NOW,
    },
  });
}

function makeRepo(): jest.Mocked<CartRepository> {
  return {
    findById: jest.fn(),
    findByIdVO: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findByUserId: jest.fn(),
    findActiveByUserId: jest.fn(),
    findBySessionId: jest.fn(),
    findActiveBySessionId: jest.fn(),
    findByStatus: jest.fn(),
    findByIdempotencyKey: jest.fn(),
    findPaginated: jest.fn(),
    getStats: jest.fn(),
    findStale: jest.fn(),
    findExpired: jest.fn(),
    findAbandonable: jest.fn(),
    findRetryable: jest.fn(),
    countByUserId: jest.fn(),
    countByStatus: jest.fn(),
    countActiveByUserId: jest.fn(),
    softDelete: jest.fn(),
    restore: jest.fn(),
    bulkUpdateStatus: jest.fn(),
  } as unknown as jest.Mocked<CartRepository>;
}

describe('CartService', () => {
  let service: CartService;

  let mockEventBridge: { publishFromEntity: ReturnType<typeof jest.fn> };
  let repo: jest.Mocked<CartRepository>;

  beforeEach(() => {
    repo = makeRepo();
    mockEventBridge = {

      publishFromEntity: jest.fn().mockResolvedValue(undefined),

    };

    service = new CartService(repo, mockEventBridge as never);
  });

  describe('create', () => {
    it('should create a new cart when no active cart exists', async () => {
      repo.findActiveByUserId.mockResolvedValue(null);
      repo.save.mockImplementation(async (e) => e);

      const result = await service.create({ type: 'user', currency: 'BDT' }, USER_ID);

      expect(result.success).toBe(true);
      expect(result.cartId).toBeDefined();
      expect(result.type).toBe('user');
      expect(result.status).toBe('active');
      expect(repo.save).toHaveBeenCalled();
    });

    it('should return existing cart on idempotent hit', async () => {
      const existing = makeCart();
      repo.findByIdempotencyKey.mockResolvedValue(existing);

      const result = await service.create(
        { type: 'user', currency: 'BDT', idempotencyKey: 'idem-key-16-chars-abc' },
        USER_ID,
      );

      expect(result.cartId).toBe(CART_ID);
      expect(repo.save).not.toHaveBeenCalled();
    });

    it('should throw CartAlreadyExistsApplicationError if user has active cart', async () => {
      repo.findActiveByUserId.mockResolvedValue(makeCart());

      await expect(
        service.create({ type: 'user', currency: 'BDT' }, USER_ID),
      ).rejects.toThrow(CartAlreadyExistsApplicationError);
    });

    it('should create guest cart when no user', async () => {
      repo.save.mockImplementation(async (e) => e);

      const result = await service.create({ type: 'guest', currency: 'BDT' });

      expect(result.success).toBe(true);
      expect(result.type).toBe('guest');
    });
  });

  describe('getById', () => {
    it('should return cart when found', async () => {
      repo.findByIdVO.mockResolvedValue(makeCart());

      const result = await service.getById(CART_ID);

      expect(result.id).toBe(CART_ID);
      expect(result.userId).toBe(USER_ID);
    });

    it('should throw CartNotFoundApplicationError when not found', async () => {
      repo.findByIdVO.mockResolvedValue(null);

      await expect(service.getById(CART_ID)).rejects.toThrow(
        CartNotFoundApplicationError,
      );
    });
  });

  describe('getByUserId', () => {
    it('should return cart for user', async () => {
      repo.findActiveByUserId.mockResolvedValue(makeCart());

      const result = await service.getByUserId(USER_ID);

      expect(result).not.toBeNull();
      expect(result?.id).toBe(CART_ID);
    });

    it('should return null when user has no cart', async () => {
      repo.findActiveByUserId.mockResolvedValue(null);

      const result = await service.getByUserId(USER_ID);

      expect(result).toBeNull();
    });
  });

  describe('clear', () => {
    it('should clear the cart and return action response', async () => {
      const cart = makeCart();
      repo.findByIdVO.mockResolvedValue(cart);
      repo.save.mockImplementation(async (e) => e);

      const result = await service.clear({ cartId: CART_ID }, USER_ID);

      expect(result.success).toBe(true);
      expect(result.cartId).toBe(CART_ID);
      expect(result.message).toBe('Cart cleared');
    });
  });

  describe('delete', () => {
    it('should soft-delete the cart', async () => {
      repo.findByIdVO.mockResolvedValue(makeCart());
      repo.softDelete.mockResolvedValue();

      const result = await service.delete({ cartId: CART_ID, hardDelete: false }, USER_ID);

      expect(result.success).toBe(true);
      expect(repo.softDelete).toHaveBeenCalledWith(CART_ID, USER_ID);
    });

    it('should throw when cart not found', async () => {
      repo.findByIdVO.mockResolvedValue(null);

      await expect(
        service.delete({ cartId: CART_ID, hardDelete: false }),
      ).rejects.toThrow(CartNotFoundApplicationError);
    });
  });

  describe('getSummary', () => {
    it('should return summary DTO', async () => {
      repo.findByIdVO.mockResolvedValue(makeCart());

      const result = await service.getSummary(CART_ID);

      expect(result.id).toBe(CART_ID);
      expect(result.itemCount).toBe(0);
      expect(result.total).toBe(0);
    });
  });

  describe('list', () => {
    it('should return paginated list', async () => {
      repo.findPaginated.mockResolvedValue({
        items: [makeCart()],
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

  describe('count', () => {
    it('should return count stats', async () => {
      repo.getStats.mockResolvedValue({
        total: 5,
        totalValue: 0,
        averageValue: 0,
        averageItemCount: 0,
        byStatus: { active: 3, abandoned: 2 },
        byType: {},
      });

      const result = await service.count();

      expect(result.total).toBe(5);
      expect(result.byStatus.active).toBe(3);
    });
  });

  describe('getStats', () => {
    it('should return stats with all fields', async () => {
      repo.getStats.mockResolvedValue({
        total: 10,
        totalValue: 5000,
        averageValue: 500,
        averageItemCount: 2,
        byStatus: { active: 8 },
        byType: { user: 6, guest: 4 },
      });

      const result = await service.getStats();

      expect(result.total).toBe(10);
      expect(result.totalValue).toBe(5000);
      expect(result.currency).toBe('BDT');
      expect(result.byType.user).toBe(6);
    });
  });
});
