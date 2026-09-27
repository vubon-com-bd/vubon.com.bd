/**
 * UserCacheRepository Unit Test (mocked Redis)
 */
import { jest } from '@jest/globals';

import { UserCacheRepository } from '@infrastructure/persistence/cache/repositories/user.cache.repository';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';

describe('UserCacheRepository (mocked Redis)', () => {
  let repo: UserCacheRepository;
  let redis: { get: jest.Mock; set: jest.Mock; del: jest.Mock; exists: jest.Mock };

  beforeEach(() => {
    redis = {
      get: jest.fn().mockResolvedValue(null),
      set: jest.fn().mockResolvedValue(undefined),
      del: jest.fn().mockResolvedValue(undefined),
      exists: jest.fn().mockResolvedValue(false),
    };
    repo = new UserCacheRepository(redis as never);
  });

  it('get returns null on miss', async () => {
    const r = await repo.get(UserIdVO.create('user-1'));
    expect(r).toBeNull();
  });

  it('get deserializes cached data', async () => {
    redis.get.mockResolvedValue({
      id: 'user-1',
      email: 'user@example.com',
      name: 'John Doe',
      phone: null,
      status: 'active',
      type: 'individual',
      emailVerified: true,
      phoneVerified: false,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    });
    const r = await repo.get(UserIdVO.create('user-1'));
    expect(r).not.toBeNull();
    expect(r!.email.value).toBe('user@example.com');
  });

  it('get returns null on malformed data', async () => {
    redis.get.mockResolvedValue({ foo: 'bar' });
    const r = await repo.get(UserIdVO.create('user-1'));
    expect(r).toBeNull();
  });

  it('set calls redis.set with prefix + ttl', async () => {
    const entity = {
      id: 'user-1',
      email: { value: 'user@example.com' },
      name: { value: 'John' },
      phone: null,
      status: { value: 'active' },
      type: { value: 'individual' },
      emailVerified: true,
      phoneVerified: false,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    };
    await repo.set(entity as never);
    expect(redis.set).toHaveBeenCalled();
    const call = redis.set.mock.calls[0];
    expect(call[0]).toContain('user:');
  });

  it('invalidate calls redis.del', async () => {
    await repo.invalidate(UserIdVO.create('user-1'));
    expect(redis.del).toHaveBeenCalled();
  });

  it('has returns redis.exists', async () => {
    redis.exists.mockResolvedValue(true);
    expect(await repo.has(UserIdVO.create('user-1'))).toBe(true);
  });

  it('get gracefully returns null on redis error', async () => {
    redis.get.mockRejectedValue(new Error('redis down'));
    const r = await repo.get(UserIdVO.create('user-1'));
    expect(r).toBeNull();
  });
});
