import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ApplyCouponHandler } from '../../../../src/module/application/commands/coupon/apply-coupon.handler.js';
import { ApplyCouponCommand } from '../../../../src/module/application/commands/coupon/apply-coupon.command.js';
import { RemoveCouponHandler } from '../../../../src/module/application/commands/coupon/remove-coupon.handler.js';
import { RemoveCouponCommand } from '../../../../src/module/application/commands/coupon/remove-coupon.command.js';
import { ValidateCouponHandler } from '../../../../src/module/application/commands/coupon/validate-coupon.handler.js';
import { ValidateCouponCommand } from '../../../../src/module/application/commands/coupon/validate-coupon.command.js';
import type { ICartCouponService } from '../../../../src/module/application/services/interfaces/cart-coupon.service.interface.js';

const CART_ID = '123e4567-e89b-12d3-a456-426614174000';

function makeService(): jest.Mocked<ICartCouponService> {
  return {
    apply: jest.fn(),
    remove: jest.fn(),
    validate: jest.fn(),
    getByCartId: jest.fn(),
    getPublicByCartId: jest.fn(),
  } as unknown as jest.Mocked<ICartCouponService>;
}

describe('Coupon Command Handlers', () => {
  let service: jest.Mocked<ICartCouponService>;

  beforeEach(() => {
    service = makeService();
  });

  describe('ApplyCouponHandler', () => {
    it('should delegate to service.apply', async () => {
      service.apply.mockResolvedValue({ code: 'SAVE20' } as never);

      const handler = new ApplyCouponHandler(service);
      const cmd = new ApplyCouponCommand({ cartId: CART_ID, code: 'SAVE20' });
      await handler.execute(cmd);

      expect(service.apply).toHaveBeenCalled();
    });

    it('should have correct type', () => {
      const cmd = new ApplyCouponCommand({ cartId: CART_ID, code: 'SAVE20' });
      expect(cmd.type).toBe('cart.coupon.apply');
    });
  });

  describe('RemoveCouponHandler', () => {
    it('should delegate to service.remove', async () => {
      service.remove.mockResolvedValue({ success: true } as never);

      const handler = new RemoveCouponHandler(service);
      const cmd = new RemoveCouponCommand({ cartId: CART_ID, code: 'SAVE20' });
      await handler.execute(cmd);

      expect(service.remove).toHaveBeenCalled();
    });
  });

  describe('ValidateCouponHandler', () => {
    it('should delegate to service.validate', async () => {
      service.validate.mockResolvedValue({ valid: true, code: 'SAVE20', discountAmount: 100 });

      const handler = new ValidateCouponHandler(service);
      const cmd = new ValidateCouponCommand({ cartId: CART_ID, code: 'SAVE20' });
      const result = await handler.execute(cmd);

      expect(result.valid).toBe(true);
    });
  });
});
