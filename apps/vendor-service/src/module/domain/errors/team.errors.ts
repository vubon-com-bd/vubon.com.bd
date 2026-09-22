import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class TeamMemberNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VENDOR_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(memberId: string) {
    super(`Team member not found: ${memberId}`, { memberId });
  }
}

export class TeamLimitExceededError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(limit: number) {
    super(`Team limit exceeded: max ${limit}`, { limit });
  }
}

export class InvalidTeamMemberIdError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(value: string) {
    super(`Invalid team member id: ${value}`, { value });
  }
}

export class InvalidTeamRoleError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(value: string) {
    super(`Invalid team role: ${value}`, { value });
  }
}

export class InvalidTeamPermissionError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(value: string) {
    super(`Invalid team permission: ${value}`, { value });
  }
}
