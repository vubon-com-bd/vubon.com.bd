import { describe, it, expect, beforeEach } from '@jest/globals';
import { AuthDeviceService } from '@application/services/impl/auth-device.service.js';
import { makeDeviceRepositoryMock, makeDeviceEntity, TEST_IDS, TEST_FINGERPRINT } from '@fixtures/index.js';

describe('AuthDeviceService', () => {
  let service: AuthDeviceService;
  let repo: ReturnType<typeof makeDeviceRepositoryMock>;

  beforeEach(() => {
    repo = makeDeviceRepositoryMock();
    repo.save.mockImplementation(async (e: unknown) => e as never);
    service = new AuthDeviceService(repo as never);
  });

  it('name', () => expect(service.name).toBe('AuthDeviceService'));

  it('register() should return DTO', async () => {
    const result = await service.register({
      userId: TEST_IDS.USER_ID, type: 'desktop', fingerprint: TEST_FINGERPRINT,
    });
    expect(result.userId).toBe(TEST_IDS.USER_ID);
    expect(result.type).toBe('desktop');
  });

  it('findForUser() should return empty', async () => {
    repo.findByUserId.mockResolvedValue([]);
    expect(await service.findForUser(TEST_IDS.USER_ID)).toEqual([]);
  });

  it('isTrusted() should return false when no device', async () => {
    repo.findById.mockResolvedValue(null);
    expect(await service.isTrusted(TEST_IDS.DEVICE_ID)).toBe(false);
  });

  it('isTrusted() should return true when trust active', async () => {
    const device = makeDeviceEntity({ trusted: true, trustedUntil: new Date(Date.now() + 86400000).toISOString() });
    repo.findById.mockResolvedValue(device as never);
    expect(await service.isTrusted(TEST_IDS.DEVICE_ID)).toBe(true);
  });
});
