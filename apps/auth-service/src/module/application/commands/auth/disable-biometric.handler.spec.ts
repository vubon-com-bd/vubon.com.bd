/**
 * DisableBiometricHandler — Unit Tests
 */
import { DisableBiometricHandler } from './disable-biometric.handler';
import { DisableBiometricCommand } from './disable-biometric.command';

const mockService = () => ({
  name: 'AuthBiometricService',
  remove: jest.fn(),
});

describe('DisableBiometricHandler', () => {
  let handler: DisableBiometricHandler;
  let service: ReturnType<typeof mockService>;

  beforeEach(() => {
    service = mockService();
    handler = new DisableBiometricHandler(service as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('DisableBiometricCommand');
  });

  it('should delegate remove', async () => {
    service.remove.mockResolvedValue(undefined);
    const command = new DisableBiometricCommand('user-1' as never, {} as never);

    await handler.execute(command);

    expect(service.remove).toHaveBeenCalledWith('user-1', command.input);
  });
});
