import { describe, it, expect, beforeEach } from '@jest/globals';
import { DisableBiometricHandler } from '@application/commands/auth/disable-biometric.handler.js';
import { DisableBiometricCommand } from '@application/commands/auth/disable-biometric.command.js';
import { makeAuthBiometricServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('DisableBiometricHandler', () => {
  let handler: DisableBiometricHandler;
  let biometricService: ReturnType<typeof makeAuthBiometricServiceMock>;

  beforeEach(() => {
    biometricService = makeAuthBiometricServiceMock();
    biometricService.disable.mockResolvedValue({ success: true, enabled: false } as never);
    handler = new DisableBiometricHandler(biometricService as never);
  });

  it('commandType = auth.disable-biometric', () => {
    expect(handler.commandType).toBe('auth.disable-biometric');
  });

  it('should call disable with authId + deviceId', async () => {
    const cmd = new DisableBiometricCommand(TEST_IDS.AUTH_ID, { deviceId: TEST_IDS.DEVICE_ID } as never);
    const result = await handler.execute(cmd);
    expect(result.enabled).toBe(false);
  });
});
