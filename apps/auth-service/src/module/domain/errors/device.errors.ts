import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class UntrustedDeviceError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_UNTRUSTED_DEVICE;
  readonly httpStatus = 403;

  constructor(fingerprint: string) {
    super(`Untrusted device: ${fingerprint}`, { fingerprint });
  }
}
