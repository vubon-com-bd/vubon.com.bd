/**
 * Preference / Device Application Errors
 * @module notification-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

// ═══ Preference ═══
export class PreferenceNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(userId: string) {
    super('NotificationPreference', userId);
    this.name = 'PreferenceNotFoundApplicationError';
  }
}

export class PreferenceValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'PreferenceValidationError';
  }
}

export class QuietHoursInvalidError extends ApplicationValidationError {
  constructor(start: number, end: number) {
    super(`Quiet hours invalid (start=${start}, end=${end})`, 'quietHours');
    this.name = 'QuietHoursInvalidError';
  }
}

// ═══ Device ═══
export class DeviceNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(deviceId: string) {
    super('NotificationDevice', deviceId);
    this.name = 'DeviceNotFoundApplicationError';
  }
}

export class MaxDevicesReachedError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 422;
  constructor(userId: string, max: number) {
    super(`User "${userId}" reached max device limit (${max})`, { userId, max });
    this.name = 'MaxDevicesReachedError';
  }
}

export class DeviceValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'DeviceValidationError';
  }
}
