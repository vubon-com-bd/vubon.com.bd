/**
 * UserMapper — Unit Tests
 * @module auth-service/application/mappers
 */
import { UserMapper } from './user.mapper';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserEmailVO } from '../../domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '../../domain/value-objects/primitives/user-name.vo';
import { UserPhoneVO } from '../../domain/value-objects/primitives/user-phone.vo';
import { UserStatusVO } from '../../domain/value-objects/primitives/user-status.vo';
import { UserTypeVO } from '../../domain/value-objects/primitives/user-type.vo';
import { UserRoleVO } from '../../domain/value-objects/primitives/user-role.vo';

const NOW = '2024-01-01T00:00:00.000Z';

const buildUser = (overrides: Partial<Parameters<typeof UserEntity.create>[0]> = {}) =>
  UserEntity.create({
    id: 'user-1' as never,
    email: UserEmailVO.of('john@example.com'),
    passwordHash: '$2b$12$abcdefghijklmnopqrstuv',
    name: UserNameVO.of('John Doe'),
    phone: UserPhoneVO.of('+8801712345678'),
    status: UserStatusVO.active(),
    type: UserTypeVO.of('customer'),
    roles: [UserRoleVO.customer()],
    emailVerified: true,
    phoneVerified: false,
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

describe('UserMapper', () => {
  const mapper = new UserMapper();

  describe('toTarget()', () => {
    it('should map entity to DTO', () => {
      const dto = mapper.toTarget(buildUser());
      expect(dto.id).toBe('user-1');
      expect(dto.email).toBe('john@example.com');
      expect(dto.name).toBe('John Doe');
      expect(dto.phone).toBe('+8801712345678');
      expect(dto.status).toBe('active');
      expect(dto.type).toBe('customer');
    });

    it('should map roles to string array', () => {
      const user = buildUser({ roles: [UserRoleVO.customer(), UserRoleVO.of('admin')] });
      const dto = mapper.toTarget(user);
      expect(dto.roles).toEqual(expect.arrayContaining(['customer', 'admin']));
    });

    it('should handle missing phone', () => {
      const user = buildUser({ phone: undefined });
      const dto = mapper.toTarget(user);
      expect(dto.phone).toBeUndefined();
    });

    it('should map verification flags', () => {
      const user = buildUser({ emailVerified: true, phoneVerified: true });
      const dto = mapper.toTarget(user);
      expect(dto.emailVerified).toBe(true);
      expect(dto.phoneVerified).toBe(true);
    });

    it('should set mfaEnabled to false', () => {
      const dto = mapper.toTarget(buildUser());
      expect(dto.mfaEnabled).toBe(false);
    });

    it('should preserve createdAt/updatedAt', () => {
      const dto = mapper.toTarget(buildUser());
      expect(dto.createdAt).toBe(NOW);
      expect(dto.updatedAt).toBe(NOW);
    });

    it('should NOT expose passwordHash', () => {
      const dto = mapper.toTarget(buildUser());
      expect(JSON.stringify(dto)).not.toContain('$2b$12$');
    });
  });

  describe('toSource()', () => {
    it('should throw (not implemented)', () => {
      expect(() =>
        mapper.toSource({
          id: 'x', email: 'x', name: 'x', status: 'active', type: 'customer',
          roles: [], emailVerified: false, phoneVerified: false,
          mfaEnabled: false, createdAt: NOW, updatedAt: NOW,
        } as never),
      ).toThrow();
    });
  });
});
