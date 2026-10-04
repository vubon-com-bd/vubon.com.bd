import { jest } from '@jest/globals';

import { UserPreferencesCacheRepository } from '@infrastructure/persistence/cache/repositories/user-preferences.cache.repository';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';

describe('UserPreferencesCacheRepository (mocked)', () => {
  let repo: UserPreferencesCacheRepository;
  let redis: { get: jest.Mock; set: jest.Mock; del: jest.Mock; exists: jest.Mock };

  beforeEach(() => {
    redis = {
      get: jest.fn().mockResolvedValue(null),
      set: jest.fn().mockResolvedValue(undefined),
      del: jest.fn().mockResolvedValue(undefined),
      exists: jest.fn().mockResolvedValue(false),
    };
    repo = new UserPreferencesCacheRepository(redis as never);
  });

  it('get returns null on miss', async () => {
    expect(await repo.get(UserIdVO.create('user-1'))).toBeNull();
  });

  it('get deserializes cached entries', async () => {
    redis.get.mockResolvedValue({
      userId: 'user-1',
      entries: [{ key: 'newsletter', value: 'true' }],
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    });
    const r = await repo.get(UserIdVO.create('user-1'));
    expect(r).not.toBeNull();
  });

  it('invalidate works', async () => {
    await repo.invalidate(UserIdVO.create('user-1'));
    expect(redis.del).toHaveBeenCalled();
  });
});
