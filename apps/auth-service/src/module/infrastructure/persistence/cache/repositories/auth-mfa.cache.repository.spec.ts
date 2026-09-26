/**
 * AuthMfaCacheRepository — Unit Tests
 * @module auth-service/infrastructure/persistence/cache/repositories
 */
import { AuthMfaCacheRepository } from './auth-mfa.cache.repository';
import { AuthMfaEntity } from '../../../../domain/entities/auth-mfa.entity';
import { MfaTypeVO } from '../../../../domain/value-objects/primitives/mfa-type.vo';
import { MfaStatusVO } from '../../../../domain/value-objects/primitives/mfa-status.vo';
import { MfaSecretVO } from '../../../../domain/value-objects/primitives/mfa-secret.vo';

const NOW = '2024-01-01T00:00:00.000Z';

const buildMfa = () =>
  AuthMfaEntity.create({
    id: 'mfa-1',
    userId: 'user-1' as never,
    type: MfaTypeVO.of('totp'),
    status: MfaStatusVO.enabled(),
    secret: MfaSecretVO.of('JBSWY3DPEHPK3PXP'),
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

describe('AuthMfaCacheRepository', () => {
  let repo: AuthMfaCacheRepository;
  let redis: ReturnType<typeof mockRedis>;

  beforeEach(() => {
    redis = mockRedis();
    repo = new AuthMfaCacheRepository(redis as never);
  });

  it('should round-trip via id', async () => {
    const m = buildMfa();
    await repo.save(m);
    const found = await repo.findById('mfa-1');
    expect(found?.id).toBe('mfa-1');
    expect(found?.type.value).toBe('totp');
    expect(found?.isEnabled()).toBe(true);
  });

  it('should round-trip via userId', async () => {
    const m = buildMfa();
    await repo.save(m);
    const found = await repo.findByUserId('user-1' as never);
    expect(found?.id).toBe('mfa-1');
  });

  it('should return null for missing', async () => {
    expect(await repo.findById('missing')).toBeNull();
    expect(await repo.findByUserId('missing' as never)).toBeNull();
  });

  it('should delete both indexes', async () => {
    const m = buildMfa();
    await repo.save(m);
    await repo.delete('mfa-1');
    expect(await repo.findById('mfa-1')).toBeNull();
    expect(await repo.findByUserId('user-1' as never)).toBeNull();
  });
});
