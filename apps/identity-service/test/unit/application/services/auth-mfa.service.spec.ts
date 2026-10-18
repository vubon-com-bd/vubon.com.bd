import { describe, it, expect, beforeEach } from '@jest/globals';
import { AuthMfaService } from '@application/services/impl/auth-mfa.service.js';
import { makeMfaRepositoryMock, TEST_IDS } from '@fixtures/index.js';

describe('AuthMfaService', () => {
  let service: AuthMfaService;
  let repo: ReturnType<typeof makeMfaRepositoryMock>;

  beforeEach(() => {
    repo = makeMfaRepositoryMock();
    service = new AuthMfaService(repo as never);
  });

  it('name', () => expect(service.name).toBe('AuthMfaService'));

  it('setup() should return secret + qrCode', async () => {
    const result = await service.setup(TEST_IDS.AUTH_ID);
    expect(result.secret).toBeDefined();
    expect(result.qrCodeUrl).toBeDefined();
    expect(result.backupCodes).toEqual([]);
  });

  it('enable() should return success', async () => {
    const result = await service.enable({ method: 'totp', secret: 'x' } as never);
    expect(result.success).toBe(true);
    expect(result.enabled).toBe(true);
  });

  it('disable() should return disabled', async () => {
    const result = await service.disable(TEST_IDS.AUTH_ID);
    expect(result.enabled).toBe(false);
  });

  it('challenge() should return challengeId + methods', async () => {
    const result = await service.challenge(TEST_IDS.AUTH_ID);
    expect(result.challengeId).toBeDefined();
    expect(result.mfaMethods).toContain('totp');
  });

  it('verify() should return success', async () => {
    const result = await service.verify({ code: '123456', challengeId: 'x', method: 'totp', userId: TEST_IDS.USER_ID } as never);
    expect(result.success).toBe(true);
  });
});
