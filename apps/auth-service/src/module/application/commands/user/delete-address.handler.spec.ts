/**
 * DeleteAddressHandler — Unit Tests
 */
import { DeleteAddressHandler } from './delete-address.handler';
import { DeleteAddressCommand } from './delete-address.command';

const mockService = () => ({ remove: jest.fn() });

describe('DeleteAddressHandler', () => {
  let handler: DeleteAddressHandler;
  let service: ReturnType<typeof mockService>;

  beforeEach(() => {
    service = mockService();
    handler = new DeleteAddressHandler(service as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('DeleteAddressCommand');
  });

  it('should delegate remove', async () => {
    service.remove.mockResolvedValue(undefined);
    const command = new DeleteAddressCommand({ addressId: 'addr-1' } as never);

    await handler.execute(command);

    expect(service.remove).toHaveBeenCalledWith('addr-1');
  });
});
