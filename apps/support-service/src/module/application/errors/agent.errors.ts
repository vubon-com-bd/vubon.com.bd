import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class AgentNotFoundError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 404;

  constructor(agentId: string) {
    super(`Agent not found: ${agentId}`, { agentId });
  }
}

export class NoAgentAvailableError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 503;

  constructor(ticketId: string) {
    super(`No agent available for ticket: ${ticketId}`, { ticketId });
  }
}
