import { jest } from '@jest/globals';

/**
 * CartMergerService — Unit Tests
 */
import { CartMergerService } from '../../../../src/module/application/services/impl/cart-merger.service.js';
import { CartEntity } from '../../../../src/module/domain/entities/cart.entity.js';
import { CartItemEntity } from '../../../../src/module/domain/entities/cart-item.entity.js';
import { CartMergerEntity } from '../../../../src/module/domain/entities/cart-merger.entity.js';
import { GuestCartEntity } from '../../../../src/module/domain/entities/guest-cart.entity.js';
import { CartStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { CartItemQuantityVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { GuestCartStatusVO } from '../../../../src/module/domain/value-objects/primitives/guest-cart-status.vo.js';
import { GuestTokenVO } from '../../../../src/module/domain/value-objects/primitives/guest-token.vo.js';
import { MergeStrategyVO } from '../../../../src/module/domain/value-objects/primitives/merge-strategy.vo.js';
import { CartIdVO } from '../../../../src/module/domain/value-objects/primitives/cart-id.vo.js';
import type { CartRepository } from '../../../../src/module/domain/repositories/cart.repository.interface.js';
import type { GuestCartRepository } from '../../../../src/module/domain/repositories/guest-cart.repository.interface.js';
import type { CartMergerRepository } from '../../../../src/module/domain/repositories/cart-merger.repository.interface.js';
import { CART_STATUS, CART_TYPE, CART_ITEM_STATUS, GUEST_CART_STATUS, MERGE_STRATEGY } from '@vubon/shared-constants/business/cart';

const SRC = '11111111-1111-1111-1111-111111111111';
const TGT = '22222222-2222-2222-2222-222222222222';
const MERGER_UUID = '33333333-3333-3333-3333-333333333333';
const PRODUCT = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const USER = '00000000-0000-0000-0000-000000000001';
const NOW = '2026-01-01T00:00:00Z';
const FUTURE = '2099-12-31T23:59:59Z';
const TOKEN = 'a'.repeat(32);

function makeCartRepo(): jest.Mocked<CartRepository> {
  return {
    findById: jest.fn(), findByIdVO: jest.fn(), findAll: jest.fn(),
    save: jest.fn(async (c) => c), delete: jest.fn(), exists: jest.fn(),
    findByUserId: jest.fn(), findBySessionId: jest.fn(), findActiveByUserId: jest.fn(),
    findAllByUserId: jest.fn(), findExpired: jest.fn(), findInactive: jest.fn(),
    findPaginated: jest.fn(), countByUserId: jest.fn(), softDelete: jest.fn(),
  };
}

function makeGuestRepo(): jest.Mocked<GuestCartRepository> {
  return {
    findById: jest.fn(), findByIdVO: jest.fn(), findAll: jest.fn(),
    save: jest.fn(async (e) => e), delete: jest.fn(), exists: jest.fn(),
    findByToken: jest.fn(), findActiveByToken: jest.fn(),
    findExpired: jest.fn(), findMergeable: jest.fn(), deleteExpired: jest.fn(),
  };
}

function makeMergerRepo(): jest.Mocked<CartMergerRepository> {
  return {
    findById: jest.fn(), findByIdVO: jest.fn(), findAll: jest.fn(),
    save: jest.fn(async (e) => e), delete: jest.fn(), exists: jest.fn(),
    findBySourceCartId: jest.fn(), findByTargetCartId: jest.fn(),
    findLatestByTargetCartId: jest.fn(), countByTargetCartId: jest.fn(),
  };
}

function makeItem(id: string, qty = 2) {
  return CartItemEntity.create({
    id,
    now: NOW,
    props: {
      productId: CartProductIdVO.create(PRODUCT),
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

function makeCart(id: string, items: CartItemEntity[] = []): CartEntity {
  const c = CartEntity.create({
    id,
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

function makeGuestEntity(id: string) {
  return GuestCartEntity.create({
    id,
    now: NOW,
    props: {
      token: GuestTokenVO.create(TOKEN),
      status: GuestCartStatusVO.create(GUEST_CART_STATUS.ACTIVE),
      itemCount: 2,
      expiresAt: FUTURE,
    },
  });
}

describe('CartMergerService', () => {
  let cartRepo: jest.Mocked<CartRepository>;
  let guestRepo: jest.Mocked<GuestCartRepository>;
  let mergerRepo: jest.Mocked<CartMergerRepository>;
  let svc: CartMergerService;

  beforeEach(() => {
    cartRepo = makeCartRepo();
    guestRepo = makeGuestRepo();
    mergerRepo = makeMergerRepo();
    svc = new CartMergerService(cartRepo, guestRepo, mergerRepo);
  });

  describe('mergeGuestCart()', () => {
    it('merges guest items into target cart', async () => {
      cartRepo.findById
        .mockResolvedValueOnce(makeCart(TGT, [])) // target
        .mockResolvedValueOnce(makeCart(SRC, [makeItem('i1')])); // source
      guestRepo.findByToken.mockResolvedValue(makeGuestEntity(SRC));
      mergerRepo.save.mockImplementation(async (e) => e);
      const r = await svc.mergeGuestCart({
        guestToken: TOKEN,
        targetCartId: TGT,
        userId: USER,
      });
      expect(r.sourceCartId).toBe(SRC);
      expect(r.targetCartId).toBe(TGT);
      expect(mergerRepo.save).toHaveBeenCalled();
    });

    it('throws when target cart not found', async () => {
      cartRepo.findById.mockResolvedValue(null);
      await expect(
        svc.mergeGuestCart({ guestToken: TOKEN, targetCartId: TGT, userId: USER }),
      ).rejects.toThrow();
    });

    it('throws when guest cart not found', async () => {
      cartRepo.findById.mockResolvedValueOnce(makeCart(TGT, []));
      guestRepo.findByToken.mockResolvedValue(null);
      await expect(
        svc.mergeGuestCart({ guestToken: TOKEN, targetCartId: TGT, userId: USER }),
      ).rejects.toThrow();
    });

    it('throws when source cart not found', async () => {
      cartRepo.findById
        .mockResolvedValueOnce(makeCart(TGT, []))
        .mockResolvedValueOnce(null);
      guestRepo.findByToken.mockResolvedValue(makeGuestEntity(SRC));
      await expect(
        svc.mergeGuestCart({ guestToken: TOKEN, targetCartId: TGT, userId: USER }),
      ).rejects.toThrow();
    });

    it('uses provided strategy', async () => {
      cartRepo.findById
        .mockResolvedValueOnce(makeCart(TGT, []))
        .mockResolvedValueOnce(makeCart(SRC, [makeItem('i1')]));
      guestRepo.findByToken.mockResolvedValue(makeGuestEntity(SRC));
      mergerRepo.save.mockImplementation(async (e) => e);
      const r = await svc.mergeGuestCart({
        guestToken: TOKEN,
        targetCartId: TGT,
        userId: USER,
        strategy: MERGE_STRATEGY.MAX_QUANTITY,
      });
      expect(r.strategy).toBe(MERGE_STRATEGY.MAX_QUANTITY);
    });

    it('uses default strategy when not provided', async () => {
      cartRepo.findById
        .mockResolvedValueOnce(makeCart(TGT, []))
        .mockResolvedValueOnce(makeCart(SRC, [makeItem('i1')]));
      guestRepo.findByToken.mockResolvedValue(makeGuestEntity(SRC));
      mergerRepo.save.mockImplementation(async (e) => e);
      const r = await svc.mergeGuestCart({
        guestToken: TOKEN,
        targetCartId: TGT,
        userId: USER,
      });
      expect(r.strategy).toBe(MERGE_STRATEGY.SUM_QUANTITY);
    });
  });

  describe('getById()', () => {
    it('returns merger DTO when found', async () => {
      const merger = CartMergerEntity.create({
        id: MERGER_UUID,
        now: NOW,
        props: {
          sourceCartId: CartIdVO.create(SRC),
          targetCartId: CartIdVO.create(TGT),
          strategy: MergeStrategyVO.create(MERGE_STRATEGY.SUM_QUANTITY),
          itemsMerged: 5,
          conflicts: 1,
          mergedAt: NOW,
        },
      });
      mergerRepo.findById.mockResolvedValue(merger);
      const r = await svc.getById(MERGER_UUID);
      expect(r?.mergerId).toBe(MERGER_UUID);
    });

    it('returns null when not found', async () => {
      mergerRepo.findById.mockResolvedValue(null);
      const r = await svc.getById('x');
      expect(r).toBeNull();
    });
  });
});
