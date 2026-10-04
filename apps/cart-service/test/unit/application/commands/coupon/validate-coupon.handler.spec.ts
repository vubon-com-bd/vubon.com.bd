import { jest } from '@jest/globals';

import { ValidateCouponHandler } from '../../../../../src/module/application/commands/coupon/validate-coupon.handler.js';
import { ValidateCouponCommand } from '../../../../../src/module/application/commands/coupon/validate-coupon.command.js';
import type { ICartCouponService } from '../../../../../src/module/application/services/interfaces/cart-coupon.service.interface.js';
import type { CouponValidationResponseDTO } from '../../../../../src/module/application/dtos/responses/coupon-response.dto.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeService(): jest.Mocked<ICartCouponService> {
  return { apply: jest.fn(), remove: jest.fn(), validate: jest.fn() };
}

describe('ValidateCouponHandler', () => {
  it('delegates to service.validate', async () => {
    const service = makeService();
    const handler = new ValidateCouponHandler(service);
    const expected: CouponValidationResponseDTO = {
      valid: true, code: 'SAVE10', discountAmount: 100,
    };
    service.validate.mockResolvedValue(expected);
    const dto = { cartId: UUID, code: 'SAVE10' };
    const r = await handler.execute(new ValidateCouponCommand(dto));
    expect(service.validate).toHaveBeenCalledWith(dto);
    expect(r.valid).toBe(true);
  });
});
