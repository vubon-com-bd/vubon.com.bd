/**
 * Device Application Errors
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

export class DeviceNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(deviceId: string) {
    super('Device', deviceId);
    this.name = 'DeviceNotFoundApplicationError';
  }
}

export class DeviceValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'DeviceValidationError';
  }
}

export class DeviceRegistrationError extends CommandError {
  constructor(reason: string) {
    super(`Device registration failed: ${reason}`, 'RegisterDevice');
    this.name = 'DeviceRegistrationError';
  }
}

export class DeviceUpdateError extends CommandError {
  constructor(deviceId: string, reason: string) {
    super(`Device "${deviceId}" update failed: ${reason}`, 'UpdateDevice');
    this.name = 'DeviceUpdateError';
  }
}

export class DeviceLimitExceededApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(userId: string, max: number) {
    super(`Device limit (${max}) exceeded for user "${userId}"`, { userId, max });
    this.name = 'DeviceLimitExceededApplicationError';
  }
}

export class DeviceTokenConflictError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(token: string) {
    super(`Device token already registered`, { token: `${token.slice(0, 12)}...` });
    this.name = 'DeviceTokenConflictError';
  }
}

export class DeviceQueryError extends QueryError {
  constructor(reason: string) {
    super(`Device query failed: ${reason}`, 'DeviceQuery');
    this.name = 'DeviceQueryError';
  }
}
