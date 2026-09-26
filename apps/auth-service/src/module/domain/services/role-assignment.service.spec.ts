/**
 * RoleAssignmentService — Unit Tests
 * @module auth-service/domain/services
 */
import { RoleAssignmentService } from './role-assignment.service';
import { UserEntity } from '../entities/user.entity';
import { UserEmailVO } from '../value-objects/primitives/user-email.vo';
import { UserNameVO } from '../value-objects/primitives/user-name.vo';
import { UserStatusVO } from '../value-objects/primitives/user-status.vo';
import { UserTypeVO } from '../value-objects/primitives/user-type.vo';
import { UserRoleVO } from '../value-objects/primitives/user-role.vo';
import { InvalidRoleError, PermissionDeniedError } from '../errors/permission.errors';

const NOW = '2024-01-01T00:00:00.000Z';

const buildUser = (overrides: Partial<Parameters<typeof UserEntity.create>[0]> = {}) =>
  UserEntity.create({
    id: 'user-1' as never,
    email: UserEmailVO.of('john@example.com'),
    passwordHash: '$2b$12$abcdefghijklmnopqrstuv',
    name: UserNameVO.of('John Doe'),
    status: UserStatusVO.active(),
    type: UserTypeVO.of('admin'),
    roles: [],
    emailVerified: true,
    phoneVerified: false,
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

describe('RoleAssignmentService', () => {
  // ═══════════════════════════════════════════════════════════
  // assertCanAssign
  // ═══════════════════════════════════════════════════════════

  describe('assertCanAssign()', () => {
    it('should allow non-super_admin role assignment by any user', () => {
      const actor = buildUser();
      const target = buildUser({ id: 'user-2' as never });
      expect(() =>
        RoleAssignmentService.assertCanAssign(actor, target, UserRoleVO.customer()),
      ).not.toThrow();
    });

    it('should allow super_admin assignment by super_admin', () => {
      const actor = buildUser({ roles: [UserRoleVO.superAdmin()] });
      const target = buildUser({ id: 'user-2' as never });
      expect(() =>
        RoleAssignmentService.assertCanAssign(actor, target, UserRoleVO.superAdmin()),
      ).not.toThrow();
    });

    it('should reject super_admin assignment by non-super_admin', () => {
      const actor = buildUser({ roles: [UserRoleVO.of('admin')] });
      const target = buildUser({ id: 'user-2' as never });
      expect(() =>
        RoleAssignmentService.assertCanAssign(actor, target, UserRoleVO.superAdmin()),
      ).toThrow(PermissionDeniedError);
    });

    it('should reject duplicate super_admin on same user', () => {
      const actor = buildUser({ roles: [UserRoleVO.superAdmin()] });
      const target = buildUser({ id: 'user-2' as never, roles: [UserRoleVO.superAdmin()] });
      expect(() =>
        RoleAssignmentService.assertCanAssign(actor, target, UserRoleVO.superAdmin()),
      ).toThrow(InvalidRoleError);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // assertCanRevoke
  // ═══════════════════════════════════════════════════════════

  describe('assertCanRevoke()', () => {
    it('should allow non-super_admin revoke by any user', () => {
      const actor = buildUser();
      const target = buildUser({
        id: 'user-2' as never,
        roles: [UserRoleVO.customer()],
      });
      expect(() =>
        RoleAssignmentService.assertCanRevoke(actor, target, UserRoleVO.customer()),
      ).not.toThrow();
    });

    it('should reject super_admin revoke by non-super_admin', () => {
      const actor = buildUser();
      const target = buildUser({
        id: 'user-2' as never,
        roles: [UserRoleVO.superAdmin()],
      });
      expect(() =>
        RoleAssignmentService.assertCanRevoke(actor, target, UserRoleVO.superAdmin()),
      ).toThrow(PermissionDeniedError);
    });

    it('should reject self-revoke of super_admin', () => {
      const actor = buildUser({ roles: [UserRoleVO.superAdmin()] });
      const target = actor;
      expect(() =>
        RoleAssignmentService.assertCanRevoke(actor, target, UserRoleVO.superAdmin()),
      ).toThrow(PermissionDeniedError);
    });

    it('should reject revoke of role not assigned', () => {
      const actor = buildUser();
      const target = buildUser({ id: 'user-2' as never });
      expect(() =>
        RoleAssignmentService.assertCanRevoke(actor, target, UserRoleVO.customer()),
      ).toThrow(InvalidRoleError);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // Vendor eligibility
  // ═══════════════════════════════════════════════════════════

  describe('canAssignVendor()', () => {
    it('should return true when both email and phone verified', () => {
      const u = buildUser({ emailVerified: true, phoneVerified: true });
      expect(RoleAssignmentService.canAssignVendor(u)).toBe(true);
    });

    it('should return false when email not verified', () => {
      const u = buildUser({ emailVerified: false, phoneVerified: true });
      expect(RoleAssignmentService.canAssignVendor(u)).toBe(false);
    });

    it('should return false when phone not verified', () => {
      const u = buildUser({ emailVerified: true, phoneVerified: false });
      expect(RoleAssignmentService.canAssignVendor(u)).toBe(false);
    });
  });

  describe('assertVendorEligible()', () => {
    it('should not throw for fully verified user', () => {
      const u = buildUser({ emailVerified: true, phoneVerified: true });
      expect(() => RoleAssignmentService.assertVendorEligible(u)).not.toThrow();
    });

    it('should throw InvalidRoleError for unverified user', () => {
      const u = buildUser({ emailVerified: false });
      expect(() => RoleAssignmentService.assertVendorEligible(u)).toThrow(InvalidRoleError);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // Default roles
  // ═══════════════════════════════════════════════════════════

  describe('defaultRolesFor()', () => {
    it('should return [customer] role', () => {
      const roles = RoleAssignmentService.defaultRolesFor();
      expect(roles).toHaveLength(1);
      expect(roles[0]?.value).toBe('customer');
    });
  });
});
