/**
 * Agent application errors
 * @module support-service/application/errors
 *
 * Note: ERROR_CODE lacks support-specific codes → mapped to closest generic
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class AgentNotFoundException extends ApplicationError {
  readonly code = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(public readonly agentId: string) {
    super(`Agent not found: ${agentId}`, { agentId });
    this.name = 'AgentNotFoundException';
  }
}

export class AgentUnavailableException extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(public readonly agentId: string) {
    super(`Agent is unavailable: ${agentId}`, { agentId });
    this.name = 'AgentUnavailableException';
  }
}
