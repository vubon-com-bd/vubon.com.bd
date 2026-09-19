import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class SocialAlreadyLinkedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_SOCIAL_ALREADY_LINKED;
  readonly httpStatus = 409;

  constructor(provider: string) {
    super(`Social account already linked: ${provider}`, { provider });
  }
}
