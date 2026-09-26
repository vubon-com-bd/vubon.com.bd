/**
 * Team application errors
 * @module support-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class TeamNotFoundException extends ApplicationError {
  readonly code = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(public readonly teamId: string) {
    super(`Team not found: ${teamId}`, { teamId });
    this.name = 'TeamNotFoundException';
  }
}

export class TeamMemberDuplicateException extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(public readonly teamId: string, public readonly userId: string) {
    super(`User ${userId} already in team ${teamId}`, { teamId, userId });
    this.name = 'TeamMemberDuplicateException';
  }
}
