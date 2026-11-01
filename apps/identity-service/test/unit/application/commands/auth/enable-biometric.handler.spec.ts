import { describe, it, expect, beforeEach } from '@jest/globals';
import { EnableBiometricHandler } from '@application/commands/auth/enable-biometric.handler.js';
import { EnableBiometricCommand } from '@application/commands/auth/enable-biometric.command.js';
import { makeAuthBiometricServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('EnableBiometricHandler', () => {
  let handler: EnableBiometricHandler;
  let biometricService: ReturnType<typeof makeAuthBiometricServiceMock>;

  beforeEach(() => {
    biometricService = makeAuthBiometricServiceMock();
    biometricService.enable.mockResolvedValue({ success: true, enabled: true } as never);
    handler = new EnableBiometricHandler(biometricService as never);
  });

  it('commandType = auth.enable-biometric', () => {
    expect(handler.commandType).toBe('auth.enable-biometric');
  });

  it('should call biometricService.enable', async () => {
    const cmd = new EnableBiometricCommand(TEST_IDS.AUTH_ID, {
      type: 'fingerprint', publicKeyHash: 'x'.repeat(40), deviceId: TEST_IDS.DEVICE_ID,
    } as never);
    const result = await handler.execute(cmd);
    expect(result.success).toBe(true);
    expect(biometricService.enable).toHaveBeenCalled();
  });
});
