import { describe, it, expect, beforeEach } from '@jest/globals';
import { AuthBiometricService } from '@application/services/impl/auth-biometric.service.js';
import { makeAuthBiometricRepositoryMock, TEST_IDS } from '@fixtures/index.js';

describe('AuthBiometricService', () => {
  let service: AuthBiometricService;
  let repo: ReturnType<typeof makeAuthBiometricRepositoryMock>;

  beforeEach(() => {
    repo = makeAuthBiometricRepositoryMock();
    service = new AuthBiometricService(repo as never);
  });

  it('name', () => expect(service.name).toBe('AuthBiometricService'));

  it('enable() should return DTO', async () => {
    const result = await service.enable(TEST_IDS.AUTH_ID, {
      type: 'fingerprint', publicKeyHash: 'x'.repeat(40), deviceId: TEST_IDS.DEVICE_ID,
    } as never);
    expect(result.success).toBe(true);
    expect(result.enabled).toBe(true);
  });

  it('disable() should return enabled false', async () => {
    const result = await service.disable(TEST_IDS.AUTH_ID, TEST_IDS.DEVICE_ID);
    expect(result.enabled).toBe(false);
  });

  it('listForAuth() should return empty', async () => {
    repo.findByAuthIdRaw.mockResolvedValue([]);
    expect(await service.listForAuth(TEST_IDS.AUTH_ID)).toEqual([]);
  });
});
