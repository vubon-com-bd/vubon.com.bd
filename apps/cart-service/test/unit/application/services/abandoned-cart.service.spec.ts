import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AbandonedCartService } from '../../../../src/module/application/services/impl/abandoned-cart.service.js';
import type { AbandonedCartRepository } from '../../../../src/module/domain/repositories/abandoned-cart.repository.interface.js';
import type { CartRepository } from '../../../../src/module/domain/repositories/cart.repository.interface.js';
import { AbandonedCartEntity } from '../../../../src/module/domain/entities/abandoned-cart.entity.js';
import { CartEntity } from '../../../../src/module/domain/entities/cart.entity.js';
import { AbandonedCartIdVO } from '../../../../src/module/domain/value-objects/primitives/abandoned-cart-id.vo.js';
import { CartIdVO } from '../../../../src/module/domain/value-objects/primitives/cart-id.vo.js';
import { CartTypeVO } from '../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';

const ABANDONED_ID = '123e4567-e89b-12d3-a456-426614174000';
const CART_ID = '223e4567-e89b-12d3-a456-426614174000';
const NOW = '2024-01-15T10:00:00.000Z';

function makeCart(lastActivityHoursAgo = 48): CartEntity {
  const lastActivity = new Date();
  lastActivity.setHours(lastActivity.getHours() - lastActivityHoursAgo);
  return CartEntity.reconstitute({
    id: CART_ID,
    createdAt: NOW,
    updatedAt: lastActivity.toISOString(),
    status: 'active',
    props: {
      type: CartTypeVO.user(),
      currency: 'BDT', itemCount: 3, subtotal: 500, discountAmount: 0,
      taxAmount: 0, shippingAmount: 0, total: 500,
      expiresAt: '2099-12-31T23:59:59.000Z',
      lastActivityAt: lastActivity.toISOString(),
    },
  });
}

function makeAbandoned(): AbandonedCartEntity {
  return AbandonedCartEntity.create({
    id: AbandonedCartIdVO.create(ABANDONED_ID),
    now: NOW,
    props: {
      cartId: CartIdVO.create(CART_ID),
      itemCount: 3,
      cartValue: 500,
      currency: 'BDT',
      abandonedAt: NOW,
      remindersSent: 0,
    },
  });
}

function makeAbandonedRepo(): jest.Mocked<AbandonedCartRepository> {
  return {
    findById: jest.fn(), findByIdVO: jest.fn(), findAll: jest.fn(),
    save: jest.fn(), delete: jest.fn(), exists: jest.fn(),
    findByCartId: jest.fn(), findByUserId: jest.fn(), findByStatus: jest.fn(),
    findPendingReminders: jest.fn(), findLostCandidates: jest.fn(),
    findRecoverable: jest.fn(), findRecovered: jest.fn(),
    findPaginated: jest.fn(), getStats: jest.fn(),
    bulkUpdateStatus: jest.fn(),
    softDelete: jest.fn(), restore: jest.fn(),
  } as unknown as jest.Mocked<AbandonedCartRepository>;
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

describe('AbandonedCartService', () => {
  let service: AbandonedCartService;

  let mockEventBridge: { publishFromEntity: ReturnType<typeof jest.fn> };
  let repo: jest.Mocked<AbandonedCartRepository>;
  let cartRepo: jest.Mocked<CartRepository>;

  beforeEach(() => {
    repo = makeAbandonedRepo();
    cartRepo = makeCartRepo();
    mockEventBridge = {

      publishFromEntity: jest.fn().mockResolvedValue(undefined),

    };

    service = new AbandonedCartService(repo, cartRepo, mockEventBridge as never);
  });

  describe('detect', () => {
    it('should detect abandoned cart with 48h idle', async () => {
      cartRepo.findByIdVO.mockResolvedValue(makeCart(48));
      repo.save.mockImplementation(async (e) => e);
      cartRepo.save.mockImplementation(async (e) => e);

      const result = await service.detect(CART_ID);

      expect(result.cartId).toBe(CART_ID);
      expect(result.status).toBe('pending');
    });

    it('should throw when cart not abandoned (recent activity)', async () => {
      cartRepo.findByIdVO.mockResolvedValue(makeCart(2));

      await expect(service.detect(CART_ID)).rejects.toThrow();
    });
  });

  describe('sendReminder', () => {
    it('should send reminder via email', async () => {
      repo.findByIdVO.mockResolvedValue(makeAbandoned());
      repo.save.mockImplementation(async (e) => e);

      const result = await service.sendReminder(ABANDONED_ID, 'email');

      expect(result.status).toBe('reminded');
      expect(result.remindersSent).toBe(1);
    });
  });

  describe('recover', () => {
    it('should mark abandoned cart as recovered', async () => {
      repo.findByIdVO.mockResolvedValue(makeAbandoned());
      repo.save.mockImplementation(async (e) => e);

      const result = await service.recover(ABANDONED_ID, 'order-xyz');

      expect(result.status).toBe('recovered');
      expect(result.recoveredOrderId).toBe('order-xyz');
    });
  });

  describe('markLost', () => {
    it('should mark abandoned cart as lost', async () => {
      repo.findByIdVO.mockResolvedValue(makeAbandoned());
      repo.save.mockImplementation(async (e) => e);

      const result = await service.markLost(ABANDONED_ID, 'no response');

      expect(result.status).toBe('lost');
    });
  });

  describe('getById', () => {
    it('should return abandoned cart', async () => {
      repo.findByIdVO.mockResolvedValue(makeAbandoned());

      const result = await service.getById(ABANDONED_ID);

      expect(result.id).toBe(ABANDONED_ID);
    });
  });

  describe('list', () => {
    it('should return paginated list', async () => {
      repo.findPaginated.mockResolvedValue({
        items: [makeAbandoned()],
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      });

      const result = await service.list({ page: 1, limit: 10 });

      expect(result.items).toHaveLength(1);
    });
  });

  describe('getStats', () => {
    it('should return stats', async () => {
      repo.getStats.mockResolvedValue({
        total: 10,
        totalValue: 5000,
        averageValue: 500,
        recoveredCount: 3,
        recoveryRate: 0.3,
        byStatus: { pending: 5, recovered: 3, lost: 2 },
      });

      const result = await service.getStats();

      expect(result.total).toBe(10);
      expect(result.recoveredCount).toBe(3);
      expect(result.recoveryRate).toBe(0.3);
    });
  });
});
