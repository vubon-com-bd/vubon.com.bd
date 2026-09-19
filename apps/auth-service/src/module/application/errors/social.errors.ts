import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class SocialLoginFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_SOCIAL_ALREADY_LINKED;
  readonly httpStatus = 400;

  constructor(provider: string, reason: string) {
    super(`Social login failed for ${provider}: ${reason}`, { provider, reason });
  }
}

export class SocialLinkFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_SOCIAL_ALREADY_LINKED;
  readonly httpStatus = 409;

  constructor(provider: string) {
    super(`Social account already linked: ${provider}`, { provider });
  }
}
