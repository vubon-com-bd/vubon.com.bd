import { jest } from '@jest/globals';

/**
 * CartModule — Smoke Test
 */
describe('CartModule smoke', () => {
  it('CartModule class exists', async () => {
    const { CartModule } = await import('../../../src/module/modules/cart/cart.module.js');
    expect(CartModule).toBeDefined();
    expect(typeof CartModule).toBe('function');
  });

  it('CartItemModule class exists', async () => {
    const { CartItemModule } = await import('../../../src/module/modules/cart-item/cart-item.module.js');
    expect(CartItemModule).toBeDefined();
  });

  it('CartCouponModule class exists', async () => {
    const { CartCouponModule } = await import('../../../src/module/modules/cart-coupon/cart-coupon.module.js');
    expect(CartCouponModule).toBeDefined();
  });

  it('CartVoucherModule class exists', async () => {
    const { CartVoucherModule } = await import('../../../src/module/modules/cart-voucher/cart-voucher.module.js');
    expect(CartVoucherModule).toBeDefined();
  });

  it('CartShippingModule class exists', async () => {
    const { CartShippingModule } = await import('../../../src/module/modules/cart-shipping/cart-shipping.module.js');
    expect(CartShippingModule).toBeDefined();
  });

  it('SavedForLaterModule class exists', async () => {
    const { SavedForLaterModule } = await import('../../../src/module/modules/saved-for-later/saved-for-later.module.js');
    expect(SavedForLaterModule).toBeDefined();
  });

  it('AbandonedCartModule class exists', async () => {
    const { AbandonedCartModule } = await import('../../../src/module/modules/abandoned-cart/abandoned-cart.module.js');
    expect(AbandonedCartModule).toBeDefined();
  });

  it('GuestCartModule class exists', async () => {
    const { GuestCartModule } = await import('../../../src/module/modules/guest-cart/guest-cart.module.js');
    expect(GuestCartModule).toBeDefined();
  });

  it('CartMergerModule class exists', async () => {
    const { CartMergerModule } = await import('../../../src/module/modules/cart-merger/cart-merger.module.js');
    expect(CartMergerModule).toBeDefined();
  });

  it('CartTaxModule class exists', async () => {
    const { CartTaxModule } = await import('../../../src/module/modules/cart-tax/cart-tax.module.js');
    expect(CartTaxModule).toBeDefined();
  });

  it('HealthModule class exists', async () => {
    const { HealthModule } = await import('../../../src/module/modules/health/health.module.js');
    expect(HealthModule).toBeDefined();
  });
});

void jest;
