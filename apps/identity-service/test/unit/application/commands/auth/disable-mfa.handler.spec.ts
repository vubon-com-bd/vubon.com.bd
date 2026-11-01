import { describe, it, expect, beforeEach } from '@jest/globals';
import { DisableMfaHandler } from '@application/commands/auth/disable-mfa.handler.js';
import { makeDisableMfaCommand, makeAuthMfaServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('DisableMfaHandler', () => {
  let handler: DisableMfaHandler;
  let mfaService: ReturnType<typeof makeAuthMfaServiceMock>;

  beforeEach(() => {
    mfaService = makeAuthMfaServiceMock();
    mfaService.disable.mockResolvedValue({ success: true, enabled: false } as never);
    handler = new DisableMfaHandler(mfaService as never);
  });

  it('commandType = auth.disable-mfa', () => {
    expect(handler.commandType).toBe('auth.disable-mfa');
  });

  it('should call mfaService.disable with authId', async () => {
    const cmd = makeDisableMfaCommand();
    const result = await handler.execute(cmd);
    expect(result.enabled).toBe(false);
    expect(mfaService.disable).toHaveBeenCalledWith(TEST_IDS.AUTH_ID);
  });
});
