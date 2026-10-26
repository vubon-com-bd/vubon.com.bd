/* istanbul ignore file -- pure error declarations */
/**
 * Device Domain Errors
 * @module notification-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class DeviceNotFoundError extends NotFoundError {
  constructor(deviceId: string) {
    super('Device', deviceId);
    this.name = 'DeviceNotFoundError';
  }
}

// ─── Conflict (409) ────────────────────────
export class DeviceTokenAlreadyRegisteredError extends ConflictError {
  constructor(token: string) {
    super(`Device token "${token.slice(0, 12)}..." already registered`, 'token');
    this.name = 'DeviceTokenAlreadyRegisteredError';
  }
}

export class DeviceLimitExceededError extends ConflictError {
  constructor(userId: string, max: number) {
    super(`User "${userId}" has reached device limit (${max})`, 'userId');
    this.name = 'DeviceLimitExceededError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidDeviceStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid device status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidDeviceStatusError';
  }
}

export class InvalidDeviceTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid device type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidDeviceTypeError';
  }
}

export class InvalidDevicePlatformError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid device platform "${value}". Allowed: ${allowed.join(', ')}`, 'platform');
    this.name = 'InvalidDevicePlatformError';
  }
}

export class InvalidDeviceTokenError extends ValidationError {
  constructor(reason: string) {
    super(`Invalid device token: ${reason}`, 'token');
    this.name = 'InvalidDeviceTokenError';
  }
}

// ─── Business Rule (400) ───────────────────
export class DeviceInactiveError extends BusinessRuleError {
  constructor(deviceId: string, lastActiveAt: string) {
    super(
      `Device "${deviceId}" is inactive since ${lastActiveAt}`,
      'DEVICE_INACTIVE',
      { deviceId, lastActiveAt },
    );
    this.name = 'DeviceInactiveError';
  }
}

export class DeviceBlockedError extends BusinessRuleError {
  constructor(deviceId: string) {
    super(`Device "${deviceId}" is blocked`, 'DEVICE_BLOCKED', { deviceId });
    this.name = 'DeviceBlockedError';
  }
}
