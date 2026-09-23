import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class AutomationNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTOMATION_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(automationId: string) {
    super(`Automation not found: ${automationId}`, { automationId });
  }
}

export class WorkflowFailedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.WORKFLOW_FAILED;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Workflow failed: ${reason}`, { reason });
  }
}
