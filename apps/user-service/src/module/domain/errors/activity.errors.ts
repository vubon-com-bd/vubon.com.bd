/**
 * Activity domain errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class ActivityNotFoundError extends NotFoundError {
  constructor(activityId: string) {
    super('UserActivity', activityId);
    this.name = 'ActivityNotFoundError';
  }
}

export class ActivityLimitExceededError extends BusinessRuleError {
  constructor(current: number, max: number) {
    super(`Activity limit exceeded: ${current}/${max}`, 'ACTIVITY_LIMIT_EXCEEDED');
    this.name = 'ActivityLimitExceededError';
  }
}

export class InvalidActivityTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid activity type "${value}". Allowed: ${allowed.join(', ')}`, 'activityType');
    this.name = 'InvalidActivityTypeError';
  }
}
