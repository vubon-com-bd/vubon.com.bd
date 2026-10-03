import { jest } from '@jest/globals';

import { SavedForLaterController } from '../../../../../src/module/interfaces/controllers/rest/saved-for-later.controller.js';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const USER: CurrentUserShape = { userId: '00000000-0000-0000-0000-000000000001' };

describe('SavedForLaterController', () => {
  let cmd: jest.Mocked<CommandBus>;
  let qry: jest.Mocked<QueryBus>;
  let ctrl: SavedForLaterController;

  beforeEach(() => {
    cmd = { execute: jest.fn() } as unknown as jest.Mocked<CommandBus>;
    qry = { execute: jest.fn() } as unknown as jest.Mocked<QueryBus>;
    ctrl = new SavedForLaterController(cmd, qry);
  });

  it('save() dispatches SaveForLaterCommand', async () => {
    cmd.execute.mockResolvedValue({ id: 'saved-1' } as never);
    await ctrl.save(UUID, 'i1', {}, USER);
    expect(cmd.execute).toHaveBeenCalled();
  });

  it('moveToCart() dispatches MoveToCartCommand', async () => {
    cmd.execute.mockResolvedValue(undefined as never);
    await ctrl.moveToCart('saved-1', { cartId: UUID }, USER);
    expect(cmd.execute).toHaveBeenCalled();
  });

  it('remove() dispatches RemoveSavedCommand', async () => {
    cmd.execute.mockResolvedValue(undefined as never);
    await ctrl.remove('saved-1', USER);
    expect(cmd.execute).toHaveBeenCalled();
  });

  it('list() dispatches ListSavedQuery', async () => {
    qry.execute.mockResolvedValue({ items: [], total: 0 } as never);
    await ctrl.list(USER, 1, 20);
    expect(qry.execute).toHaveBeenCalled();
  });
});
