import { describe, it, expect, beforeEach } from '@jest/globals';
import { EnableMfaHandler } from '@application/commands/auth/enable-mfa.handler.js';
import { makeEnableMfaCommand, makeAuthMfaServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('EnableMfaHandler', () => {
  let handler: EnableMfaHandler;
  let mfaService: ReturnType<typeof makeAuthMfaServiceMock>;

  beforeEach(() => {
    mfaService = makeAuthMfaServiceMock();
    mfaService.enable.mockResolvedValue({ success: true, enabled: true } as never);
    handler = new EnableMfaHandler(mfaService as never);
  });

  it('commandType = auth.enable-mfa', () => {
    expect(handler.commandType).toBe('auth.enable-mfa');
  });

  it('should call mfaService.enable', async () => {
    const cmd = makeEnableMfaCommand();
    const result = await handler.execute(cmd);
    expect(result.enabled).toBe(true);
    expect(mfaService.enable).toHaveBeenCalled();
  });
});
