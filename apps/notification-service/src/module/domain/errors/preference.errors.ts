import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';

export class PreferenceNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 404;

  constructor(userId: string) {
    super(`Preference not found for user: ${userId}`, { userId });
  }
}

export class UserOptedOutError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_FORBIDDEN;
  readonly httpStatus = 403;

  constructor(channel: string) {
    super(`User opted out of channel: ${channel}`, { channel });
  }
}
