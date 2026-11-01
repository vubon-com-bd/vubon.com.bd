import { describe, it, expect, beforeEach } from '@jest/globals';
import { ResendVerificationHandler } from '@application/commands/auth/resend-verification.handler.js';
import { ResendVerificationCommand } from '@application/commands/auth/resend-verification.command.js';
import { TEST_EMAIL } from '@fixtures/index.js';

describe('ResendVerificationHandler', () => {
  let handler: ResendVerificationHandler;
  beforeEach(() => { handler = new ResendVerificationHandler(); });

  it('commandType = auth.resend-verification', () => {
    expect(handler.commandType).toBe('auth.resend-verification');
  });

  it('should send message', async () => {
    const cmd = new ResendVerificationCommand({ email: TEST_EMAIL } as never);
    const result = await handler.execute(cmd);
    expect(result.success).toBe(true);
  });
});
