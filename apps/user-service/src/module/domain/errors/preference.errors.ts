/**
 * Preference domain errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class PreferenceNotFoundError extends NotFoundError {
  constructor(userId: string) {
    super('UserPreferences', userId);
    this.name = 'PreferenceNotFoundError';
  }
}

export class InvalidPreferenceError extends ValidationError {
  constructor(key: string, reason: string) {
    super(`Invalid preference "${key}": ${reason}`, 'preference');
    this.name = 'InvalidPreferenceError';
  }
}
