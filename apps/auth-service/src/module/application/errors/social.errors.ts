/**
 * Social Auth Application Errors
 * @module auth-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';
import type { ErrorCodeType } from '@vubon/shared-constants/common';

export class SocialAlreadyLinkedAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_SOCIAL_ALREADY_LINKED;
  readonly httpStatus = 409;

  constructor(userId: string, provider: string) {
    super(
      `Social account already linked (${provider}) for user: ${userId}`,
      { userId, provider },
    );
  }
}

export class SocialNotLinkedAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_SOCIAL_NOT_LINKED;
  readonly httpStatus = 404;

  constructor(userId: string, provider: string) {
    super(
      `Social account not linked (${provider}) for user: ${userId}`,
      { userId, provider },
    );
  }
}

export class SocialProviderAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_SOCIAL_PROVIDER_ERROR;
  readonly httpStatus = 502;

  constructor(provider: string, reason: string) {
    super(`Social provider ${provider} failed: ${reason}`, { provider, reason });
  }
}
