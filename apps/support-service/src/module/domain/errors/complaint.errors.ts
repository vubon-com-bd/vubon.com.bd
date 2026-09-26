/**
 * Complaint domain errors
 * @module support-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ComplaintIdVO } from '../value-objects/primitives/complaint-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export class ComplaintNotFoundError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_COMPLAINT_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(public readonly complaintId: ComplaintIdVO) {
    super(`Complaint not found: ${complaintId.value}`, { complaintId: complaintId.value });
    this.name = 'ComplaintNotFoundError';
  }
}

export class ComplaintAlreadyResolvedError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_COMPLAINT_ALREADY_RESOLVED;
  readonly httpStatus = 409;
  constructor(public readonly complaintId: ComplaintIdVO) {
    super(`Complaint already resolved: ${complaintId.value}`, { complaintId: complaintId.value });
    this.name = 'ComplaintAlreadyResolvedError';
  }
}

export class ComplaintCannotEscalateError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_COMPLAINT_SEVERITY_INVALID;
  readonly httpStatus = 409;
  constructor(public readonly complaintId: ComplaintIdVO, public readonly reason: string) {
    super(`Cannot escalate complaint: ${reason}`, { complaintId: complaintId.value, reason });
    this.name = 'ComplaintCannotEscalateError';
  }
}

export class ComplaintLimitExceededError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_COMPLAINT_SEVERITY_INVALID;
  readonly httpStatus = 429;
  constructor(public readonly userId: UserIdVO, public readonly limit: number) {
    super(`Complaint limit exceeded for user ${userId.value}`, {
      userId: userId.value, limit,
    });
    this.name = 'ComplaintLimitExceededError';
  }
}
