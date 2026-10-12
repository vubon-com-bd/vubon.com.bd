import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class ProfileUpdateFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;
  constructor(reason: string) {
    super(`Profile update failed: ${reason}`, { reason });
    this.name = 'ProfileUpdateFailedError';
  }
}
