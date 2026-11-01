/**
 * Driver Domain Errors
 * @module logistics-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class DriverNotFoundError extends NotFoundError {
  constructor(driverId: string) {
    super('Driver', driverId);
    this.name = 'DriverNotFoundError';
  }
}

export class DriverLicenseAlreadyExistsError extends ConflictError {
  constructor(licenseNumber: string) {
    super(`Driver license "${licenseNumber}" already registered`, 'licenseNumber');
    this.name = 'DriverLicenseAlreadyExistsError';
  }
}

export class InvalidDriverStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid driver status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidDriverStatusError';
  }
}

export class InvalidDriverTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid driver type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidDriverTypeError';
  }
}

export class InvalidDriverLicenseTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(
      `Invalid driver license type "${value}". Allowed: ${allowed.join(', ')}`,
      'licenseType',
    );
    this.name = 'InvalidDriverLicenseTypeError';
  }
}

export class DriverLicenseExpiredError extends BusinessRuleError {
  constructor(driverId: string, expiresAt: string) {
    super(
      `Driver "${driverId}" license expired at ${expiresAt}`,
      'DRIVER_LICENSE_EXPIRED',
      { driverId, expiresAt },
    );
    this.name = 'DriverLicenseExpiredError';
  }
}

export class DriverNotAvailableError extends BusinessRuleError {
  constructor(driverId: string, status: string) {
    super(
      `Driver "${driverId}" is not available (status: "${status}")`,
      'DRIVER_NOT_AVAILABLE',
      { driverId, status },
    );
    this.name = 'DriverNotAvailableError';
  }
}

export class DriverOnDutyError extends BusinessRuleError {
  constructor(driverId: string) {
    super(
      `Driver "${driverId}" is already on duty`,
      'DRIVER_ON_DUTY',
      { driverId },
    );
    this.name = 'DriverOnDutyError';
  }
}

export class DriverCashLimitExceededError extends BusinessRuleError {
  constructor(driverId: string, cashInHand: number, cashLimit: number) {
    super(
      `Driver "${driverId}" cash limit exceeded (${cashInHand}/${cashLimit})`,
      'DRIVER_CASH_LIMIT_EXCEEDED',
      { driverId, cashInHand, cashLimit },
    );
    this.name = 'DriverCashLimitExceededError';
  }
}

export class DriverUnderageError extends ValidationError {
  constructor(age: number, minAge: number) {
    super(`Driver age ${age} is below minimum ${minAge}`, 'dateOfBirth');
    this.name = 'DriverUnderageError';
  }
}
