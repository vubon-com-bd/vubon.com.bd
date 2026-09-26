/**
 * AuthTokenCacheRepository — Unit Tests
 * @module auth-service/infrastructure/persistence/cache/repositories
 */
import { AuthTokenCacheRepository } from './auth-token.cache.repository';
import { AuthTokenEntity } from '../../../../domain/entities/auth-token.entity';
import { TokenValueVO } from '../../../../domain/value-objects/primitives/token-value.vo';
import { TokenTypeVO } from '../../../../domain/value-objects/primitives/token-type.vo';
import { TokenExpiryVO } from '../../../../domain/value-objects/primitives/token-expiry.vo';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildToken = () =>
  AuthTokenEntity.create({
    id: 'tok-1',
    subjectId: 'user-1',
    value: TokenValueVO.of('a'.repeat(64)),
    type: TokenTypeVO.of('access'),
    expiry: TokenExpiryVO.fromEpoch(NOW_MS + 900_000),
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

describe('AuthTokenCacheRepository', () => {
  let repo: AuthTokenCacheRepository;
  let redis: ReturnType<typeof mockRedis>;

  beforeEach(() => {
    redis = mockRedis();
    repo = new AuthTokenCacheRepository(redis as never);
  });

  it('should round-trip via id', async () => {
    const t = buildToken();
    await repo.save(t);
    const found = await repo.findById('tok-1');
    expect(found?.id).toBe('tok-1');
    expect(found?.subjectId).toBe('user-1');
  });

  it('should round-trip via token value', async () => {
    const t = buildToken();
    await repo.save(t);
    const found = await repo.findByValue(t.value.value);
    expect(found?.id).toBe('tok-1');
  });

  it('should return null for missing', async () => {
    expect(await repo.findById('missing')).toBeNull();
    expect(await repo.findByValue('missing')).toBeNull();
  });

  it('should delete both indexes', async () => {
    const t = buildToken();
    await repo.save(t);
    await repo.delete('tok-1');
    expect(await repo.findById('tok-1')).toBeNull();
    expect(await repo.findByValue(t.value.value)).toBeNull();
  });
});
