import { describe, it, expect, beforeEach } from '@jest/globals';
import { SetupMfaHandler } from '@application/commands/auth/setup-mfa.handler.js';
import { SetupMfaCommand } from '@application/commands/auth/setup-mfa.command.js';
import { makeAuthMfaServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('SetupMfaHandler', () => {
  let handler: SetupMfaHandler;
  let mfaService: ReturnType<typeof makeAuthMfaServiceMock>;

  beforeEach(() => {
    mfaService = makeAuthMfaServiceMock();
    mfaService.setup.mockResolvedValue({
      success: true, secret: 'SEC', qrCodeUrl: 'otpauth://x', otpauthUrl: 'otpauth://x', backupCodes: [],
    } as never);
    handler = new SetupMfaHandler(mfaService as never);
  });

  it('commandType = auth.setup-mfa', () => {
    expect(handler.commandType).toBe('auth.setup-mfa');
  });

  it('should call mfaService.setup with authId', async () => {
    const cmd = new SetupMfaCommand(TEST_IDS.AUTH_ID, { method: 'totp' } as never);
    const result = await handler.execute(cmd);
    expect(result.secret).toBe('SEC');
    expect(mfaService.setup).toHaveBeenCalledWith(TEST_IDS.AUTH_ID);
  });
});
