/**
 * Complaint application errors
 * @module support-service/application/errors
 *
 * Registry: extends ApplicationError
 * Rule: `code` must be a known ERROR_CODE value; `httpStatus` required
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class ComplaintNotFoundException extends ApplicationError {
  readonly code = ERROR_CODE.SUPPORT_COMPLAINT_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(public readonly complaintId: string) {
    super(`Complaint not found: ${complaintId}`, { complaintId });
    this.name = 'ComplaintNotFoundException';
  }
}

export class ComplaintAlreadyResolvedException extends ApplicationError {
  readonly code = ERROR_CODE.SUPPORT_COMPLAINT_ALREADY_RESOLVED;
  readonly httpStatus = 409;

  constructor(public readonly complaintId: string) {
    super(`Complaint already resolved: ${complaintId}`, { complaintId });
    this.name = 'ComplaintAlreadyResolvedException';
  }
}
