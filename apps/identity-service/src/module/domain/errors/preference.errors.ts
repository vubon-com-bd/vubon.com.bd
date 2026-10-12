/**
 * Preference Domain Errors
 * @module identity-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class PreferenceNotFoundError extends NotFoundError {
  constructor(userId: string) {
    super('Preferences', userId);
    this.name = 'PreferenceNotFoundError';
  }
}

export class InvalidPreferenceKeyError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid preference key "${value}". Allowed: ${allowed.join(', ')}`, 'key');
    this.name = 'InvalidPreferenceKeyError';
  }
}

export class PreferenceUpdateRejectedError extends BusinessRuleError {
  constructor(reason: string) {
    super(`Preference update rejected: ${reason}`,
      'PREFERENCE_UPDATE_REJECTED', { reason });
    this.name = 'PreferenceUpdateRejectedError';
  }
}

export class SecurityPreferenceLockedError extends BusinessRuleError {
  constructor(userId: string) {
    super(`Security preferences for user "${userId}" cannot be disabled`,
      'SECURITY_PREFERENCE_LOCKED', { userId });
    this.name = 'SecurityPreferenceLockedError';
  }
}
