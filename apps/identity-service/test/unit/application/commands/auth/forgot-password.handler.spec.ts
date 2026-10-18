import { describe, it, expect, beforeEach } from '@jest/globals';
import { ForgotPasswordHandler } from '@application/commands/auth/forgot-password.handler.js';
import { ForgotPasswordCommand } from '@application/commands/auth/forgot-password.command.js';
import { makeAuthRepositoryMock, TEST_EMAIL } from '@fixtures/index.js';

describe('ForgotPasswordHandler', () => {
  let handler: ForgotPasswordHandler;
  let authRepo: ReturnType<typeof makeAuthRepositoryMock>;

  beforeEach(() => {
    authRepo = makeAuthRepositoryMock();
    handler = new ForgotPasswordHandler(authRepo as never);
  });

  it('commandType = auth.forgot-password', () => {
    expect(handler.commandType).toBe('auth.forgot-password');
  });

  it('should return success message (no enum disclosure)', async () => {
    const cmd = new ForgotPasswordCommand({ email: TEST_EMAIL } as never);
    const result = await handler.execute(cmd);
    expect(result.success).toBe(true);
    expect(result.message).toMatch(/if.*email/i);
  });
});
