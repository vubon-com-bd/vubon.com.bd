import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GuestCartService } from '../../../../src/module/application/services/impl/guest-cart.service.js';
import type { GuestCartRepository } from '../../../../src/module/domain/repositories/guest-cart.repository.interface.js';
import type { CartRepository } from '../../../../src/module/domain/repositories/cart.repository.interface.js';
import type { CartMergerRepository } from '../../../../src/module/domain/repositories/cart-merger.repository.interface.js';
import { GuestCartEntity } from '../../../../src/module/domain/entities/guest-cart.entity.js';
import { CartEntity } from '../../../../src/module/domain/entities/cart.entity.js';
import { GuestCartIdVO } from '../../../../src/module/domain/value-objects/primitives/guest-cart-id.vo.js';
import { GuestTokenVO } from '../../../../src/module/domain/value-objects/primitives/guest-token.vo.js';
import { CartIdVO } from '../../../../src/module/domain/value-objects/primitives/cart-id.vo.js';
import { CartTypeVO } from '../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';

const GUEST_ID = '123e4567-e89b-12d3-a456-426614174000';
const CART_ID = '223e4567-e89b-12d3-a456-426614174000';
const USER_ID = '323e4567-e89b-12d3-a456-426614174000';
const NOW = '2024-01-15T10:00:00.000Z';
const TOKEN = 'guest-token-abcdefghijklmnopqrst';

function makeGuestCart(): GuestCartEntity {
  return GuestCartEntity.create({
    id: GuestCartIdVO.create(GUEST_ID),
    now: NOW,
    props: {
      token: GuestTokenVO.create(TOKEN),
      cartId: CartIdVO.create(CART_ID),
      itemCount: 2,
      expiresAt: '2099-12-31T23:59:59.000Z',
    },
  });
}

function makeUserCart(): CartEntity {
  return CartEntity.reconstitute({
    id: CART_ID, createdAt: NOW, updatedAt: NOW, status: 'active',
    props: {
      type: CartTypeVO.user(),
      currency: 'BDT', itemCount: 0, subtotal: 0, discountAmount: 0,
      taxAmount: 0, shippingAmount: 0, total: 0,
      expiresAt: '2099-12-31T23:59:59.000Z', lastActivityAt: NOW,
    },
  });
}

function makeGuestRepo(): jest.Mocked<GuestCartRepository> {
  return {
    findById: jest.fn(), findByIdVO: jest.fn(), findAll: jest.fn(),
    save: jest.fn(), delete: jest.fn(), exists: jest.fn(),
    findByToken: jest.fn(), findByCartId: jest.fn(), findByStatus: jest.fn(),
    findExpired: jest.fn(), findMergable: jest.fn(), findStaleAbandonable: jest.fn(),
    findPaginated: jest.fn(), getStats: jest.fn(),
    bulkUpdateStatus: jest.fn(),
    softDelete: jest.fn(), restore: jest.fn(),
  } as unknown as jest.Mocked<GuestCartRepository>;
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

describe('GuestCartService', () => {
  let service: GuestCartService;

  let mockEventBridge: { publishFromEntity: ReturnType<typeof jest.fn> };
  let guestRepo: jest.Mocked<GuestCartRepository>;
  let cartRepo: jest.Mocked<CartRepository>;
  let mergerRepo: jest.Mocked<CartMergerRepository>;

  beforeEach(() => {
    guestRepo = makeGuestRepo();
    cartRepo = makeCartRepo();
    mergerRepo = makeMergerRepo();
    mockEventBridge = {

      publishFromEntity: jest.fn().mockResolvedValue(undefined),

    };

    service = new GuestCartService(guestRepo, cartRepo, mergerRepo, mockEventBridge as never);
  });

  describe('create', () => {
    it('should create a new guest cart', async () => {
      cartRepo.findById.mockResolvedValue(null);
      guestRepo.save.mockImplementation(async (e) => e);

      const result = await service.create({ currency: 'BDT' });

      expect(result.success).toBe(true);
      expect(result.guestCartId).toBeDefined();
      expect(result.token).toBeDefined();
      expect(result.token.length).toBeGreaterThan(16);
    });
  });

  describe('getById', () => {
    it('should return guest cart', async () => {
      guestRepo.findByIdVO.mockResolvedValue(makeGuestCart());

      const result = await service.getById(GUEST_ID);

      expect(result.id).toBe(GUEST_ID);
      expect(result.token).toBe(TOKEN);
    });

    it('should throw when not found', async () => {
      guestRepo.findByIdVO.mockResolvedValue(null);

      await expect(service.getById(GUEST_ID)).rejects.toThrow();
    });
  });

  describe('findByToken', () => {
    it('should return guest cart by token', async () => {
      guestRepo.findByToken.mockResolvedValue(makeGuestCart());

      const result = await service.findByToken(TOKEN);

      expect(result).not.toBeNull();
      expect(result?.token).toBe(TOKEN);
    });

    it('should return null when token not found', async () => {
      guestRepo.findByToken.mockResolvedValue(null);

      const result = await service.findByToken('bad-token');

      expect(result).toBeNull();
    });
  });

  describe('expire', () => {
    it('should expire guest cart', async () => {
      guestRepo.findByIdVO.mockResolvedValue(makeGuestCart());
      guestRepo.save.mockImplementation(async (e) => e);

      const result = await service.expire(GUEST_ID);

      expect(result.status).toBe('expired');
    });
  });

  describe('abandon', () => {
    it('should mark guest cart as abandoned', async () => {
      guestRepo.findByIdVO.mockResolvedValue(makeGuestCart());
      guestRepo.save.mockImplementation(async (e) => e);

      const result = await service.abandon(GUEST_ID);

      expect(result.status).toBe('abandoned');
    });
  });
});
