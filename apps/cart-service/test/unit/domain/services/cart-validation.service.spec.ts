/**
 * CartValidationService — Unit Tests
 */
import { CartValidationService } from '../../../../src/module/domain/services/cart-validation.service.js';
import { CartEntity } from '../../../../src/module/domain/entities/cart.entity.js';
import { CartItemEntity } from '../../../../src/module/domain/entities/cart-item.entity.js';
import { CartStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { CartItemQuantityVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import {
  CART_STATUS,
  CART_TYPE,
  CART_ITEM_STATUS,
  CART_LIMIT,
} from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const USER = '00000000-0000-0000-0000-000000000001';
const NOW = '2026-01-01T00:00:00Z';
const FUTURE = '2099-12-31T23:59:59Z';

function makeCart(items: CartItemEntity[] = [], overrides = {}): CartEntity {
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
      ...overrides,
    },
  });
  c['_items'] = items;
  return c;
}

function makeItem(id = 'item-1', productId = UUID, qty = 1) {
  return CartItemEntity.create({
    id,
    now: NOW,
    props: {
      productId: CartProductIdVO.create(productId),
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

const validInput = {
  productId: UUID,
  quantity: 1,
  availableStock: 100,
  price: 100,
  isAvailable: true,
};

describe('CartValidationService', () => {
  const svc = new CartValidationService();

  describe('validateAddItem()', () => {
    it('allows valid add', () => {
      const r = svc.validateAddItem({ cart: makeCart(), ...validInput });
      expect(r.allowed).toBe(true);
    });

    it('rejects when cart not active', () => {
      const r = svc.validateAddItem({
        cart: makeCart([], { status: CartStatusVO.create(CART_STATUS.EXPIRED) }),
        ...validInput,
      });
      expect(r.allowed).toBe(false);
      expect(r.errorCode).toBe('CART_NOT_ACTIVE');
    });

    it('rejects when cart expired by time', () => {
      const r = svc.validateAddItem({
        cart: makeCart([], { expiresAt: '2020-01-01T00:00:00Z' }),
        ...validInput,
        now: new Date('2026-01-01T00:00:00Z'),
      });
      expect(r.allowed).toBe(false);
      expect(r.errorCode).toBe('CART_EXPIRED');
    });

    it('rejects when cart full', () => {
      const items = Array.from({ length: CART_LIMIT.MAX_ITEMS }, (_, i) => makeItem(`item-${i}`));
      const r = svc.validateAddItem({ cart: makeCart(items), ...validInput });
      expect(r.allowed).toBe(false);
      expect(r.errorCode).toBe('CART_ITEM_LIMIT_EXCEEDED');
    });

    it('rejects when product unavailable', () => {
      const r = svc.validateAddItem({
        cart: makeCart(),
        ...validInput,
        isAvailable: false,
      });
      expect(r.allowed).toBe(false);
      expect(r.errorCode).toBe('PRODUCT_UNAVAILABLE');
    });

    it('rejects on negative price', () => {
      const r = svc.validateAddItem({ cart: makeCart(), ...validInput, price: -1 });
      expect(r.allowed).toBe(false);
      expect(r.errorCode).toBe('INVALID_PRICE');
    });

    it('rejects on non-integer quantity', () => {
      const r = svc.validateAddItem({ cart: makeCart(), ...validInput, quantity: 1.5 });
      expect(r.allowed).toBe(false);
      expect(r.errorCode).toBe('INVALID_QUANTITY');
    });

    it('rejects when exceeding max quantity per item', () => {
      const r = svc.validateAddItem({
        cart: makeCart(),
        ...validInput,
        quantity: CART_LIMIT.MAX_QUANTITY_PER_ITEM + 1,
      });
      expect(r.allowed).toBe(false);
      expect(r.errorCode).toBe('MAX_QUANTITY_EXCEEDED');
    });

    it('rejects when exceeding available stock', () => {
      const r = svc.validateAddItem({
        cart: makeCart(),
        ...validInput,
        quantity: 10,
        availableStock: 5,
      });
      expect(r.allowed).toBe(false);
      expect(r.errorCode).toBe('INSUFFICIENT_STOCK');
    });

    it('rejects when merged quantity exceeds stock', () => {
      const existing = makeItem('i1', UUID, 3);
      const r = svc.validateAddItem({
        cart: makeCart([existing]),
        ...validInput,
        quantity: 5,
        availableStock: 6,
      });
      expect(r.allowed).toBe(false);
      expect(r.errorCode).toBe('INSUFFICIENT_STOCK');
    });

    it('allows when merged quantity within stock', () => {
      const existing = makeItem('i1', UUID, 3);
      const r = svc.validateAddItem({
        cart: makeCart([existing]),
        ...validInput,
        quantity: 2,
        availableStock: 10,
      });
      expect(r.allowed).toBe(true);
    });
  });

  describe('assertCanAddItem()', () => {
    it('no throw on valid input', () => {
      expect(() => svc.assertCanAddItem({ cart: makeCart(), ...validInput })).not.toThrow();
    });

    it('throws on invalid input', () => {
      expect(() =>
        svc.assertCanAddItem({ cart: makeCart(), ...validInput, isAvailable: false }),
      ).toThrow();
    });
  });

  describe('validateQuantity()', () => {
    it('returns VO for valid quantity', () => {
      const vo = svc.validateQuantity(5);
      expect(vo.value).toBe(5);
    });

    it('throws on invalid quantity', () => {
      expect(() => svc.validateQuantity(0)).toThrow();
    });
  });

  describe('assertNotEmpty()', () => {
    it('no throw for non-empty cart', () => {
      expect(() => svc.assertNotEmpty(makeCart([makeItem()]))).not.toThrow();
    });

    it('throws on empty cart', () => {
      expect(() => svc.assertNotEmpty(makeCart())).toThrow();
    });
  });
});
