/**
 * Notification preference / device domain errors
 * @module notification-service/domain/errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

// ═══ Preference ═══
export class PreferenceNotFoundError extends NotFoundError {
  constructor(userId: string) {
    super('NotificationPreference', userId);
    this.name = 'PreferenceNotFoundError';
  }
}

export class InvalidPreferenceTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid preference type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidPreferenceTypeError';
  }
}

export class InvalidPreferenceFrequencyError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid preference frequency "${value}". Allowed: ${allowed.join(', ')}`, 'frequency');
    this.name = 'InvalidPreferenceFrequencyError';
  }
}

export class QuietHoursInvalidError extends ValidationError {
  constructor(start: number, end: number) {
    super(`Quiet hours invalid: start=${start}, end=${end}`, 'quietHours');
    this.name = 'QuietHoursInvalidError';
  }
}

// ═══ Device ═══
export class DeviceNotFoundError extends NotFoundError {
  constructor(deviceId: string) {
    super('NotificationDevice', deviceId);
    this.name = 'DeviceNotFoundError';
  }
}

export class InvalidDeviceTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid device type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidDeviceTypeError';
  }
}

export class InvalidDeviceStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid device status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidDeviceStatusError';
  }
}

export class MaxDevicesReachedError extends BusinessRuleError {
  constructor(userId: string, max: number) {
    super(
      `User "${userId}" has reached max device limit (${max})`,
      'MAX_DEVICES_REACHED',
      { userId, max },
    );
    this.name = 'MaxDevicesReachedError';
  }
}
