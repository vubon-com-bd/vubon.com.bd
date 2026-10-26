/**
 * Preference Application Errors
 * @module notification-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import {
  ApplicationError,
  ApplicationNotFoundError,
  ApplicationValidationError,
  CommandError,
  QueryError,
} from '@vubon/shared-kernel/application/errors';

export class PreferenceNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(userId: string) {
    super('Preference', userId);
    this.name = 'PreferenceNotFoundApplicationError';
  }
}

export class PreferenceValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'PreferenceValidationError';
  }
}

export class PreferenceUpdateError extends CommandError {
  constructor(userId: string, reason: string) {
    super(`Preference for user "${userId}" update failed: ${reason}`, 'UpdatePreference');
    this.name = 'PreferenceUpdateError';
  }
}

export class PreferenceLockedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 409;

  constructor(userId: string) {
    super(`Preference for user "${userId}" is locked`, { userId });
    this.name = 'PreferenceLockedApplicationError';
  }
}

export class PreferenceQueryError extends QueryError {
  constructor(reason: string) {
    super(`Preference query failed: ${reason}`, 'PreferenceQuery');
    this.name = 'PreferenceQueryError';
  }
}
