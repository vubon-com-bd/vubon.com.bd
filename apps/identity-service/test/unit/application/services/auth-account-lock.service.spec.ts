import { describe, it, expect, beforeEach } from '@jest/globals';
import { AuthAccountLockService } from '@application/services/impl/auth-account-lock.service.js';
import { makeAccountLockRepositoryMock, makeEventBridgeMock, activeAccountLock, TEST_IDS } from '@fixtures/index.js';

describe('AuthAccountLockService', () => {
  let service: AuthAccountLockService;
  let repo: ReturnType<typeof makeAccountLockRepositoryMock>;
  let eventBridge: ReturnType<typeof makeEventBridgeMock>;

  beforeEach(() => {
    repo = makeAccountLockRepositoryMock();
    eventBridge = makeEventBridgeMock();
    repo.save.mockImplementation(async (e: unknown) => e as never);
    eventBridge.publishFromEntity.mockResolvedValue(undefined);
    service = new AuthAccountLockService(repo as never, eventBridge as never);
  });

  it('name', () => expect(service.name).toBe('AuthAccountLockService'));

  it('getStatus() should return unlocked when none', async () => {
    repo.findActiveByAuthId.mockResolvedValue(null);
    const result = await service.getStatus(TEST_IDS.AUTH_ID);
    expect(result.isLocked).toBe(false);
  });

  it('getStatus() should return locked info', async () => {
    repo.findActiveByAuthId.mockResolvedValue(activeAccountLock() as never);
    const result = await service.getStatus(TEST_IDS.AUTH_ID);
    expect(result.isLocked).toBe(true);
    expect(result.remainingSeconds).toBeGreaterThanOrEqual(0);
  });

  it('lock() should return locked DTO', async () => {
    const result = await service.lock(TEST_IDS.AUTH_ID, 'manual_admin', 3600);
    expect(result.isLocked).toBe(true);
    expect(result.reason).toBe('manual_admin');
  });

  it('isLocked() should delegate', async () => {
    repo.findActiveByAuthId.mockResolvedValue(null);
    expect(await service.isLocked(TEST_IDS.AUTH_ID)).toBe(false);
  });
});
