import { jest } from '@jest/globals';

import { UserAddressController } from '@interfaces/controllers/rest/user-address.controller';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ListAddressesQuery } from '@application/queries/address/list-addresses.query';
import { AddAddressCommand } from '@application/commands/address/add-address.command';

describe('UserAddressController', () => {
  let controller: UserAddressController;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    queryBus = { execute: jest.fn() };
    controller = new UserAddressController(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus
    );
  });

  const addressDto = {
    id: 'addr-1',
    userId: 'user-1',
    type: 'home',
    line1: '123 Main',
    city: 'Dhaka',
    country: 'BD',
    isDefault: true,
    isDefaultShipping: false,
    isDefaultBilling: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  };

  it('should list addresses', async () => {
    queryBus.execute.mockResolvedValue({ items: [addressDto], total: 1 });
    const result = await controller.list('user-1');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(ListAddressesQuery));
    expect(result.total).toBe(1);
  });

  it('should add address', async () => {
    commandBus.execute.mockResolvedValue(addressDto);
    const result = await controller.add('user-1', {
      type: 'home',
      line1: '123 Main',
      city: 'Dhaka',
      postalCode: '1200',
    });
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(AddAddressCommand));
    expect(result.id).toBe('addr-1');
  });
});
