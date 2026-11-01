/**
 * E2E — Coupon & Voucher Flow (Application Layer)
 * @module cart-service/test/e2e/application
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

import { CartService } from '@application/services/impl/cart.service.js';
import { CartCouponService } from '@application/services/impl/cart-coupon.service.js';
import { CartVoucherService } from '@application/services/impl/cart-voucher.service.js';

import { createE2ERepos, type E2ERepoBundle } from './setup/in-memory-repos.js';

const USER_ID = '33333333-3333-4333-8333-333333333333';

describe('E2E — Application / Coupon & Voucher Flow', () => {
  let repos: E2ERepoBundle;
  let cartService: CartService;
  let couponService: CartCouponService;

  let mockEventBridge: { publishFromEntity: ReturnType<typeof jest.fn> };
  let voucherService: CartVoucherService;

  beforeEach(() => {


    mockEventBridge = {


      publishFromEntity: jest.fn().mockResolvedValue(undefined),


    };
    repos = createE2ERepos();
    cartService = new CartService(repos.carts, repos.items, mockEventBridge as never);
    couponService = new CartCouponService(repos.carts, repos.coupons, mockEventBridge as never);
    voucherService = new CartVoucherService(repos.carts, repos.vouchers, mockEventBridge as never);
  });

  it('apply coupon lifecycle: apply → get → remove', async () => {
    const created = await cartService.create({ type: 'user', currency: 'BDT' }, USER_ID);
    const cartId = created.cartId;

    const applied = await couponService.apply({ cartId, code: 'SAVE20' });
    expect(applied.code).toBe('SAVE20');

    const list = await couponService.getByCartId(cartId);
    expect(list.length).toBeGreaterThanOrEqual(1);

    const removed = await couponService.remove({ cartId, code: 'SAVE20' });
    expect(removed.success).toBe(true);
  });

  it('applying duplicate coupon throws', async () => {
    const created = await cartService.create({ type: 'user', currency: 'BDT' }, USER_ID);
    const cartId = created.cartId;

    await couponService.apply({ cartId, code: 'SAVE20' });

    await expect(couponService.apply({ cartId, code: 'SAVE20' })).rejects.toThrow();
  });

  it('apply voucher lifecycle: apply → get → remove', async () => {
    const created = await cartService.create({ type: 'user', currency: 'BDT' }, USER_ID);
    const cartId = created.cartId;

    const applied = await voucherService.apply({ cartId, code: 'GIFT12345678' });
    expect(applied.code).toBe('GIFT12345678');

    const list = await voucherService.getByCartId(cartId);
    expect(list.length).toBeGreaterThanOrEqual(1);

    const removed = await voucherService.remove({ cartId, code: 'GIFT12345678' });
    expect(removed.success).toBe(true);
  });

  it('applying duplicate voucher throws', async () => {
    const created = await cartService.create({ type: 'user', currency: 'BDT' }, USER_ID);
    const cartId = created.cartId;

    await voucherService.apply({ cartId, code: 'GIFT12345678' });

    await expect(
      voucherService.apply({ cartId, code: 'GIFT12345678' }),
    ).rejects.toThrow();
  });
});
