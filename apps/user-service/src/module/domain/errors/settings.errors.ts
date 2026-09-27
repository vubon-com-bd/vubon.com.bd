/**
 * Settings domain errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class SettingsNotFoundError extends NotFoundError {
  constructor(userId: string) {
    super('UserSettings', userId);
    this.name = 'SettingsNotFoundError';
  }
}

export class InvalidSettingError extends ValidationError {
  constructor(key: string, reason: string) {
    super(`Invalid setting "${key}": ${reason}`, 'setting');
    this.name = 'InvalidSettingError';
  }
}
