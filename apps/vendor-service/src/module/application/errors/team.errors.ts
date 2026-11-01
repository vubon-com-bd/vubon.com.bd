/**
 * Vendor Team Application Errors
 * @module vendor-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';
import { QueryError } from '@vubon/shared-kernel/application/errors/query.error';

// ─── Not Found (404) ──────────────────────
export class TeamMemberNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(memberId: string) {
    super('VendorTeamMember', memberId);
    this.name = 'TeamMemberNotFoundApplicationError';
  }
}

// ─── Validation (422) ─────────────────────
export class TeamValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'TeamValidationError';
  }
}

// ─── Command errors (400) ─────────────────
export class AddTeamMemberError extends CommandError {
  constructor(vendorId: string, reason: string) {
    super(`Add team member to vendor "${vendorId}" failed: ${reason}`, 'AddTeamMember');
    this.name = 'AddTeamMemberError';
  }
}

export class UpdateTeamMemberError extends CommandError {
  constructor(memberId: string, reason: string) {
    super(`Update team member "${memberId}" failed: ${reason}`, 'UpdateTeamMember');
    this.name = 'UpdateTeamMemberError';
  }
}

export class RemoveTeamMemberError extends CommandError {
  constructor(memberId: string, reason: string) {
    super(`Remove team member "${memberId}" failed: ${reason}`, 'RemoveTeamMember');
    this.name = 'RemoveTeamMemberError';
  }
}

export class AssignRoleError extends CommandError {
  constructor(memberId: string, reason: string) {
    super(`Assign role to member "${memberId}" failed: ${reason}`, 'AssignRole');
    this.name = 'AssignRoleError';
  }
}

// ─── Query errors (400) ───────────────────
export class TeamQueryError extends QueryError {
  constructor(reason: string) {
    super(`Team query failed: ${reason}`, 'TeamQuery');
    this.name = 'TeamQueryError';
  }
}

// ─── Conflict (409) ───────────────────────
export class TeamMemberAlreadyExistsApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(vendorId: string, userId: string) {
    super(`User "${userId}" is already a team member of vendor "${vendorId}"`, {
      vendorId,
      userId,
    });
    this.name = 'TeamMemberAlreadyExistsApplicationError';
  }
}

export class TeamMemberLimitExceededApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(vendorId: string, max: number) {
    super(`Vendor "${vendorId}" exceeded max team members (${max})`, { vendorId, max });
    this.name = 'TeamMemberLimitExceededApplicationError';
  }
}

export class CannotRemoveLastOwnerApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(vendorId: string) {
    super(`Cannot remove the last owner of vendor "${vendorId}"`, { vendorId });
    this.name = 'CannotRemoveLastOwnerApplicationError';
  }
}
