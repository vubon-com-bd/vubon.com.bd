import { jest } from '@jest/globals';

import { CartCouponController } from '../../../../../src/module/interfaces/controllers/rest/cart-coupon.controller.js';
import type { CommandBus } from '@nestjs/cqrs';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const USER: CurrentUserShape = { userId: '00000000-0000-0000-0000-000000000001' };

describe('CartCouponController', () => {
  let cmd: jest.Mocked<CommandBus>;
  let ctrl: CartCouponController;

  beforeEach(() => {
    cmd = { execute: jest.fn() } as unknown as jest.Mocked<CommandBus>;
    ctrl = new CartCouponController(cmd);
  });

  it('apply() dispatches ApplyCouponCommand', async () => {
    cmd.execute.mockResolvedValue({ id: UUID } as never);
    await ctrl.apply(UUID, { code: 'SAVE10' }, USER);
    expect(cmd.execute).toHaveBeenCalled();
  });

  it('validate() dispatches ValidateCouponCommand', async () => {
    cmd.execute.mockResolvedValue({ valid: true } as never);
    await ctrl.validate(UUID, { code: 'SAVE10' }, USER);
    expect(cmd.execute).toHaveBeenCalled();
  });

  it('remove() dispatches RemoveCouponCommand', async () => {
    cmd.execute.mockResolvedValue({ id: UUID } as never);
    await ctrl.remove(UUID, { reason: 'changed' });
    expect(cmd.execute).toHaveBeenCalled();
  });
});
