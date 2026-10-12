/**
 * Application-level team errors
 * @module vendor-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class TeamMemberNotFoundError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_TEAM_MEMBER_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(memberId: string) {
    super(`Team member "${memberId}" not found`, { memberId });
    this.name = 'TeamMemberNotFoundError';
  }
}

export class TeamMemberAlreadyExistsError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_INVALID_STATE;
  readonly httpStatus = 409;
  constructor(email: string, vendorId: string) {
    super(
      `Team member with email "${email}" already exists for vendor "${vendorId}"`,
      { email, vendorId },
    );
    this.name = 'TeamMemberAlreadyExistsError';
  }
}

export class TeamLimitExceededError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_TEAM_LIMIT_EXCEEDED;
  readonly httpStatus = 422;
  constructor(current: number, limit: number) {
    super(
      `Team member limit exceeded (${current}/${limit})`,
      { current, limit },
    );
    this.name = 'TeamLimitExceededError';
  }
}

export class CannotRemoveOwnerError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_INVALID_STATE;
  readonly httpStatus = 403;
  constructor(vendorId: string) {
    super(`Owner of vendor "${vendorId}" cannot be removed`, { vendorId });
    this.name = 'CannotRemoveOwnerError';
  }
}

export class InviteAlreadyAcceptedError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_INVALID_STATE;
  readonly httpStatus = 409;
  constructor(inviteId: string) {
    super(`Invite "${inviteId}" already accepted`, { inviteId });
    this.name = 'InviteAlreadyAcceptedError';
  }
}
