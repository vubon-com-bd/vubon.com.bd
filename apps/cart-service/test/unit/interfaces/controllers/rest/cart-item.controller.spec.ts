import { jest } from '@jest/globals';

import { CartItemController } from '../../../../../src/module/interfaces/controllers/rest/cart-item.controller.js';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('CartItemController', () => {
  let cmd: jest.Mocked<CommandBus>;
  let qry: jest.Mocked<QueryBus>;
  let ctrl: CartItemController;

  beforeEach(() => {
    cmd = { execute: jest.fn() } as unknown as jest.Mocked<CommandBus>;
    qry = { execute: jest.fn() } as unknown as jest.Mocked<QueryBus>;
    ctrl = new CartItemController(cmd, qry);
  });

  it('add() dispatches AddItemCommand', async () => {
    cmd.execute.mockResolvedValue({ id: UUID } as never);
    await ctrl.add(UUID, {} as never);
    expect(cmd.execute).toHaveBeenCalled();
  });

  it('list() dispatches ListItemsQuery', async () => {
    qry.execute.mockResolvedValue([]);
    await ctrl.list(UUID);
    expect(qry.execute).toHaveBeenCalled();
  });

  it('getOne() dispatches GetItemQuery', async () => {
    qry.execute.mockResolvedValue({ id: 'i1' } as never);
    await ctrl.getOne(UUID, 'i1');
    expect(qry.execute).toHaveBeenCalled();
  });

  it('update() dispatches UpdateItemCommand', async () => {
    cmd.execute.mockResolvedValue({ id: UUID } as never);
    await ctrl.update(UUID, 'i1', { quantity: 5 });
    expect(cmd.execute).toHaveBeenCalled();
  });

  it('updateQuantity() dispatches UpdateQuantityCommand', async () => {
    cmd.execute.mockResolvedValue({ id: UUID } as never);
    await ctrl.updateQuantity(UUID, 'i1', { quantity: 5 });
    expect(cmd.execute).toHaveBeenCalled();
  });

  it('select() dispatches SelectItemCommand', async () => {
    cmd.execute.mockResolvedValue({ id: UUID } as never);
    await ctrl.select(UUID, 'i1', { selected: true });
    expect(cmd.execute).toHaveBeenCalled();
  });

  it('remove() dispatches RemoveItemCommand', async () => {
    cmd.execute.mockResolvedValue({ id: UUID } as never);
    await ctrl.remove(UUID, 'i1', {});
    expect(cmd.execute).toHaveBeenCalled();
  });
});
