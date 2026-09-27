import { jest } from '@jest/globals';

import { UserProfileCacheRepository } from '@infrastructure/persistence/cache/repositories/user-profile.cache.repository';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';

describe('UserProfileCacheRepository (mocked)', () => {
  let repo: UserProfileCacheRepository;
  let redis: { get: jest.Mock; set: jest.Mock; del: jest.Mock; exists: jest.Mock };

  beforeEach(() => {
    redis = {
      get: jest.fn().mockResolvedValue(null),
      set: jest.fn().mockResolvedValue(undefined),
      del: jest.fn().mockResolvedValue(undefined),
      exists: jest.fn().mockResolvedValue(false),
    };
    repo = new UserProfileCacheRepository(redis as never);
  });

  it('get returns null on miss', async () => {
    expect(await repo.get(UserIdVO.create('user-1'))).toBeNull();
  });

  it('set stores with profile prefix', async () => {
    const entity = {
      id: 'p-1',
      userId: { value: 'user-1' },
      avatar: { value: '' },
      bio: { value: '' },
      visibility: { value: 'public' },
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    };
    await repo.set(entity as never);
    expect(redis.set).toHaveBeenCalled();
    expect(redis.set.mock.calls[0][0]).toContain('profile:');
  });

  it('invalidate deletes cache', async () => {
    await repo.invalidate(UserIdVO.create('user-1'));
    expect(redis.del).toHaveBeenCalled();
  });
});
