/**
 * EnableBiometricHandler — Unit Tests
 */
import { EnableBiometricHandler } from './enable-biometric.handler';
import { EnableBiometricCommand } from './enable-biometric.command';

const mockService = () => ({
  name: 'AuthBiometricService',
  enroll: jest.fn(),
});

describe('EnableBiometricHandler', () => {
  let handler: EnableBiometricHandler;
  let service: ReturnType<typeof mockService>;

  beforeEach(() => {
    service = mockService();
    handler = new EnableBiometricHandler(service as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('EnableBiometricCommand');
  });

  it('should delegate enroll', async () => {
    service.enroll.mockResolvedValue({ enabled: true, biometricId: 'bio-1' });
    const command = new EnableBiometricCommand('user-1' as never, {} as never);

    const result = await handler.execute(command);

    expect(service.enroll).toHaveBeenCalledWith('user-1', command.input);
    expect(result.enabled).toBe(true);
  });
});
