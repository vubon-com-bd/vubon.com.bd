import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';

export class AgentNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 404;

  constructor(agentId: string) {
    super(`Agent not found: ${agentId}`, { agentId });
  }
}

export class AgentNotAvailableError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 409;

  constructor(agentId: string) {
    super(`Agent not available: ${agentId}`, { agentId });
  }
}
