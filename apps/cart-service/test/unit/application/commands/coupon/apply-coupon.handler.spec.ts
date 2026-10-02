import { jest } from '@jest/globals';

import { ApplyCouponHandler } from '../../../../../src/module/application/commands/coupon/apply-coupon.handler.js';
import { ApplyCouponCommand } from '../../../../../src/module/application/commands/coupon/apply-coupon.command.js';
import type { ICartCouponService } from '../../../../../src/module/application/services/interfaces/cart-coupon.service.interface.js';
import type { CartResponseDTO } from '../../../../../src/module/application/dtos/responses/cart-response.dto.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeService(): jest.Mocked<ICartCouponService> {
  return { apply: jest.fn(), remove: jest.fn(), validate: jest.fn() };
}

describe('ApplyCouponHandler', () => {
  it('delegates to service.apply', async () => {
    const service = makeService();
    const handler = new ApplyCouponHandler(service);
    service.apply.mockResolvedValue({ id: UUID } as CartResponseDTO);
    const dto = { cartId: UUID, code: 'SAVE10' };
    await handler.execute(new ApplyCouponCommand(dto));
    expect(service.apply).toHaveBeenCalledWith(dto);
  });

  it('propagates errors', async () => {
    const service = makeService();
    const handler = new ApplyCouponHandler(service);
    service.apply.mockRejectedValue(new Error('invalid coupon'));
    await expect(
      handler.execute(new ApplyCouponCommand({ cartId: UUID, code: 'X' })),
    ).rejects.toThrow('invalid coupon');
  });
});
