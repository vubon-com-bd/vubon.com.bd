import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { SetDefaultAddressHandler } from '@application/commands/address/set-default-address.handler.js';
import { SetDefaultAddressCommand } from '@application/commands/address/set-default-address.command.js';
import type { UserAddressServiceInterface } from '@application/services/interfaces/user-address.service.interface.js';
import type { UserAddressResponseDTO } from '@application/dtos/responses/user-address-response.dto.js';

describe('SetDefaultAddressHandler', () => {
  let handler: SetDefaultAddressHandler;
  let mockService: jest.Mocked<UserAddressServiceInterface>;

  const address: UserAddressResponseDTO = {
    id: 'addr-1', userId: 'u-1', type: 'home', fullName: 'X', phone: 'X',
    addressLine1: 'X', city: 'X', division: 'dhaka', district: 'dhaka',
    postalCode: '1200', country: 'BD', isDefault: true,
    isDefaultShipping: true, isDefaultBilling: false, isVerified: true,
    createdAt: new Date().toISOString(),
  };

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
    handler = new SetDefaultAddressHandler(mockService);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('user.set-default-address');
  });

  it('should call setDefault then findById', async () => {
    mockService.setDefault.mockResolvedValue(undefined);
    mockService.findById.mockResolvedValue(address);

    const result = await handler.execute(
      new SetDefaultAddressCommand('addr-1', 'shipping'),
    );

    expect(mockService.setDefault).toHaveBeenCalledWith('addr-1', 'shipping');
    expect(mockService.findById).toHaveBeenCalledWith('addr-1');
    expect(result).toEqual(address);
  });

  it('should return null if address not found after set', async () => {
    mockService.setDefault.mockResolvedValue(undefined);
    mockService.findById.mockResolvedValue(null);

    const result = await handler.execute(
      new SetDefaultAddressCommand('addr-1', 'both'),
    );
    expect(result).toBeNull();
  });
});
