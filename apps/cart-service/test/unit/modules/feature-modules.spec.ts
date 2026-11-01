/**
 * Feature Modules — Wiring Verification
 * @module test/unit/modules
 *
 * Verifies all 10 feature modules are defined and exported correctly.
 */
import { describe, it, expect } from '@jest/globals';

import { CartModule } from '../../../src/module/modules/cart/cart.module.js';
import { CartItemModule } from '../../../src/module/modules/cart-item/cart-item.module.js';
import { CartCouponModule } from '../../../src/module/modules/cart-coupon/cart-coupon.module.js';
import { CartVoucherModule } from '../../../src/module/modules/cart-voucher/cart-voucher.module.js';
import { CartTaxModule } from '../../../src/module/modules/cart-tax/cart-tax.module.js';
import { CartShippingModule } from '../../../src/module/modules/cart-shipping/cart-shipping.module.js';
import { SavedForLaterModule } from '../../../src/module/modules/saved-for-later/saved-for-later.module.js';
import { AbandonedCartModule } from '../../../src/module/modules/abandoned-cart/abandoned-cart.module.js';
import { GuestCartModule } from '../../../src/module/modules/guest-cart/guest-cart.module.js';
import { CartMergerModule } from '../../../src/module/modules/cart-merger/cart-merger.module.js';

describe('Feature Modules', () => {
  const modules = {
    CartModule,
    CartItemModule,
    CartCouponModule,
    CartVoucherModule,
    CartTaxModule,
    CartShippingModule,
    SavedForLaterModule,
    AbandonedCartModule,
    GuestCartModule,
    CartMergerModule,
  };

  it('should define all 10 feature modules', () => {
    expect(Object.keys(modules).length).toBe(10);
  });

  it.each(Object.entries(modules))('%s should be defined', (_name, mod) => {
    expect(mod).toBeDefined();
    expect(typeof mod).toBe('function');
  });
});
