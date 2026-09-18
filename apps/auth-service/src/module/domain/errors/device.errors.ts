import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import type { ErrorCodeType } from '@vubon/shared-constants/common';

export class UntrustedDeviceError extends DomainError {
  readonly code: ErrorCodeType = 'AUTH-005';
  readonly httpStatus = 403;

  constructor(fingerprint: string) {
    super(`Untrusted device: ${fingerprint}`, { fingerprint });
  }
}
