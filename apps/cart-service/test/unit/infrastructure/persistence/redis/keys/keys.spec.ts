/**
 * Redis Key generators — Unit Tests
 * @module cart-service/test/unit/infrastructure
 */
import { describe, it, expect } from '@jest/globals';
import { CartKeys } from '@infrastructure/persistence/redis/keys/cart.keys.js';
import { CartItemKeys } from '@infrastructure/persistence/redis/keys/cart-item.keys.js';
import {
  CartCouponKeys,
  CartVoucherKeys,
  CartTaxKeys,
  CartShippingKeys,
} from '@infrastructure/persistence/redis/keys/coupon.keys.js';
import { GuestCartKeys } from '@infrastructure/persistence/redis/keys/guest-cart.keys.js';
import { TEST_IDS } from '@fixtures/index';

describe('Redis Keys', () => {
  // ═══════════════════════════════════════════
  // CartKeys
  // ═══════════════════════════════════════════

  describe('CartKeys', () => {
    it('should generate byId key', () => {
      expect(CartKeys.byId(TEST_IDS.CART_ID)).toBe(`cart:by-id:${TEST_IDS.CART_ID}`);
    });

    it('should generate byUser key', () => {
      expect(CartKeys.byUser(TEST_IDS.USER_ID)).toBe(`cart:by-user:${TEST_IDS.USER_ID}`);
    });

    it('should generate bySession key', () => {
      expect(CartKeys.bySession(TEST_IDS.SESSION_ID)).toBe(
        `cart:by-session:${TEST_IDS.SESSION_ID}`,
      );
    });

    it('should generate activeByUser key', () => {
      expect(CartKeys.activeByUser(TEST_IDS.USER_ID)).toBe(
        `cart:active-by-user:${TEST_IDS.USER_ID}`,
      );
    });

    it('should generate byStatus key', () => {
      expect(CartKeys.byStatus('active')).toBe('cart:by-status:active');
    });

    it('should generate byIdempotencyKey key', () => {
      expect(CartKeys.byIdempotencyKey('idem-1234567890')).toBe(
        'cart:by-idem:idem-1234567890',
      );
    });

    it('should generate totals key', () => {
      expect(CartKeys.totals(TEST_IDS.CART_ID)).toBe(`cart:totals:${TEST_IDS.CART_ID}`);
    });

    it('should generate summary key', () => {
      expect(CartKeys.summary(TEST_IDS.CART_ID)).toBe(`cart:summary:${TEST_IDS.CART_ID}`);
    });

    it('should generate allIds key', () => {
      expect(CartKeys.allIds()).toBe('cart:all-ids');
    });

    it('should generate allUsersIds key', () => {
      expect(CartKeys.allUsersIds()).toBe('cart:all-users-ids');
    });
  });

  // ═══════════════════════════════════════════
  // CartItemKeys
  // ═══════════════════════════════════════════

  describe('CartItemKeys', () => {
    it('should generate byId', () => {
      expect(CartItemKeys.byId(TEST_IDS.CART_ITEM_ID)).toBe(
        `cart:item:by-id:${TEST_IDS.CART_ITEM_ID}`,
      );
    });

    it('should generate byCart', () => {
      expect(CartItemKeys.byCart(TEST_IDS.CART_ID)).toBe(
        `cart:item:by-cart:${TEST_IDS.CART_ID}`,
      );
    });

    it('should generate byProduct', () => {
      expect(CartItemKeys.byProduct(TEST_IDS.PRODUCT_ID)).toBe(
        `cart:item:by-product:${TEST_IDS.PRODUCT_ID}`,
      );
    });

    it('should generate byStatus', () => {
      expect(CartItemKeys.byStatus('active')).toBe('cart:item:by-status:active');
    });

    it('should generate byCartProduct without variant', () => {
      expect(
        CartItemKeys.byCartProduct(TEST_IDS.CART_ID, TEST_IDS.PRODUCT_ID),
      ).toBe(`cart:item:cart-product:${TEST_IDS.CART_ID}:${TEST_IDS.PRODUCT_ID}:_`);
    });

    it('should generate byCartProduct with variant', () => {
      expect(
        CartItemKeys.byCartProduct(
          TEST_IDS.CART_ID,
          TEST_IDS.PRODUCT_ID,
          TEST_IDS.VARIANT_ID,
        ),
      ).toBe(
        `cart:item:cart-product:${TEST_IDS.CART_ID}:${TEST_IDS.PRODUCT_ID}:${TEST_IDS.VARIANT_ID}`,
      );
    });

    it('should generate allByCart', () => {
      expect(CartItemKeys.allByCart(TEST_IDS.CART_ID)).toBe(
        `cart:item:all:${TEST_IDS.CART_ID}`,
      );
    });
  });

  // ═══════════════════════════════════════════
  // CartCouponKeys
  // ═══════════════════════════════════════════

  describe('CartCouponKeys', () => {
    it('should generate byId', () => {
      expect(CartCouponKeys.byId(TEST_IDS.COUPON_ID)).toBe(
        `cart:coupon:by-id:${TEST_IDS.COUPON_ID}`,
      );
    });

    it('should generate byCart', () => {
      expect(CartCouponKeys.byCart(TEST_IDS.CART_ID)).toBe(
        `cart:coupon:by-cart:${TEST_IDS.CART_ID}`,
      );
    });

    it('should generate byCode', () => {
      expect(CartCouponKeys.byCode('SAVE10')).toBe('cart:coupon:by-code:SAVE10');
    });

    it('should generate byCartCode', () => {
      expect(CartCouponKeys.byCartCode(TEST_IDS.CART_ID, 'SAVE10')).toBe(
        `cart:coupon:cart-code:${TEST_IDS.CART_ID}:SAVE10`,
      );
    });

    it('should generate activeByCart', () => {
      expect(CartCouponKeys.activeByCart(TEST_IDS.CART_ID)).toBe(
        `cart:coupon:active:${TEST_IDS.CART_ID}`,
      );
    });
  });

  // ═══════════════════════════════════════════
  // CartVoucherKeys
  // ═══════════════════════════════════════════

  describe('CartVoucherKeys', () => {
    it('should generate byId', () => {
      expect(CartVoucherKeys.byId(TEST_IDS.VOUCHER_ID)).toBe(
        `cart:voucher:by-id:${TEST_IDS.VOUCHER_ID}`,
      );
    });

    it('should generate byCart', () => {
      expect(CartVoucherKeys.byCart(TEST_IDS.CART_ID)).toBe(
        `cart:voucher:by-cart:${TEST_IDS.CART_ID}`,
      );
    });

    it('should generate byCode', () => {
      expect(CartVoucherKeys.byCode('GIFT100')).toBe('cart:voucher:by-code:GIFT100');
    });

    it('should generate byCartCode', () => {
      expect(CartVoucherKeys.byCartCode(TEST_IDS.CART_ID, 'GIFT100')).toBe(
        `cart:voucher:cart-code:${TEST_IDS.CART_ID}:GIFT100`,
      );
    });
  });

  // ═══════════════════════════════════════════
  // CartTaxKeys
  // ═══════════════════════════════════════════

  describe('CartTaxKeys', () => {
    it('should generate byId', () => {
      expect(CartTaxKeys.byId(TEST_IDS.TAX_ID)).toBe(
        `cart:tax:by-id:${TEST_IDS.TAX_ID}`,
      );
    });

    it('should generate byCart', () => {
      expect(CartTaxKeys.byCart(TEST_IDS.CART_ID)).toBe(
        `cart:tax:by-cart:${TEST_IDS.CART_ID}`,
      );
    });
  });

  // ═══════════════════════════════════════════
  // CartShippingKeys
  // ═══════════════════════════════════════════

  describe('CartShippingKeys', () => {
    it('should generate byId', () => {
      expect(CartShippingKeys.byId(TEST_IDS.SHIPPING_ID)).toBe(
        `cart:shipping:by-id:${TEST_IDS.SHIPPING_ID}`,
      );
    });

    it('should generate byCart', () => {
      expect(CartShippingKeys.byCart(TEST_IDS.CART_ID)).toBe(
        `cart:shipping:by-cart:${TEST_IDS.CART_ID}`,
      );
    });
  });

  // ═══════════════════════════════════════════
  // GuestCartKeys
  // ═══════════════════════════════════════════

  describe('GuestCartKeys', () => {
    it('should generate byId', () => {
      expect(GuestCartKeys.byId(TEST_IDS.GUEST_CART_ID)).toBe(
        `guest-cart:by-id:${TEST_IDS.GUEST_CART_ID}`,
      );
    });

    it('should generate byToken', () => {
      expect(GuestCartKeys.byToken('token-abc-123')).toBe(
        'guest-cart:by-token:token-abc-123',
      );
    });

    it('should generate byCart', () => {
      expect(GuestCartKeys.byCart(TEST_IDS.CART_ID)).toBe(
        `guest-cart:by-cart:${TEST_IDS.CART_ID}`,
      );
    });

    it('should generate allIds', () => {
      expect(GuestCartKeys.allIds()).toBe('guest-cart:all-ids');
    });
  });

  // ═══════════════════════════════════════════
  // Uniqueness / separation
  // ═══════════════════════════════════════════

  describe('uniqueness', () => {
    it('should produce distinct keys for distinct ids', () => {
      expect(CartKeys.byId(TEST_IDS.CART_ID)).not.toBe(
        CartKeys.byId(TEST_IDS.CART_ID_2),
      );
    });

    it('should namespace all cart keys under "cart:"', () => {
      const keys = [
        CartKeys.byId('x'),
        CartKeys.byUser('x'),
        CartItemKeys.byId('x'),
        CartCouponKeys.byId('x'),
        CartVoucherKeys.byId('x'),
        CartTaxKeys.byId('x'),
        CartShippingKeys.byId('x'),
      ];
      for (const k of keys) {
        expect(k.startsWith('cart:')).toBe(true);
      }
    });

    it('should namespace guest cart keys under "guest-cart:"', () => {
      expect(GuestCartKeys.byId('x').startsWith('guest-cart:')).toBe(true);
    });
  });
});
