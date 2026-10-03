import { jest } from '@jest/globals';

import { CartVoucherController } from '../../../../../src/module/interfaces/controllers/rest/cart-voucher.controller.js';
import type { CommandBus } from '@nestjs/cqrs';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const USER: CurrentUserShape = { userId: '00000000-0000-0000-0000-000000000001' };

describe('CartVoucherController', () => {
  let cmd: jest.Mocked<CommandBus>;
  let ctrl: CartVoucherController;

  beforeEach(() => {
    cmd = { execute: jest.fn() } as unknown as jest.Mocked<CommandBus>;
    ctrl = new CartVoucherController(cmd);
  });

  it('apply() dispatches ApplyVoucherCommand', async () => {
    cmd.execute.mockResolvedValue({ id: UUID } as never);
    await ctrl.apply(UUID, { code: 'GC-ABCD1234' }, USER);
    expect(cmd.execute).toHaveBeenCalled();
  });

  it('remove() dispatches RemoveVoucherCommand', async () => {
    cmd.execute.mockResolvedValue({ id: UUID } as never);
    await ctrl.remove(UUID, { reason: 'cancel' });
    expect(cmd.execute).toHaveBeenCalled();
  });
});
