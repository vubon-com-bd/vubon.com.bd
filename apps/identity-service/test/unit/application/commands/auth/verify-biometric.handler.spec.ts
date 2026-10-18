import { describe, it, expect, beforeEach } from '@jest/globals';
import { VerifyBiometricHandler } from '@application/commands/auth/verify-biometric.handler.js';
import { VerifyBiometricCommand } from '@application/commands/auth/verify-biometric.command.js';
import { makeAuthBiometricServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('VerifyBiometricHandler', () => {
  let handler: VerifyBiometricHandler;
  let biometricService: ReturnType<typeof makeAuthBiometricServiceMock>;

  beforeEach(() => {
    biometricService = makeAuthBiometricServiceMock();
    biometricService.verify.mockResolvedValue(true);
    handler = new VerifyBiometricHandler(biometricService as never);
  });

  it('commandType = auth.verify-biometric', () => {
    expect(handler.commandType).toBe('auth.verify-biometric');
  });

  it('should return verified status', async () => {
    const cmd = new VerifyBiometricCommand(TEST_IDS.AUTH_ID, {
      deviceId: TEST_IDS.DEVICE_ID, challengeResponse: 'x'.repeat(32),
    } as never);
    const result = await handler.execute(cmd);
    expect(result.success).toBe(true);
    expect(result.verified).toBe(true);
  });
});
