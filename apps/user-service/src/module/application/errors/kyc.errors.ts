/**
 * KYC Application Errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class KycNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 404;
  constructor(kycId: string) {
    super(`KYC "${kycId}" not found`, { kycId });
    this.name = 'KycNotFoundApplicationError';
  }
}

export class KycSubmissionFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;
  constructor(userId: string, reason: string) {
    super(`KYC submission failed for "${userId}": ${reason}`, { userId, reason });
    this.name = 'KycSubmissionFailedError';
  }
}

export class KycVerificationFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;
  constructor(kycId: string, reason: string) {
    super(`KYC verification failed for "${kycId}": ${reason}`, { kycId, reason });
    this.name = 'KycVerificationFailedError';
  }
}
