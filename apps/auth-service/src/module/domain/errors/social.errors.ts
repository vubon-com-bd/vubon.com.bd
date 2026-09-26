/**
 * Social Auth Domain Errors
 * @module auth-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class SocialAlreadyLinkedError extends DomainError {
  readonly code = ERROR_CODE.AUTH_SOCIAL_ALREADY_LINKED;
  readonly httpStatus = 409;

  constructor(userId: string, provider: string) {
    super(`Social account already linked: ${provider} for user ${userId}`, {
      userId,
      provider,
    });
  }
}

export class SocialNotLinkedError extends DomainError {
  readonly code = ERROR_CODE.AUTH_SOCIAL_NOT_LINKED;
  readonly httpStatus = 404;

  constructor(userId: string, provider: string) {
    super(`Social account not linked: ${provider} for user ${userId}`, {
      userId,
      provider,
    });
  }
}

export class SocialProviderError extends DomainError {
  readonly code = ERROR_CODE.AUTH_SOCIAL_PROVIDER_ERROR;
  readonly httpStatus = 502;

  constructor(provider: string, reason: string) {
    super(`Social provider ${provider} failed: ${reason}`, {
      provider,
      reason,
    });
  }
}
