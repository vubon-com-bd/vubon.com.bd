import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ListAddressesQueryHandler } from '@application/queries/address/list-addresses.handler.js';
import { ListAddressesQuery } from '@application/queries/address/list-addresses.query.js';
import type { UserAddressServiceInterface } from '@application/services/interfaces/user-address.service.interface.js';

describe('ListAddressesQueryHandler', () => {
  let handler: ListAddressesQueryHandler;
  let mockService: jest.Mocked<UserAddressServiceInterface>;

  beforeEach(() => {
    mockService = {
      name: 'UserAddressService',
      listForUser: jest.fn(),
      findById: jest.fn(),
      add: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      setDefault: jest.fn(),
    } as unknown as jest.Mocked<UserAddressServiceInterface>;
    handler = new ListAddressesQueryHandler(mockService);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('user.list-addresses');
  });

  it('should call service.listForUser', async () => {
    mockService.listForUser.mockResolvedValue([]);
    const result = await handler.execute(new ListAddressesQuery('u-1'));
    expect(mockService.listForUser).toHaveBeenCalledWith('u-1');
    expect(result).toEqual([]);
  });
});
