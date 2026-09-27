import { jest } from '@jest/globals';

import { UserAddressService } from '@application/services/impl/user-address.service';
import { ListAddressesQuery } from '@application/queries/address/list-addresses.query';
import { GetAddressQuery } from '@application/queries/address/get-address.query';
import { GetDefaultAddressQuery } from '@application/queries/address/get-default-address.query';
import { AddAddressCommand } from '@application/commands/address/add-address.command';
import { UpdateAddressCommand } from '@application/commands/address/update-address.command';
import { DeleteAddressCommand } from '@application/commands/address/delete-address.command';
import { SetDefaultAddressCommand } from '@application/commands/address/set-default-address.command';

describe('UserAddressService — extended', () => {
  let service: UserAddressService;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn().mockResolvedValue({ id: 'a-1' }) };
    queryBus = { execute: jest.fn().mockResolvedValue({ id: 'a-1' }) };
    service = new UserAddressService(commandBus as never, queryBus as never);
  });

  it('findById → GetAddressQuery', async () => {
    await service.findById('u-1', 'a-1');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetAddressQuery));
  });

  it('findDefault → GetDefaultAddressQuery', async () => {
    await service.findDefault('u-1');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetDefaultAddressQuery));
  });

  it('update → UpdateAddressCommand', async () => {
    await service.update({ userId: 'u-1', addressId: 'a-1' } as never);
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(UpdateAddressCommand));
  });

  it('list → ListAddressesQuery', async () => {
    queryBus.execute.mockResolvedValue({ items: [], total: 0 });
    await service.list('u-1');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(ListAddressesQuery));
  });

  it('add → AddAddressCommand', async () => {
    await service.add({ userId: 'u-1' } as never);
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(AddAddressCommand));
  });

  it('remove → DeleteAddressCommand', async () => {
    await service.remove('u-1', 'a-1');
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(DeleteAddressCommand));
  });

  it('setDefault → SetDefaultAddressCommand', async () => {
    await service.setDefault('u-1', 'a-1');
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(SetDefaultAddressCommand));
  });
});
