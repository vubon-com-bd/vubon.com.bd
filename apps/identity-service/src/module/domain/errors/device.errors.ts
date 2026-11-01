/**
 * Device Domain Errors
 * @module identity-service/domain/errors
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
export class DeviceAlreadyTrustedError extends ConflictError {
  constructor(deviceId: string) {
    super(`Device "${deviceId}" is already trusted`, 'trusted');
    this.name = 'DeviceAlreadyTrustedError';
  }
}

export class DeviceAlreadyRegisteredError extends ConflictError {
  constructor(fingerprint: string) {
    super(`Device with fingerprint "${fingerprint}" already registered`, 'fingerprint');
    this.name = 'DeviceAlreadyRegisteredError';
  }
}

// ─── Business Rule (400) ───────────────────
export class DeviceLimitExceededError extends BusinessRuleError {
  constructor(userId: string, limit: number, current: number) {
    super(
      `Max devices (${limit}) reached for user "${userId}" (current: ${current})`,
      'DEVICE_LIMIT_EXCEEDED',
      { userId, limit, current },
    );
    this.name = 'DeviceLimitExceededError';
  }
}

export class DeviceNotTrustedError extends BusinessRuleError {
  constructor(deviceId: string) {
    super(
      `Device "${deviceId}" is not trusted`,
      'DEVICE_NOT_TRUSTED',
      { deviceId },
    );
    this.name = 'DeviceNotTrustedError';
  }
}

export class DeviceTrustExpiredError extends BusinessRuleError {
  constructor(deviceId: string, expiredAt: string) {
    super(
      `Device "${deviceId}" trust expired at ${expiredAt}`,
      'DEVICE_TRUST_EXPIRED',
      { deviceId, expiredAt },
    );
    this.name = 'DeviceTrustExpiredError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidDeviceTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid device type "${value}". Allowed: ${allowed.join(', ')}`, 'deviceType');
    this.name = 'InvalidDeviceTypeError';
  }
}
