import { jest } from '@jest/globals';

import { UserAddressService } from '@application/services/impl/user-address.service';
import { ListAddressesQuery } from '@application/queries/address/list-addresses.query';
import { AddAddressCommand } from '@application/commands/address/add-address.command';
import { DeleteAddressCommand } from '@application/commands/address/delete-address.command';

describe('Application UserAddressService', () => {
  let service: UserAddressService;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    queryBus = { execute: jest.fn() };
    service = new UserAddressService(commandBus as never, queryBus as never);
  });

  it('list → ListAddressesQuery', async () => {
    queryBus.execute.mockResolvedValue({ items: [], total: 0 });
    await service.list('user-1');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(ListAddressesQuery));
  });

  it('add → AddAddressCommand', async () => {
    commandBus.execute.mockResolvedValue({ id: 'a-1' });
    await service.add({ userId: 'user-1' } as never);
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(AddAddressCommand));
  });

  it('remove → DeleteAddressCommand', async () => {
    commandBus.execute.mockResolvedValue({ success: true });
    await service.remove('user-1', 'a-1');
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(DeleteAddressCommand));
  });

  it('setDefault → dispatches', async () => {
    commandBus.execute.mockResolvedValue({ id: 'a-1', isDefault: true });
    await service.setDefault('user-1', 'a-1');
    expect(commandBus.execute).toHaveBeenCalled();
  });
});
