/**
 * RegisterHandler — Unit Tests
 * @module auth-service/application/commands/auth
 */
import { RegisterHandler } from './register.handler';
import { RegisterCommand } from './register.command';

const mockAuthService = () => ({
  name: 'AuthService',
  register: jest.fn(),
});

describe('RegisterHandler', () => {
  let handler: RegisterHandler;
  let authService: ReturnType<typeof mockAuthService>;

  beforeEach(() => {
    authService = mockAuthService();
    handler = new RegisterHandler(authService as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('RegisterCommand');
  });

  it('should delegate to service', async () => {
    const mockResult = { user: {}, verificationSent: true, nextStep: 'verify_email' };
    authService.register.mockResolvedValue(mockResult);

    const command = new RegisterCommand({
      email: 'new@example.com',
      password: 'Str0ng!Pass#2024',
      confirmPassword: 'Str0ng!Pass#2024',
      acceptTerms: true,
    } as never);

    const result = await handler.execute(command);

    expect(authService.register).toHaveBeenCalledWith(command.input, command.ctx);
    expect(result).toEqual(mockResult);
  });

  it('should propagate errors', async () => {
    authService.register.mockRejectedValue(new Error('Email exists'));
    const command = new RegisterCommand({} as never);

    await expect(handler.execute(command)).rejects.toThrow('Email exists');
  });
});
