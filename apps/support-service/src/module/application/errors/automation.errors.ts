/**
 * Automation application errors
 * @module support-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class AutomationNotFoundException extends ApplicationError {
  readonly code = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(public readonly automationId: string) {
    super(`Automation not found: ${automationId}`, { automationId });
    this.name = 'AutomationNotFoundException';
  }
}

export class AutomationDisabledException extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(public readonly automationId: string) {
    super(`Automation is disabled: ${automationId}`, { automationId });
    this.name = 'AutomationDisabledException';
  }
}
