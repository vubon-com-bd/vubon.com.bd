import { describe, it, expect, beforeEach } from '@jest/globals';
import { VerifyMfaHandler } from '@application/commands/auth/verify-mfa.handler.js';
import { makeVerifyMfaCommand, makeAuthMfaServiceMock } from '@fixtures/index.js';

describe('VerifyMfaHandler', () => {
  let handler: VerifyMfaHandler;
  let mfaService: ReturnType<typeof makeAuthMfaServiceMock>;

  beforeEach(() => {
    mfaService = makeAuthMfaServiceMock();
    mfaService.verify.mockResolvedValue({ success: true, enabled: true } as never);
    handler = new VerifyMfaHandler(mfaService as never);
  });

  it('commandType = auth.verify-mfa', () => {
    expect(handler.commandType).toBe('auth.verify-mfa');
  });

  it('should delegate to service', async () => {
    const cmd = makeVerifyMfaCommand();
    const result = await handler.execute(cmd);
    expect(result.success).toBe(true);
    expect(mfaService.verify).toHaveBeenCalled();
  });
});
