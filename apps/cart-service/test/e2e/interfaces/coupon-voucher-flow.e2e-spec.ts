/**
 * Coupon + Voucher Flow — E2E Tests
 */
import { describe, it, expect, beforeAll } from '@jest/globals';
import { CartCouponController } from '../../../src/module/interfaces/controllers/rest/cart-coupon.controller.js';
import { CartVoucherController } from '../../../src/module/interfaces/controllers/rest/cart-voucher.controller.js';
import { createMockCommandBus } from '../../fixtures/interfaces/command-handler.fixture.js';
import { makeApplyCouponDto, makeValidateCouponDto, CART_ID } from '../../fixtures/interfaces/http-dto.fixture.js';
import { createAuthUser } from '../../fixtures/interfaces/http-request.fixture.js';

describe('Coupon + Voucher Flow (e2e)', () => {
  let couponController: CartCouponController;
  let voucherController: CartVoucherController;
  let cmdBus: ReturnType<typeof createMockCommandBus>;

  beforeAll(() => {
    cmdBus = createMockCommandBus();
    couponController = new CartCouponController(cmdBus.bus);
    voucherController = new CartVoucherController(cmdBus.bus);
  });

  it('should complete coupon apply → validate → remove flow', async () => {
    await couponController.apply(CART_ID, makeApplyCouponDto(), createAuthUser());
    expect(cmdBus.executed.length).toBe(1);

    await couponController.validate(CART_ID, makeValidateCouponDto());
    expect(cmdBus.executed.length).toBe(2);

    await couponController.remove(CART_ID, { code: 'SAVE10' }, createAuthUser());
    expect(cmdBus.executed.length).toBe(3);
  });

  it('should complete voucher apply → remove flow', async () => {
    await voucherController.apply(CART_ID, { code: 'GIFT2026ABC' } as never, createAuthUser());
    expect(cmdBus.executed.length).toBe(4);

    await voucherController.remove(CART_ID, { code: 'GIFT2026ABC' } as never, createAuthUser());
    expect(cmdBus.executed.length).toBe(5);
  });
});
