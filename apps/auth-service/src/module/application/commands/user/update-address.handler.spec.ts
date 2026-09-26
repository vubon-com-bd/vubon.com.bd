/**
 * UpdateAddressHandler — Unit Tests
 */
import { UpdateAddressHandler } from './update-address.handler';
import { UpdateAddressCommand } from './update-address.command';

const mockService = () => ({ update: jest.fn(), toResponse: jest.fn() });

describe('UpdateAddressHandler', () => {
  let handler: UpdateAddressHandler;
  let service: ReturnType<typeof mockService>;

  beforeEach(() => {
    service = mockService();
    handler = new UpdateAddressHandler(service as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('UpdateAddressCommand');
  });

  it('should delegate with addressId', async () => {
    service.update.mockResolvedValue({ id: 'addr-1' });
    service.toResponse.mockReturnValue({ id: 'addr-1' });

    const command = new UpdateAddressCommand('addr-1', { line1: 'New St' } as never);
    const result = await handler.execute(command);

    expect(service.update).toHaveBeenCalledWith('addr-1', command.input);
    expect(result).toBeDefined();
  });
});
