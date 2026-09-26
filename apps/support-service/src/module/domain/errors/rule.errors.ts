/**
 * Support rule domain errors
 * @module support-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { RuleIdVO } from '../value-objects/primitives/rule-id.vo';

export class RuleNotFoundError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_RULE_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(public readonly ruleId: RuleIdVO) {
    super(`Support rule not found: ${ruleId.value}`, { ruleId: ruleId.value });
    this.name = 'RuleNotFoundError';
  }
}

export class RuleInactiveError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_RULE_INACTIVE;
  readonly httpStatus = 409;
  constructor(public readonly ruleId: RuleIdVO, public readonly action: string) {
    super(`Cannot ${action} an inactive rule`, { ruleId: ruleId.value, action });
    this.name = 'RuleInactiveError';
  }
}

export class RuleAlreadyActiveError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_RULE_INACTIVE;
  readonly httpStatus = 409;
  constructor(public readonly ruleId: RuleIdVO) {
    super(`Rule already active: ${ruleId.value}`, { ruleId: ruleId.value });
    this.name = 'RuleAlreadyActiveError';
  }
}
