/**
 * Application-level approval errors
 * @module vendor-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class ApprovalNotFoundError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_APPROVAL_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(vendorId: string) {
    super(`Approval record not found for vendor "${vendorId}"`, { vendorId });
    this.name = 'ApprovalNotFoundError';
  }
}

export class ApprovalNotActionableError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_APPROVAL_INVALID_STATE;
  readonly httpStatus = 400;
  constructor(status: string, action: string) {
    super(
      `Cannot perform "${action}" on approval in status "${status}"`,
      { status, action },
    );
    this.name = 'ApprovalNotActionableError';
  }
}

export class ResubmissionLimitExceededError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_APPROVAL_INVALID_STATE;
  readonly httpStatus = 409;
  constructor(count: number, max: number) {
    super(`Resubmission limit exceeded (${count}/${max})`, { count, max });
    this.name = 'ResubmissionLimitExceededError';
  }
}

export class AppealWindowClosedError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_APPROVAL_INVALID_STATE;
  readonly httpStatus = 410;
  constructor(deadline: string) {
    super(`Appeal window closed at ${deadline}`, { deadline });
    this.name = 'AppealWindowClosedError';
  }
}
