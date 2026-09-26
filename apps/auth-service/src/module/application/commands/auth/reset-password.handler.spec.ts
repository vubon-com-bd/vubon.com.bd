/**
 * ResetPasswordHandler — Unit Tests
 */
import { ResetPasswordHandler } from './reset-password.handler';
import { ResetPasswordCommand } from './reset-password.command';

const mockAuthService = () => ({
  name: 'AuthService',
  resetPassword: jest.fn(),
});

describe('ResetPasswordHandler', () => {
  let handler: ResetPasswordHandler;
  let authService: ReturnType<typeof mockAuthService>;

  beforeEach(() => {
    authService = mockAuthService();
    handler = new ResetPasswordHandler(authService as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('ResetPasswordCommand');
  });

  it('should delegate', async () => {
    authService.resetPassword.mockResolvedValue(undefined);
    const command = new ResetPasswordCommand({
      token: 'a'.repeat(32),
      newPassword: 'NewStr0ng!Pass#2024',
      confirmPassword: 'NewStr0ng!Pass#2024',
    } as never);

    await handler.execute(command);

    expect(authService.resetPassword).toHaveBeenCalledWith(command.input);
  });
});
