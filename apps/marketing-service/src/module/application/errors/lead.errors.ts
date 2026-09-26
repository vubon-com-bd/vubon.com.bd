import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class LeadNotFoundAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.LEAD_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(leadId: string) {
    super(`Lead not found: ${leadId}`, { leadId });
  }
}

export class InvalidLeadStateAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.LEAD_INVALID_STATE;
  readonly httpStatus = 400;

  constructor(currentState: string, targetState: string) {
    super(`Invalid lead state transition: ${currentState} → ${targetState}`, {
      currentState,
      targetState,
    });
  }
}
