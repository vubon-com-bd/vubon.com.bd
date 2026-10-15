/**
 * Handler Arrays — Wiring Verification
 * @module test/unit/modules
 *
 * Verifies command/query handler arrays are properly exported.
 */
import { describe, it, expect } from '@jest/globals';

import { CART_COMMAND_HANDLERS } from '../../../src/module/modules/cart/commands/index.js';
import { CART_QUERY_HANDLERS } from '../../../src/module/modules/cart/queries/index.js';
import { CART_ITEM_COMMAND_HANDLERS } from '../../../src/module/modules/cart-item/commands/index.js';
import { CART_ITEM_QUERY_HANDLERS } from '../../../src/module/modules/cart-item/queries/index.js';
import { CART_COUPON_COMMAND_HANDLERS } from '../../../src/module/modules/cart-coupon/commands/index.js';
import { CART_VOUCHER_COMMAND_HANDLERS } from '../../../src/module/modules/cart-voucher/commands/index.js';
import { CART_SHIPPING_COMMAND_HANDLERS } from '../../../src/module/modules/cart-shipping/commands/index.js';
import { SAVED_FOR_LATER_COMMAND_HANDLERS } from '../../../src/module/modules/saved-for-later/commands/index.js';
import { GUEST_CART_COMMAND_HANDLERS } from '../../../src/module/modules/guest-cart/commands/index.js';

describe('Handler Arrays', () => {
  describe('Cart handlers', () => {
    it('should have 5 command handlers', () => {
      expect(CART_COMMAND_HANDLERS.length).toBe(5);
    });

    it('should have 4 query handlers', () => {
      expect(CART_QUERY_HANDLERS.length).toBe(4);
    });
  });

  describe('CartItem handlers', () => {
    it('should have 6 command handlers', () => {
      expect(CART_ITEM_COMMAND_HANDLERS.length).toBe(6);
    });

    it('should have 2 query handlers', () => {
      expect(CART_ITEM_QUERY_HANDLERS.length).toBe(2);
    });
  });

  describe('CartCoupon handlers', () => {
    it('should have 3 command handlers', () => {
      expect(CART_COUPON_COMMAND_HANDLERS.length).toBe(3);
    });
  });

  describe('CartVoucher handlers', () => {
    it('should have 2 command handlers', () => {
      expect(CART_VOUCHER_COMMAND_HANDLERS.length).toBe(2);
    });
  });

  describe('CartShipping handlers', () => {
    it('should have 2 command handlers', () => {
      expect(CART_SHIPPING_COMMAND_HANDLERS.length).toBe(2);
    });
  });

  describe('SavedForLater handlers', () => {
    it('should have 3 command handlers', () => {
      expect(SAVED_FOR_LATER_COMMAND_HANDLERS.length).toBe(3);
    });
  });

  describe('GuestCart handlers', () => {
    it('should have 2 command handlers', () => {
      expect(GUEST_CART_COMMAND_HANDLERS.length).toBe(2);
    });
  });

  describe('All arrays', () => {
    it('all handlers should be functions', () => {
      const allArrays = [
        CART_COMMAND_HANDLERS,
        CART_QUERY_HANDLERS,
        CART_ITEM_COMMAND_HANDLERS,
        CART_ITEM_QUERY_HANDLERS,
        CART_COUPON_COMMAND_HANDLERS,
        CART_VOUCHER_COMMAND_HANDLERS,
        CART_SHIPPING_COMMAND_HANDLERS,
        SAVED_FOR_LATER_COMMAND_HANDLERS,
        GUEST_CART_COMMAND_HANDLERS,
      ];
      for (const arr of allArrays) {
        for (const h of arr) {
          expect(typeof h).toBe('function');
        }
      }
    });
  });
});
