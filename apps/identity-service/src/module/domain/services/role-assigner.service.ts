/**
 * RoleAssignerService
 * @module identity-service/domain/services
 */
import { AUTH_ROLE } from '@vubon/shared-constants/auth';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export interface RoleAssignmentInput {
  readonly userId: string;
  readonly role: string;
  readonly assignedBy: string;
  readonly expiresAt?: string;
}

export class RoleAssignerService {
  static readonly ROLE_LEVELS: Readonly<Record<string, number>> = {
    [AUTH_ROLE.SUPER_ADMIN]: 100,
    [AUTH_ROLE.ADMIN]: 90,
    [AUTH_ROLE.MODERATOR]: 70,
    [AUTH_ROLE.SUPPORT_AGENT]: 50,
    [AUTH_ROLE.LOGISTICS_MANAGER]: 50,
    [AUTH_ROLE.VENDOR]: 40,
    [AUTH_ROLE.CUSTOMER]: 20,
    [AUTH_ROLE.GUEST]: 5,
  };

  static levelOf(role: string): number {
    return this.ROLE_LEVELS[role] ?? 0;
  }

  static isAdmin(role: string): boolean {
    return [AUTH_ROLE.SUPER_ADMIN, AUTH_ROLE.ADMIN, AUTH_ROLE.MODERATOR].includes(role as never);
  }

  static isSystemRole(role: string): boolean {
    return role === AUTH_ROLE.SUPER_ADMIN || role === AUTH_ROLE.ADMIN;
  }

  /**
   * Assert that assigner has higher level than target role.
   */
  static assertCanAssign(assignerRole: string, targetRole: string): void {
    const assignerLevel = this.levelOf(assignerRole);
    const targetLevel = this.levelOf(targetRole);
    if (assignerLevel <= targetLevel) {
      throw new BusinessRuleError(
        `Cannot assign role "${targetRole}" — insufficient privilege`,
        'ROLE_ASSIGN_INSUFFICIENT_PRIVILEGE',
        { assignerRole, targetRole, assignerLevel, targetLevel },
      );
    }
  }

  static assertRoleExists(role: string): void {
    if (this.levelOf(role) === 0) {
      throw new BusinessRuleError(
        `Unknown role: ${role}`,
        'ROLE_UNKNOWN',
        { role },
      );
    }
  }

  /**
   * Higher than other role.
   */
  static isHigher(a: string, b: string): boolean {
    return this.levelOf(a) > this.levelOf(b);
  }

  /**
   * Expiry validation — if provided must be in future.
   */
  static assertExpiry(expiresAtIso: string | undefined, nowMs: number = Date.now()): void {
    if (!expiresAtIso) return;
    if (Date.parse(expiresAtIso) <= nowMs) {
      throw new BusinessRuleError(
        'Role assignment expiry must be in future',
        'ROLE_EXPIRY_IN_PAST',
        { expiresAt: expiresAtIso },
      );
    }
  }
}
