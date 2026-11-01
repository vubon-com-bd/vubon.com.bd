/**
 * Vendor Team Errors
 * @module vendor-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class VendorTeamMemberNotFoundError extends NotFoundError {
  constructor(memberId: string) {
    super('VendorTeamMember', memberId);
    this.name = 'VendorTeamMemberNotFoundError';
  }
}

export class InvalidTeamRoleError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid team role "${value}". Allowed: ${allowed.join(', ')}`, 'role');
    this.name = 'InvalidTeamRoleError';
  }
}

export class TeamMemberAlreadyExistsError extends ConflictError {
  constructor(vendorId: string, userId: string) {
    super(`User "${userId}" is already a team member of vendor "${vendorId}"`, 'userId');
    this.name = 'TeamMemberAlreadyExistsError';
  }
}

export class TeamMemberLimitExceededError extends BusinessRuleError {
  constructor(vendorId: string, max: number) {
    super(
      `Vendor "${vendorId}" exceeded max team members (${max})`,
      'TEAM_MEMBER_LIMIT_EXCEEDED',
      { vendorId, max },
    );
    this.name = 'TeamMemberLimitExceededError';
  }
}

export class CannotRemoveOwnerError extends BusinessRuleError {
  constructor(vendorId: string) {
    super(
      `Cannot remove owner from vendor "${vendorId}"`,
      'CANNOT_REMOVE_OWNER',
      { vendorId },
    );
    this.name = 'CannotRemoveOwnerError';
  }
}

export class InsufficientPermissionError extends BusinessRuleError {
  constructor(userId: string, permission: string) {
    super(
      `User "${userId}" lacks permission "${permission}"`,
      'INSUFFICIENT_PERMISSION',
      { userId, permission },
    );
    this.name = 'InsufficientPermissionError';
  }
}
