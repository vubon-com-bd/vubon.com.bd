/**
 * AuthAccountLockCacheRepository — Unit Tests
 * @module auth-service/infrastructure/persistence/cache/repositories
 */
import { AuthAccountLockCacheRepository } from './auth-account-lock.cache.repository';
import { AuthAccountLockEntity } from '../../../../domain/entities/auth-account-lock.entity';
import { AccountLockReasonVO } from '../../../../domain/value-objects/primitives/account-lock-reason.vo';
import { AccountLockDurationVO } from '../../../../domain/value-objects/primitives/account-lock-duration.vo';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildLock = () =>
  AuthAccountLockEntity.create({
    id: 'lock-1',
    userId: 'user-1' as never,
    reason: AccountLockReasonVO.of('too_many_attempts'),
    lockedAt: NOW_MS,
    duration: AccountLockDurationVO.ofHours(1),
    createdAt: NOW,
    updatedAt: NOW,
  });

const mockRedis = () => {
  const store: Record<string, unknown> = {};
  return {
    get: jest.fn(async (key: string) => store[key] ?? null),
    set: jest.fn(async (key: string, value: unknown) => {
      store[key] = value;
    }),
    del: jest.fn(async (key: string) => {
      delete store[key];
    }),
  };
};

describe('AuthAccountLockCacheRepository', () => {
  let repo: AuthAccountLockCacheRepository;
  let redis: ReturnType<typeof mockRedis>;

  beforeEach(() => {
    redis = mockRedis();
    repo = new AuthAccountLockCacheRepository(redis as never);
  });

  it('should round-trip via id', async () => {
    const l = buildLock();
    await repo.save(l);
    const found = await repo.findById('lock-1');
    expect(found?.id).toBe('lock-1');
    expect(found?.reason.value).toBe('too_many_attempts');
  });

  it('should round-trip via userId', async () => {
    const l = buildLock();
    await repo.save(l);
    const found = await repo.findByUserId('user-1' as never);
    expect(found?.id).toBe('lock-1');
  });

  it('should return null for missing', async () => {
    expect(await repo.findById('missing')).toBeNull();
    expect(await repo.findByUserId('missing' as never)).toBeNull();
  });

  it('should delete both indexes', async () => {
    const l = buildLock();
    await repo.save(l);
    await repo.delete('lock-1');
    expect(await repo.findById('lock-1')).toBeNull();
    expect(await repo.findByUserId('user-1' as never)).toBeNull();
  });

  it('should handle permanent lock (no duration)', async () => {
    const l = AuthAccountLockEntity.create({
      id: 'lock-1',
      userId: 'user-1' as never,
      reason: AccountLockReasonVO.of('admin_action'),
      lockedAt: NOW_MS,
      createdAt: NOW,
      updatedAt: NOW,
    });
    await repo.save(l);
    const found = await repo.findById('lock-1');
    expect(found?.isPermanent()).toBe(true);
  });
});
