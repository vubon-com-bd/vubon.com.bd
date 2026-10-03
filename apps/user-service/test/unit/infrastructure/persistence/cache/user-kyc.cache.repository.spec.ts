import { jest } from '@jest/globals';

import { UserKycCacheRepository } from '@infrastructure/persistence/cache/repositories/user-kyc.cache.repository';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';

describe('UserKycCacheRepository (mocked)', () => {
  let repo: UserKycCacheRepository;
  let redis: { get: jest.Mock; set: jest.Mock; del: jest.Mock; exists: jest.Mock };

  beforeEach(() => {
    redis = {
      get: jest.fn().mockResolvedValue(null),
      set: jest.fn().mockResolvedValue(undefined),
      del: jest.fn().mockResolvedValue(undefined),
      exists: jest.fn().mockResolvedValue(false),
    };
    repo = new UserKycCacheRepository(redis as never);
  });

  it('get returns null on miss', async () => {
    expect(await repo.get(UserIdVO.create('user-1'))).toBeNull();
  });

  it('get maps kyc row', async () => {
    redis.get.mockResolvedValue({
      id: 'kyc-1',
      userId: 'user-1',
      document: 'nid',
      status: 'pending',
      submittedAtMs: Date.now(),
      verifiedAtMs: null,
      rejectionReason: null,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    });
    const r = await repo.get(UserIdVO.create('user-1'));
    expect(r).not.toBeNull();
    expect(r!.status.value).toBe('pending');
  });

  it('invalidate works', async () => {
    await repo.invalidate(UserIdVO.create('user-1'));
    expect(redis.del).toHaveBeenCalled();
  });
});
