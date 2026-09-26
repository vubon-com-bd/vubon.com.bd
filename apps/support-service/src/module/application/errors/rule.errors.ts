/**
 * Rule application errors
 * @module support-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class RuleNotFoundException extends ApplicationError {
  readonly code = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(public readonly ruleId: string) {
    super(`Rule not found: ${ruleId}`, { ruleId });
    this.name = 'RuleNotFoundException';
  }
}

export class RuleInactiveException extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(public readonly ruleId: string) {
    super(`Rule is inactive: ${ruleId}`, { ruleId });
    this.name = 'RuleInactiveException';
  }
}
