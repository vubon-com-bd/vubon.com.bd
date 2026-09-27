/**
 * AddAddressHandler — Unit Tests
 */
import { jest } from '@jest/globals';

import { AddAddressHandler } from './add-address.handler.js';
import { AddAddressCommand } from './add-address.command.js';

const mockService = () => ({ add: jest.fn() as jest.Mock, toResponse: jest.fn() as jest.Mock });

describe('AddAddressHandler', () => {
  let handler: AddAddressHandler;
  let service: ReturnType<typeof mockService>;

  beforeEach(() => {
    service = mockService();
    handler = new AddAddressHandler(service as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('AddAddressCommand');
  });

  it('should delegate add', async () => {
    service.add.mockResolvedValue({ id: 'addr-1' });
    service.toResponse.mockReturnValue({ id: 'addr-1' });

    const command = new AddAddressCommand('user-1' as never, { label: 'Home' } as never);
    const result = await handler.execute(command);

    expect(service.add).toHaveBeenCalledWith('user-1', command.input);
    expect(result.id).toBe('addr-1');
  });
});
