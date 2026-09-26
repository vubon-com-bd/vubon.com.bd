/**
 * Support automation domain errors
 * @module support-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { AutomationIdVO } from '../value-objects/primitives/automation-id.vo';

export class AutomationNotFoundError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_AUTOMATION_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(public readonly automationId: AutomationIdVO) {
    super(`Automation not found: ${automationId.value}`, {
      automationId: automationId.value,
    });
    this.name = 'AutomationNotFoundError';
  }
}

export class AutomationDisabledError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_AUTOMATION_DISABLED;
  readonly httpStatus = 409;
  constructor(public readonly automationId: AutomationIdVO) {
    super(`Automation is disabled: ${automationId.value}`, {
      automationId: automationId.value,
    });
    this.name = 'AutomationDisabledError';
  }
}

export class AutomationNotScheduledError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_AUTOMATION_DISABLED;
  readonly httpStatus = 409;
  constructor(public readonly automationId: AutomationIdVO) {
    super(`Automation is not time-based: ${automationId.value}`, {
      automationId: automationId.value,
    });
    this.name = 'AutomationNotScheduledError';
  }
}
