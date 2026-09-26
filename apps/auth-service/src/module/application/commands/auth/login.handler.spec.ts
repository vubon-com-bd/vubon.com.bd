/**
 * LoginHandler — Unit Tests
 * @module auth-service/application/commands/auth
 */
import { LoginHandler } from './login.handler';
import { LoginCommand } from './login.command';

const mockAuthService = () => ({
  name: 'AuthService',
  login: jest.fn(),
  register: jest.fn(),
  logout: jest.fn(),
  forgotPassword: jest.fn(),
  resetPassword: jest.fn(),
  verifyEmail: jest.fn(),
});

describe('LoginHandler', () => {
  let handler: LoginHandler;
  let authService: ReturnType<typeof mockAuthService>;

  beforeEach(() => {
    authService = mockAuthService();
    handler = new LoginHandler(authService as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('LoginCommand');
  });

  it('should delegate login to authService', async () => {
    const mockResult = { success: true, accessToken: 'tok' };
    authService.login.mockResolvedValue(mockResult);

    const command = new LoginCommand(
      { identifier: 'john@example.com', password: 'Test1234!' } as never,
      { ip: '192.168.1.1', userAgent: 'Mozilla' },
    );

    const result = await handler.execute(command);

    expect(authService.login).toHaveBeenCalledWith(command.input, command.ctx);
    expect(result).toEqual(mockResult);
  });

  it('should pass ctx to service', async () => {
    authService.login.mockResolvedValue({});
    const ctx = { ip: '1.1.1.1', userAgent: 'curl/8.0' };
    const command = new LoginCommand(
      { identifier: 'x', password: 'y' } as never,
      ctx,
    );

    await handler.execute(command);

    expect(authService.login).toHaveBeenCalledWith(command.input, ctx);
  });

  it('should propagate service errors', async () => {
    authService.login.mockRejectedValue(new Error('Auth failed'));
    const command = new LoginCommand(
      { identifier: 'x', password: 'y' } as never,
    );

    await expect(handler.execute(command)).rejects.toThrow('Auth failed');
  });
});
