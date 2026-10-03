import { jest } from '@jest/globals';

/**
 * CartShippingService — Unit Tests
 */
import { CartShippingService } from '../../../../src/module/application/services/impl/cart-shipping.service.js';
import { CartEntity } from '../../../../src/module/domain/entities/cart.entity.js';
import { CartItemEntity } from '../../../../src/module/domain/entities/cart-item.entity.js';
import { CartShippingEntity } from '../../../../src/module/domain/entities/cart-shipping.entity.js';
import { CartStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { CartItemQuantityVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { CartShippingIdVO } from '../../../../src/module/domain/value-objects/primitives/cart-shipping-id.vo.js';
import { CartShippingMethodVO } from '../../../../src/module/domain/value-objects/primitives/cart-shipping-method.vo.js';
import type { CartRepository } from '../../../../src/module/domain/repositories/cart.repository.interface.js';
import type { CartShippingRepository } from '../../../../src/module/domain/repositories/cart-shipping.repository.interface.js';
import { SHIPPING_METHOD } from '@vubon/shared-constants/logistics';
import { CART_STATUS, CART_TYPE, CART_ITEM_STATUS } from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const SHIP_UUID = '11111111-1111-1111-1111-111111111111';
const USER = '00000000-0000-0000-0000-000000000001';
const ADDR = '00000000-0000-0000-0000-000000000002';
const NOW = '2026-01-01T00:00:00Z';
const FUTURE = '2099-12-31T23:59:59Z';

function makeCartRepo(): jest.Mocked<CartRepository> {
  return {
    findById: jest.fn(), findByIdVO: jest.fn(), findAll: jest.fn(),
    save: jest.fn(async (c) => c), delete: jest.fn(), exists: jest.fn(),
    findByUserId: jest.fn(), findBySessionId: jest.fn(), findActiveByUserId: jest.fn(),
    findAllByUserId: jest.fn(), findExpired: jest.fn(), findInactive: jest.fn(),
    findPaginated: jest.fn(), countByUserId: jest.fn(), softDelete: jest.fn(),
  };
}

function makeShipRepo(): jest.Mocked<CartShippingRepository> {
  return {
    findById: jest.fn(), findAll: jest.fn(), save: jest.fn(async (e) => e),
    delete: jest.fn(), exists: jest.fn(),
    findByCartId: jest.fn(), findByAddressId: jest.fn(),
    upsertForCart: jest.fn(), deleteByCartId: jest.fn(),
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

function makeCart(paid: boolean = true) {
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
  c['_items'] = [makeItem()];
  if (paid) c.recalculateTotals({ now: NOW });
  return c;
}

function makeShippingEntity() {
  return CartShippingEntity.create({
    id: SHIP_UUID,
    now: NOW,
    props: {
      cartId: CartEntity.create({
        id: UUID, now: NOW,
        props: {
          type: CartTypeVO.create(CART_TYPE.USER),
          status: CartStatusVO.create(CART_STATUS.ACTIVE),
          userId: CartUserIdVO.create(USER),
          currency: 'BDT', expiresAt: FUTURE, lastActivityAt: NOW,
        },
      }).toIdVO,
      method: CartShippingMethodVO.create(SHIPPING_METHOD.STANDARD),
      cost: 100,
      currency: 'BDT',
      freeShippingThreshold: 1000,
      addressId: ADDR,
    },
  });
}

describe('CartShippingService', () => {
  let cartRepo: jest.Mocked<CartRepository>;
  let shipRepo: jest.Mocked<CartShippingRepository>;
  let svc: CartShippingService;

  beforeEach(() => {
    cartRepo = makeCartRepo();
    shipRepo = makeShipRepo();
    svc = new CartShippingService(cartRepo, shipRepo);
  });

  describe('setMethod()', () => {
    it('creates new shipping when none exists', async () => {
      cartRepo.findById.mockResolvedValue(makeCart());
      shipRepo.findByCartId.mockResolvedValue(null);
      const r = await svc.setMethod({
        cartId: UUID,
        method: SHIPPING_METHOD.STANDARD,
        cost: 100,
        currency: 'BDT',
        addressId: ADDR,
      });
      expect(r.id).toBe(UUID);
      expect(shipRepo.save).toHaveBeenCalled();
    });

    it('updates existing shipping', async () => {
      cartRepo.findById.mockResolvedValue(makeCart());
      shipRepo.findByCartId.mockResolvedValue(makeShippingEntity());
      const r = await svc.setMethod({
        cartId: UUID,
        method: SHIPPING_METHOD.EXPRESS,
        cost: 200,
        currency: 'BDT',
        addressId: ADDR,
      });
      expect(r.id).toBe(UUID);
    });

    it('throws when cart not found', async () => {
      cartRepo.findById.mockResolvedValue(null);
      await expect(
        svc.setMethod({
          cartId: 'missing',
          method: SHIPPING_METHOD.STANDARD,
          cost: 100,
          currency: 'BDT',
          addressId: ADDR,
        }),
      ).rejects.toThrow();
    });
  });

  describe('calculate()', () => {
    it('calculates totals with shipping cost', async () => {
      cartRepo.findById.mockResolvedValue(makeCart(true));
      shipRepo.findByCartId.mockResolvedValue(makeShippingEntity());
      // subtotal = 200, threshold 1000 → cost applies = 100
      const r = await svc.calculate({ cartId: UUID });
      expect(r.shippingAmount).toBe(100);
      expect(r.grandTotal).toBe(300);
    });

    it('free shipping when threshold met', async () => {
      const cart = makeCart(true);
      cart['_totals'] = { ...cart.totals, subtotal: 1500 } as never;
      cartRepo.findById.mockResolvedValue(cart);
      shipRepo.findByCartId.mockResolvedValue(makeShippingEntity());
      const r = await svc.calculate({ cartId: UUID });
      expect(r.shippingAmount).toBe(0);
    });

    it('handles no shipping entity set', async () => {
      cartRepo.findById.mockResolvedValue(makeCart(true));
      shipRepo.findByCartId.mockResolvedValue(null);
      const r = await svc.calculate({ cartId: UUID });
      expect(r.shippingAmount).toBe(0);
    });
  });
});
