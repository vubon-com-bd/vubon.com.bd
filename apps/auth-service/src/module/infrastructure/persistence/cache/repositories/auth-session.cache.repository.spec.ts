/**
 * AuthSessionCacheRepository — Unit Tests
 * @module auth-service/infrastructure/persistence/cache/repositories
 */
import { AuthSessionCacheRepository } from './auth-session.cache.repository';
import { AuthSessionEntity } from '../../../../domain/entities/auth-session.entity';
import { SessionTokenVO } from '../../../../domain/value-objects/primitives/session-token.vo';
import { SessionExpiryVO } from '../../../../domain/value-objects/primitives/session-expiry.vo';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildSession = () =>
  AuthSessionEntity.create({
    id: 'sess-1',
    userId: 'user-1' as never,
    token: SessionTokenVO.of('a'.repeat(32)),
    expiry: SessionExpiryVO.fromEpoch(NOW_MS + 3_600_000),
    ipAddress: '192.168.1.1',
    userAgent: 'agent',
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

describe('AuthSessionCacheRepository', () => {
  let repo: AuthSessionCacheRepository;
  let redis: ReturnType<typeof mockRedis>;

  beforeEach(() => {
    redis = mockRedis();
    repo = new AuthSessionCacheRepository(redis as never);
  });

  it('should round-trip via id', async () => {
    const s = buildSession();
    await repo.save(s);
    const found = await repo.findById('sess-1');
    expect(found?.id).toBe('sess-1');
  });

  it('should round-trip via token', async () => {
    const s = buildSession();
    await repo.save(s);
    const found = await repo.findByToken(s.token.value);
    expect(found?.id).toBe('sess-1');
  });

  it('should return null for missing id', async () => {
    expect(await repo.findById('missing')).toBeNull();
  });

  it('should return null for missing token', async () => {
    expect(await repo.findByToken('missing-token')).toBeNull();
  });

  it('should delete both id and token keys', async () => {
    const s = buildSession();
    await repo.save(s);
    await repo.delete('sess-1');
    expect(await repo.findById('sess-1')).toBeNull();
    expect(await repo.findByToken(s.token.value)).toBeNull();
  });

  it('findAll returns empty array', async () => {
    expect(await repo.findAll()).toEqual([]);
  });
});
