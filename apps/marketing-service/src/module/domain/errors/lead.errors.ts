import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class LeadNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.LEAD_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(leadId: string) {
    super(`Lead not found: ${leadId}`, { leadId });
  }
}

export class InvalidLeadStateError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.LEAD_INVALID_STATE;
  readonly httpStatus = 400;

  constructor(currentState: string, targetState: string) {
    super(`Invalid lead state transition: ${currentState} → ${targetState}`, {
      currentState,
      targetState,
    });
  }
}
