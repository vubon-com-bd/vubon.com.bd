import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import type { ErrorCodeType } from '@vubon/shared-constants/common';

export class SocialAlreadyLinkedError extends DomainError {
  readonly code: ErrorCodeType = 'VAL-004';
  readonly httpStatus = 409;

  constructor(provider: string) {
    super(`Social already linked: ${provider}`, { provider });
  }
}
