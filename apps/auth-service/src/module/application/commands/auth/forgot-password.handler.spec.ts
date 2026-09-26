/**
 * ForgotPasswordHandler — Unit Tests
 */
import { ForgotPasswordHandler } from './forgot-password.handler';
import { ForgotPasswordCommand } from './forgot-password.command';

const mockAuthService = () => ({
  name: 'AuthService',
  forgotPassword: jest.fn(),
});

describe('ForgotPasswordHandler', () => {
  let handler: ForgotPasswordHandler;
  let authService: ReturnType<typeof mockAuthService>;

  beforeEach(() => {
    authService = mockAuthService();
    handler = new ForgotPasswordHandler(authService as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('ForgotPasswordCommand');
  });

  it('should delegate', async () => {
    authService.forgotPassword.mockResolvedValue(undefined);
    const command = new ForgotPasswordCommand({
      identifier: 'john@example.com',
    } as never);

    await handler.execute(command);

    expect(authService.forgotPassword).toHaveBeenCalledWith(command.input);
  });
});
