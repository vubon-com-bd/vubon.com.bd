/**
 * CartCouponController — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { CartCouponController } from '../../../../src/module/interfaces/controllers/rest/cart-coupon.controller.js';
import { createMockCommandBus } from '../../../fixtures/interfaces/command-handler.fixture.js';
import { makeApplyCouponDto, makeValidateCouponDto, CART_ID } from '../../../fixtures/interfaces/http-dto.fixture.js';
import { createAuthUser } from '../../../fixtures/interfaces/http-request.fixture.js';

describe('CartCouponController', () => {
  let controller: CartCouponController;
  let cmdBus: ReturnType<typeof createMockCommandBus>;

  beforeEach(() => {
    cmdBus = createMockCommandBus();
    controller = new CartCouponController(cmdBus.bus);
  });

  it('should dispatch ApplyCouponCommand', async () => {
    await controller.apply(CART_ID, makeApplyCouponDto(), createAuthUser());
    expect(cmdBus.executed.length).toBe(1);
  });

  it('should dispatch RemoveCouponCommand', async () => {
    await controller.remove(
      CART_ID,
      { code: 'SAVE10' },
      createAuthUser(),
    );
    expect(cmdBus.executed.length).toBe(1);
  });

  it('should dispatch ValidateCouponCommand', async () => {
    await controller.validate(CART_ID, makeValidateCouponDto());
    expect(cmdBus.executed.length).toBe(1);
  });
});
