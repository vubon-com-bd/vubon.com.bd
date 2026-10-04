/**
 * Device Domain Errors
 * @module auth-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class DeviceNotFoundError extends DomainError {
  readonly code = ERROR_CODE.AUTH_DEVICE_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(deviceId: string) {
    super(`Device not found: ${deviceId}`, { deviceId });
  }
}

export class UntrustedDeviceError extends DomainError {
  readonly code = ERROR_CODE.AUTH_UNTRUSTED_DEVICE;
  readonly httpStatus = 403;

  constructor(fingerprint: string) {
    super(`Untrusted device fingerprint: ${fingerprint}`, { fingerprint });
  }
}

export class DeviceAlreadyRegisteredError extends DomainError {
  readonly code = ERROR_CODE.AUTH_DEVICE_ALREADY_REGISTERED;
  readonly httpStatus = 409;

  constructor(fingerprint: string) {
    super(`Device already registered: ${fingerprint}`, { fingerprint });
  }
}
