/**
 * UserCacheRepository — Unit Tests
 * @module auth-service/infrastructure/persistence/cache/repositories
 */
import { UserCacheRepository } from './user.cache.repository';
import { UserEntity } from '../../../../domain/entities/user.entity';
import { UserEmailVO } from '../../../../domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '../../../../domain/value-objects/primitives/user-name.vo';
import { UserStatusVO } from '../../../../domain/value-objects/primitives/user-status.vo';
import { UserTypeVO } from '../../../../domain/value-objects/primitives/user-type.vo';
import { UserRoleVO } from '../../../../domain/value-objects/primitives/user-role.vo';

const NOW = '2024-01-01T00:00:00.000Z';

const buildUser = () =>
  UserEntity.create({
    id: 'user-1' as never,
    email: UserEmailVO.of('john@example.com'),
    passwordHash: '$2b$12$hash',
    name: UserNameVO.of('John Doe'),
    status: UserStatusVO.active(),
    type: UserTypeVO.of('customer'),
    roles: [UserRoleVO.customer()],
    emailVerified: true,
    phoneVerified: false,
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
    exists: jest.fn(async (key: string) => key in store),
  };
};

describe('UserCacheRepository', () => {
  let repo: UserCacheRepository;
  let redis: ReturnType<typeof mockRedis>;

  beforeEach(() => {
    redis = mockRedis();
    repo = new UserCacheRepository(redis as never);
  });

  describe('save() / findById()', () => {
    it('should round-trip a user', async () => {
      const user = buildUser();
      await repo.save(user);
      const found = await repo.findById('user-1' as never);
      expect(found).not.toBeNull();
      expect(found?.id).toBe('user-1');
      expect(found?.email.value).toBe('john@example.com');
    });

    it('should return null for missing user', async () => {
      const found = await repo.findById('missing' as never);
      expect(found).toBeNull();
    });
  });

  describe('delete()', () => {
    it('should delete cached user', async () => {
      await repo.save(buildUser());
      await repo.delete('user-1' as never);
      expect(await repo.findById('user-1' as never)).toBeNull();
    });
  });

  describe('exists()', () => {
    it('should return true after save', async () => {
      await repo.save(buildUser());
      expect(await repo.exists('user-1' as never)).toBe(true);
    });

    it('should return false for missing', async () => {
      expect(await repo.exists('missing' as never)).toBe(false);
    });
  });

  describe('findAll()', () => {
    it('should return empty (cache not listable)', async () => {
      const result = await repo.findAll();
      expect(result).toEqual([]);
    });
  });
});
