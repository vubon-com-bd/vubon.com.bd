/**
 * Contact Application Errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class ContactNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 404;
  constructor(contactId: string) {
    super(`Contact "${contactId}" not found`, { contactId });
    this.name = 'ContactNotFoundApplicationError';
  }
}

export class ContactCreationFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;
  constructor(reason: string) {
    super(`Contact creation failed: ${reason}`, { reason });
    this.name = 'ContactCreationFailedError';
  }
}

export class ContactUpdateFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;
  constructor(contactId: string, reason: string) {
    super(`Contact update failed for "${contactId}": ${reason}`, { contactId, reason });
    this.name = 'ContactUpdateFailedError';
  }
}

export class ContactVerificationFailedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;
  constructor(contactId: string, reason: string) {
    super(`Contact verification failed for "${contactId}": ${reason}`, {
      contactId,
      reason,
    });
    this.name = 'ContactVerificationFailedError';
  }
}

export class ContactAlreadyVerifiedError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;
  constructor(contactId: string) {
    super(`Contact "${contactId}" is already verified`, { contactId });
    this.name = 'ContactAlreadyVerifiedError';
  }
}

export class ContactLimitExceededError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 422;
  constructor(current: number, max: number) {
    super(`Contact limit exceeded: ${current}/${max}`, { current, max });
    this.name = 'ContactLimitExceededError';
  }
}
