/**
 * VerifyEmailHandler — Unit Tests
 */
import { VerifyEmailHandler } from './verify-email.handler';
import { VerifyEmailCommand } from './verify-email.command';

const mockAuthService = () => ({
  name: 'AuthService',
  verifyEmail: jest.fn(),
});

describe('VerifyEmailHandler', () => {
  let handler: VerifyEmailHandler;
  let authService: ReturnType<typeof mockAuthService>;

  beforeEach(() => {
    authService = mockAuthService();
    handler = new VerifyEmailHandler(authService as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('VerifyEmailCommand');
  });

  it('should delegate', async () => {
    authService.verifyEmail.mockResolvedValue(undefined);
    const command = new VerifyEmailCommand({
      email: 'john@example.com',
      code: '123456',
    } as never);

    await handler.execute(command);

    expect(authService.verifyEmail).toHaveBeenCalledWith(command.input);
  });
});
