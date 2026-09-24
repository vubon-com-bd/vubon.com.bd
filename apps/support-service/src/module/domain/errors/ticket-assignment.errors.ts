import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';

export class NoAgentAvailableError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 503;

  constructor(ticketId: string) {
    super(`No agent available for ticket: ${ticketId}`, { ticketId });
  }
}
