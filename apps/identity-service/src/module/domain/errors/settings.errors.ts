/**
 * Settings Domain Errors
 * @module identity-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class SettingsNotFoundError extends NotFoundError {
  constructor(userId: string) {
    super('Settings', userId);
    this.name = 'SettingsNotFoundError';
  }
}

export class InvalidSettingKeyError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid setting key "${value}". Allowed: ${allowed.join(', ')}`, 'key');
    this.name = 'InvalidSettingKeyError';
  }
}

export class InvalidSettingValueError extends ValidationError {
  constructor(key: string, value: unknown) {
    super(`Invalid value for setting "${key}"`, 'value');
    this.name = 'InvalidSettingValueError';
    void value;
  }
}

export class SettingsUpdateRejectedError extends BusinessRuleError {
  constructor(reason: string) {
    super(`Settings update rejected: ${reason}`,
      'SETTINGS_UPDATE_REJECTED', { reason });
    this.name = 'SettingsUpdateRejectedError';
  }
}
