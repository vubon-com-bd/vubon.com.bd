/**
 * UserEntity — Unit Tests (Aggregate Root)
 * @module auth-service/domain/entities
 */
import { UserEntity } from './user.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { UserEmailVO } from '../value-objects/primitives/user-email.vo';
import { UserNameVO } from '../value-objects/primitives/user-name.vo';
import { UserPhoneVO } from '../value-objects/primitives/user-phone.vo';
import { UserStatusVO } from '../value-objects/primitives/user-status.vo';
import { UserTypeVO } from '../value-objects/primitives/user-type.vo';
import { UserRoleVO } from '../value-objects/primitives/user-role.vo';
import { UserNotActiveError } from '../errors/user.errors';

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

describe('UserEntity (Aggregate Root)', () => {
  // ═══════════════════════════════════════════════════════════
  // Factories
  // ═══════════════════════════════════════════════════════════

  describe('create()', () => {
    it('should create a valid user', () => {
      const user = buildUser();
      expect(user.id).toBe('user-1');
      expect(user.email.value).toBe('john@example.com');
      expect(user.name.value).toBe('John Doe');
    });

    it('should accept user without phone', () => {
      const user = buildUser({ phone: undefined });
      expect(user.phone).toBeUndefined();
    });

    it('should accept user with no roles', () => {
      const user = buildUser({ roles: [] });
      expect(user.roles).toHaveLength(0);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // Getters
  // ═══════════════════════════════════════════════════════════

  describe('getters', () => {
    it('should expose email', () => {
      expect(buildUser().email.value).toBe('john@example.com');
    });

    it('should expose passwordHash', () => {
      expect(buildUser().passwordHash).toBe('$2b$12$abcdefghijklmnopqrstuv');
    });

    it('should expose name', () => {
      expect(buildUser().name.value).toBe('John Doe');
    });

    it('should expose phone when set', () => {
      expect(buildUser().phone?.value).toBe('+8801712345678');
    });

    it('should expose status', () => {
      expect(buildUser().status.value).toBe('active');
    });

    it('should expose type', () => {
      expect(buildUser().type.value).toBe('customer');
    });

    it('should expose roles as array copy (immutability)', () => {
      const user = buildUser();
      const roles = user.roles;
      expect(roles).toHaveLength(1);
      // Trying to mutate the returned array should not affect internal state
      (roles as unknown as unknown[]).push('hacked');
      expect(user.roles).toHaveLength(1);
    });

    it('should expose emailVerified', () => {
      expect(buildUser().emailVerified).toBe(true);
    });

    it('should expose phoneVerified', () => {
      expect(buildUser().phoneVerified).toBe(false);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // Business Rules
  // ═══════════════════════════════════════════════════════════

  describe('isActive()', () => {
    it('should return true for active user', () => {
      expect(buildUser().isActive()).toBe(true);
    });

    it('should return false for suspended user', () => {
      expect(buildUser({ status: UserStatusVO.of('suspended') }).isActive()).toBe(false);
    });

    it('should return false for pending user', () => {
      expect(buildUser({ status: UserStatusVO.of('pending') }).isActive()).toBe(false);
    });

    it('should return false for deleted user', () => {
      expect(buildUser({ status: UserStatusVO.of('deleted') }).isActive()).toBe(false);
    });
  });

  describe('canLogin()', () => {
    it('should return true for active user', () => {
      expect(buildUser().canLogin()).toBe(true);
    });

    it('should return false for inactive user', () => {
      expect(buildUser({ status: UserStatusVO.of('inactive') }).canLogin()).toBe(false);
    });
  });

  describe('assertCanLogin()', () => {
    it('should not throw for active user', () => {
      expect(() => buildUser().assertCanLogin()).not.toThrow();
    });

    it('should throw UserNotActiveError for suspended user', () => {
      const user = buildUser({ status: UserStatusVO.of('suspended') });
      expect(() => user.assertCanLogin()).toThrow(UserNotActiveError);
    });
  });

  describe('hasRole()', () => {
    it('should return true for assigned role', () => {
      expect(buildUser().hasRole(UserRoleVO.customer())).toBe(true);
    });

    it('should return false for unassigned role', () => {
      expect(buildUser().hasRole(UserRoleVO.of('admin'))).toBe(false);
    });
  });

  describe('isSuperAdmin()', () => {
    it('should return true for super_admin', () => {
      const user = buildUser({ roles: [UserRoleVO.superAdmin()] });
      expect(user.isSuperAdmin()).toBe(true);
    });

    it('should return false for customer', () => {
      expect(buildUser().isSuperAdmin()).toBe(false);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // Mutations
  // ═══════════════════════════════════════════════════════════

  describe('changeName()', () => {
    it('should update name', () => {
      const user = buildUser();
      user.changeName(UserNameVO.of('Jane Doe'));
      expect(user.name.value).toBe('Jane Doe');
    });

    it('should skip if name unchanged', () => {
      const user = buildUser();
      user.changeName(UserNameVO.of('John Doe'));
      // No event should be raised
      expect(user.pullEvents()).toHaveLength(0);
    });

    it('should record UserUpdatedEvent', () => {
      const user = buildUser();
      user.changeName(UserNameVO.of('Jane Doe'));
      const events = user.pullEvents();
      expect(events).toHaveLength(1);
      expect(events[0]?.type).toBe('UserUpdatedEvent');
    });
  });

  describe('changePhone()', () => {
    it('should update phone', () => {
      const user = buildUser();
      user.changePhone(UserPhoneVO.of('+8801812345678'));
      expect(user.phone?.value).toBe('+8801812345678');
    });

    it('should reset phoneVerified to false', () => {
      const user = buildUser({ phoneVerified: true });
      user.changePhone(UserPhoneVO.of('+8801812345678'));
      expect(user.phoneVerified).toBe(false);
    });

    it('should record UserUpdatedEvent', () => {
      const user = buildUser();
      user.changePhone(UserPhoneVO.of('+8801812345678'));
      const events = user.pullEvents();
      expect(events.some((e) => e.type === 'UserUpdatedEvent')).toBe(true);
    });
  });

  describe('changePasswordHash()', () => {
    it('should update password hash', () => {
      const user = buildUser();
      const newHash = '$2b$12$xyzxyzxyzxyzxyzxyzxyzxyz';
      user.changePasswordHash(newHash);
      expect(user.passwordHash).toBe(newHash);
    });

    it('should reject short hash', () => {
      const user = buildUser();
      expect(() => user.changePasswordHash('short')).toThrow('invalid');
    });

    it('should reject empty hash', () => {
      const user = buildUser();
      expect(() => user.changePasswordHash('')).toThrow('invalid');
    });

    it('should record UserPasswordChangedEvent', () => {
      const user = buildUser();
      user.changePasswordHash('$2b$12$abcdefghijklmnopqrstu');
      const events = user.pullEvents();
      expect(events.some((e) => e.type === 'UserPasswordChangedEvent')).toBe(true);
    });
  });

  describe('changeStatus()', () => {
    it('should allow active → suspended', () => {
      const user = buildUser();
      user.changeStatus(UserStatusVO.of('suspended'));
      expect(user.status.value).toBe('suspended');
    });

    it('should reject pending → suspended (invalid transition)', () => {
      const user = buildUser({ status: UserStatusVO.of('pending') });
      expect(() => user.changeStatus(UserStatusVO.of('suspended'))).toThrow('Invalid status transition');
    });

    it('should reject deleted → active', () => {
      const user = buildUser({ status: UserStatusVO.of('deleted') });
      expect(() => user.changeStatus(UserStatusVO.active())).toThrow('Invalid status transition');
    });

    it('should record UserStatusChangedEvent', () => {
      const user = buildUser();
      user.changeStatus(UserStatusVO.of('suspended'));
      const events = user.pullEvents();
      expect(events.some((e) => e.type === 'UserStatusChangedEvent')).toBe(true);
    });
  });

  describe('markEmailVerified()', () => {
    it('should set emailVerified to true', () => {
      const user = buildUser({ emailVerified: false });
      user.markEmailVerified();
      expect(user.emailVerified).toBe(true);
    });

    it('should be idempotent', () => {
      const user = buildUser({ emailVerified: true });
      user.markEmailVerified();
      expect(user.pullEvents()).toHaveLength(0);
    });

    it('should record UserVerifiedEvent', () => {
      const user = buildUser({ emailVerified: false });
      user.markEmailVerified();
      const events = user.pullEvents();
      expect(events.some((e) => e.type === 'UserVerifiedEvent')).toBe(true);
    });
  });

  describe('markPhoneVerified()', () => {
    it('should set phoneVerified to true', () => {
      const user = buildUser({ phoneVerified: false });
      user.markPhoneVerified();
      expect(user.phoneVerified).toBe(true);
    });

    it('should be idempotent', () => {
      const user = buildUser({ phoneVerified: true });
      user.markPhoneVerified();
      expect(user.pullEvents()).toHaveLength(0);
    });
  });

  describe('assignRole()', () => {
    it('should add role', () => {
      const user = buildUser();
      user.assignRole(UserRoleVO.of('admin'));
      expect(user.hasRole(UserRoleVO.of('admin'))).toBe(true);
    });

    it('should not add duplicate role', () => {
      const user = buildUser();
      user.assignRole(UserRoleVO.customer());
      // Still only 1 role
      expect(user.roles).toHaveLength(1);
      expect(user.pullEvents()).toHaveLength(0);
    });

    it('should record UserRoleAssignedEvent', () => {
      const user = buildUser();
      user.assignRole(UserRoleVO.of('admin'));
      const events = user.pullEvents();
      expect(events.some((e) => e.type === 'UserRoleAssignedEvent')).toBe(true);
    });
  });

  describe('revokeRole()', () => {
    it('should remove role', () => {
      const user = buildUser({ roles: [UserRoleVO.customer(), UserRoleVO.of('admin')] });
      user.revokeRole(UserRoleVO.of('admin'));
      expect(user.hasRole(UserRoleVO.of('admin'))).toBe(false);
      expect(user.hasRole(UserRoleVO.customer())).toBe(true);
    });

    it('should be no-op if role not assigned', () => {
      const user = buildUser();
      user.revokeRole(UserRoleVO.of('admin'));
      expect(user.pullEvents()).toHaveLength(0);
    });

    it('should record UserRoleRevokedEvent', () => {
      const user = buildUser({ roles: [UserRoleVO.customer(), UserRoleVO.of('admin')] });
      user.revokeRole(UserRoleVO.of('admin'));
      const events = user.pullEvents();
      expect(events.some((e) => e.type === 'UserRoleRevokedEvent')).toBe(true);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // Events
  // ═══════════════════════════════════════════════════════════

  describe('pullEvents()', () => {
    it('should return and clear events', () => {
      const user = buildUser();
      user.changeName(UserNameVO.of('Jane Doe'));
      const events1 = user.pullEvents();
      const events2 = user.pullEvents();
      expect(events1).toHaveLength(1);
      expect(events2).toHaveLength(0);
    });

    it('should return a copy of events', () => {
      const user = buildUser();
      user.changeName(UserNameVO.of('Jane Doe'));
      const events = user.pullEvents();
      // Should still be 1 after pull (array immutable)
      expect(events).toHaveLength(1);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // Identity
  // ═══════════════════════════════════════════════════════════

  describe('equals()', () => {
    it('should return true for same id', () => {
      const a = buildUser();
      const b = buildUser();
      expect(a.equals(b)).toBe(true);
    });

    it('should return false for different id', () => {
      const a = buildUser({ id: 'user-1' as never });
      const b = buildUser({ id: 'user-2' as never });
      expect(a.equals(b)).toBe(false);
    });
  });

  describe('isDeleted()', () => {
    it('should return false for non-deleted user', () => {
      expect(buildUser().isDeleted()).toBe(false);
    });

    it('should return true for deleted user', () => {
      const user = buildUser({ deletedAt: NOW });
      expect(user.isDeleted()).toBe(true);
    });
  });
});
