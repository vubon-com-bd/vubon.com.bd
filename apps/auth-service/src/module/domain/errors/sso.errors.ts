import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import type { ErrorCodeType } from '@vubon/shared-constants/common';

export class SsoFailedError extends DomainError {
  readonly code: ErrorCodeType = 'AUTH-001';
  readonly httpStatus = 401;

  constructor(provider: string) {
    super(`SSO failed for provider: ${provider}`, { provider });
  }
}
