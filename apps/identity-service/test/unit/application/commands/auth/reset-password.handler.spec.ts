import { describe, it, expect, beforeEach } from '@jest/globals';
import { ResetPasswordHandler } from '@application/commands/auth/reset-password.handler.js';
import { ResetPasswordCommand } from '@application/commands/auth/reset-password.command.js';
import { makeResetPasswordDTO } from '@fixtures/index.js';

describe('ResetPasswordHandler', () => {
  let handler: ResetPasswordHandler;
  beforeEach(() => { handler = new ResetPasswordHandler(); });

  it('commandType = auth.reset-password', () => {
    expect(handler.commandType).toBe('auth.reset-password');
  });

  it('should return success', async () => {
    const cmd = new ResetPasswordCommand(makeResetPasswordDTO());
    const result = await handler.execute(cmd);
    expect(result.success).toBe(true);
  });
});
