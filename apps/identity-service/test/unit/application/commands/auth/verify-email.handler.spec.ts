import { describe, it, expect, beforeEach } from '@jest/globals';
import { VerifyEmailHandler } from '@application/commands/auth/verify-email.handler.js';
import { VerifyEmailCommand } from '@application/commands/auth/verify-email.command.js';

describe('VerifyEmailHandler', () => {
  let handler: VerifyEmailHandler;
  beforeEach(() => { handler = new VerifyEmailHandler(); });

  it('commandType = auth.verify-email', () => {
    expect(handler.commandType).toBe('auth.verify-email');
  });

  it('should verify', async () => {
    const cmd = new VerifyEmailCommand({ token: 'token-xyz-12345678' } as never);
    const result = await handler.execute(cmd);
    expect(result.success).toBe(true);
    expect(result.verified).toBe(true);
  });
});
