/**
 * Activity Domain Errors
 * @module identity-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class ActivityNotFoundError extends NotFoundError {
  constructor(activityId: string) {
    super('Activity', activityId);
    this.name = 'ActivityNotFoundError';
  }
}

export class InvalidActivityTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid activity type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidActivityTypeError';
  }
}

export class ActivityLimitExceededError extends BusinessRuleError {
  constructor(userId: string, limit: number) {
    super(`Activity log limit (${limit}) exceeded for user "${userId}"`,
      'ACTIVITY_LIMIT_EXCEEDED', { userId, limit });
    this.name = 'ActivityLimitExceededError';
  }
}

export class SecurityEventLogFailedError extends BusinessRuleError {
  constructor(reason: string) {
    super(`Security event logging failed: ${reason}`,
      'SECURITY_EVENT_LOG_FAILED', { reason });
    this.name = 'SecurityEventLogFailedError';
  }
}
