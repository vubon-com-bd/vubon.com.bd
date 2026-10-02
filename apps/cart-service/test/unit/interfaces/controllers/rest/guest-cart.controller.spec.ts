import { jest } from '@jest/globals';

import { GuestCartController } from '../../../../../src/module/interfaces/controllers/rest/guest-cart.controller.js';
import type { CommandBus } from '@nestjs/cqrs';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

const TOKEN = 'a'.repeat(32);
const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const USER: CurrentUserShape = { userId: '00000000-0000-0000-0000-000000000001' };

describe('GuestCartController', () => {
  let cmd: jest.Mocked<CommandBus>;
  let ctrl: GuestCartController;

  beforeEach(() => {
    cmd = { execute: jest.fn() } as unknown as jest.Mocked<CommandBus>;
    ctrl = new GuestCartController(cmd);
  });

  it('create() dispatches CreateGuestCartCommand', async () => {
    cmd.execute.mockResolvedValue({ id: 'g-1' } as never);
    await ctrl.create({ token: TOKEN, currency: 'BDT' });
    expect(cmd.execute).toHaveBeenCalled();
  });

  it('merge() dispatches MergeGuestCartCommand', async () => {
    cmd.execute.mockResolvedValue({ mergerId: 'm-1' } as never);
    await ctrl.merge({ guestToken: TOKEN, targetCartId: UUID }, USER);
    expect(cmd.execute).toHaveBeenCalled();
  });
});
