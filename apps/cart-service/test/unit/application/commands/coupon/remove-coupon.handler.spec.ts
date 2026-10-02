import { jest } from '@jest/globals';

import { RemoveCouponHandler } from '../../../../../src/module/application/commands/coupon/remove-coupon.handler.js';
import { RemoveCouponCommand } from '../../../../../src/module/application/commands/coupon/remove-coupon.command.js';
import type { ICartCouponService } from '../../../../../src/module/application/services/interfaces/cart-coupon.service.interface.js';
import type { CartResponseDTO } from '../../../../../src/module/application/dtos/responses/cart-response.dto.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeService(): jest.Mocked<ICartCouponService> {
  return { apply: jest.fn(), remove: jest.fn(), validate: jest.fn() };
}

describe('RemoveCouponHandler', () => {
  it('delegates to service.remove', async () => {
    const service = makeService();
    const handler = new RemoveCouponHandler(service);
    service.remove.mockResolvedValue({ id: UUID } as CartResponseDTO);
    const dto = { cartId: UUID, reason: 'changed mind' };
    await handler.execute(new RemoveCouponCommand(dto));
    expect(service.remove).toHaveBeenCalledWith(dto);
  });
});
