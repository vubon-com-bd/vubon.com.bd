/**
 * E2E — MFA Flow
 * @module identity-service/test/e2e/application
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { SetupMfaHandler } from '@application/commands/auth/setup-mfa.handler.js';
import { EnableMfaHandler } from '@application/commands/auth/enable-mfa.handler.js';
import { VerifyMfaHandler } from '@application/commands/auth/verify-mfa.handler.js';
import { DisableMfaHandler } from '@application/commands/auth/disable-mfa.handler.js';
import { SetupMfaCommand } from '@application/commands/auth/setup-mfa.command.js';
import {
  makeEnableMfaCommand, makeDisableMfaCommand, makeVerifyMfaCommand,
  makeAuthMfaServiceMock, TEST_IDS,
} from '@fixtures/index.js';

describe('E2E — MFA Flow', () => {
  let mfaService: ReturnType<typeof makeAuthMfaServiceMock>;
  let setupHandler: SetupMfaHandler;
  let enableHandler: EnableMfaHandler;
  let verifyHandler: VerifyMfaHandler;
  let disableHandler: DisableMfaHandler;

  beforeEach(() => {
    mfaService = makeAuthMfaServiceMock();
    mfaService.setup.mockResolvedValue({
      success: true, secret: 'SEC', qrCodeUrl: 'otpauth://x',
      otpauthUrl: 'otpauth://x', backupCodes: ['A', 'B'],
    } as never);
    mfaService.enable.mockResolvedValue({ success: true, enabled: true } as never);
    mfaService.verify.mockResolvedValue({ success: true, enabled: true } as never);
    mfaService.disable.mockResolvedValue({ success: true, enabled: false } as never);

    setupHandler = new SetupMfaHandler(mfaService as never);
    enableHandler = new EnableMfaHandler(mfaService as never);
    verifyHandler = new VerifyMfaHandler(mfaService as never);
    disableHandler = new DisableMfaHandler(mfaService as never);
  });

  it('full flow: setup → enable → verify → disable', async () => {
    const setup = await setupHandler.execute(new SetupMfaCommand(TEST_IDS.AUTH_ID, { method: 'totp' } as never));
    expect(setup.secret).toBe('SEC');
    expect(setup.backupCodes.length).toBe(2);

    const enabled = await enableHandler.execute(makeEnableMfaCommand());
    expect(enabled.enabled).toBe(true);

    const verified = await verifyHandler.execute(makeVerifyMfaCommand());
    expect(verified.success).toBe(true);

    const disabled = await disableHandler.execute(makeDisableMfaCommand());
    expect(disabled.enabled).toBe(false);
  });
});
