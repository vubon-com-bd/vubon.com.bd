import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';

export class SlaNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 404;

  constructor(slaId: string) {
    super(`SLA not found: ${slaId}`, { slaId });
  }
}

export class SlaBreachedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 408;

  constructor(slaId: string, ticketId: string) {
    super(`SLA breached: ${slaId} for ticket ${ticketId}`, { slaId, ticketId });
  }
}
