/**
 * VerifyEmailHandler — Unit Tests
 */
import { jest } from '@jest/globals';

import { VerifyEmailHandler } from './verify-email.handler.js';
import { VerifyEmailCommand } from './verify-email.command.js';

const mockAuthService = () => ({
  name: 'AuthService',
  verifyEmail: jest.fn() as jest.Mock,
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
