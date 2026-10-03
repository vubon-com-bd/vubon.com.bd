import { jest } from '@jest/globals';
/**
 * CartVoucherService — Unit Tests
 */
import { CartVoucherService } from '../../../../src/module/application/services/impl/cart-voucher.service.js';
import { CartEntity } from '../../../../src/module/domain/entities/cart.entity.js';
import { CartItemEntity } from '../../../../src/module/domain/entities/cart-item.entity.js';
import { CartStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { CartItemQuantityVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import type { CartRepository } from '../../../../src/module/domain/repositories/cart.repository.interface.js';
import { CART_STATUS, CART_TYPE, CART_ITEM_STATUS } from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const USER = '00000000-0000-0000-0000-000000000001';
const NOW = '2026-01-01T00:00:00Z';
const FUTURE = '2099-12-31T23:59:59Z';

function makeRepo(): jest.Mocked<CartRepository> {
  return {
    findById: jest.fn(),
    findByIdVO: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(async (c) => c),
    delete: jest.fn(),
    exists: jest.fn(),
    findByUserId: jest.fn(),
    findBySessionId: jest.fn(),
    findActiveByUserId: jest.fn(),
    findAllByUserId: jest.fn(),
    findExpired: jest.fn(),
    findInactive: jest.fn(),
    findPaginated: jest.fn(),
    countByUserId: jest.fn(),
    softDelete: jest.fn(),
  };
}

function makeItem() {
  return CartItemEntity.create({
    id: 'i1',
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

function makeCart(items: CartItemEntity[] = [makeItem()], recalc = false) {
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
  if (recalc) c.recalculateTotals({ now: NOW });
  return c;
}

describe('CartVoucherService', () => {
  let repo: jest.Mocked<CartRepository>;
  let svc: CartVoucherService;

  beforeEach(() => {
    repo = makeRepo();
    svc = new CartVoucherService(repo);
  });

  describe('apply()', () => {
    it('applies voucher', async () => {
      repo.findById.mockResolvedValue(makeCart([makeItem()], true));
      const r = await svc.apply({ cartId: UUID, code: 'GC-ABCD1234' });
      expect(r.voucherCode).toBe('GC-ABCD1234');
    });

    it('throws on empty cart', async () => {
      repo.findById.mockResolvedValue(makeCart([], true));
      await expect(svc.apply({ cartId: UUID, code: 'GC-ABCD1234' })).rejects.toThrow();
    });

    it('throws when cart not found', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(svc.apply({ cartId: UUID, code: 'GC-ABCD1234' })).rejects.toThrow();
    });
  });

  describe('remove()', () => {
    it('removes applied voucher', async () => {
      const cart = makeCart([makeItem()], true);
      cart['_voucherCode'] = 'GC-ABCD1234';
      repo.findById.mockResolvedValue(cart);
      const r = await svc.remove({ cartId: UUID });
      expect(r.voucherCode).toBeUndefined();
    });
  });
});
