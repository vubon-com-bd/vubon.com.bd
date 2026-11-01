/* istanbul ignore file -- pure error declarations */
/**
 * Preference Domain Errors
 * @module notification-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class PreferenceNotFoundError extends NotFoundError {
  constructor(userId: string) {
    super('Preference', userId);
    this.name = 'PreferenceNotFoundError';
  }
}

// ─── Conflict (409) ────────────────────────
export class PreferenceAlreadyExistsError extends ConflictError {
  constructor(userId: string) {
    super(`Preference for user "${userId}" already exists`, 'userId');
    this.name = 'PreferenceAlreadyExistsError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidPreferenceTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid preference type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidPreferenceTypeError';
  }
}

export class InvalidQuietHoursError extends ValidationError {
  constructor(reason: string) {
    super(`Invalid quiet hours: ${reason}`, 'quietHours');
    this.name = 'InvalidQuietHoursError';
  }
}

// ─── Business Rule (400) ───────────────────
export class PreferencesImmutableError extends BusinessRuleError {
  constructor(userId: string) {
    super(
      `Preferences for user "${userId}" are immutable (locked)`,
      'PREFERENCES_IMMUTABLE',
      { userId },
    );
    this.name = 'PreferencesImmutableError';
  }
}

export class CriticalCategoryCannotBeDisabledError extends BusinessRuleError {
  constructor(category: string) {
    super(
      `Critical notification category "${category}" cannot be disabled`,
      'CRITICAL_CATEGORY_CANNOT_BE_DISABLED',
      { category },
    );
    this.name = 'CriticalCategoryCannotBeDisabledError';
  }
}
