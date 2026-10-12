/**
 * Driver domain errors
 * @module logistics-service/domain/errors
 */
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { DRIVER_STATUS, DRIVER_TYPE, DRIVER_LICENSE_TYPE, DRIVER } from '@vubon/shared-constants/logistics';

const ALLOWED_STATUSES = Object.values(DRIVER_STATUS) as readonly string[];
const ALLOWED_TYPES = Object.values(DRIVER_TYPE) as readonly string[];
const ALLOWED_LICENSE_TYPES = Object.values(DRIVER_LICENSE_TYPE) as readonly string[];

export class DriverNotFoundError extends NotFoundError {
  constructor(driverId: string) {
    super('Driver', driverId);
    this.name = 'DriverNotFoundError';
  }
}

export class DriverLicenseAlreadyExistsError extends ConflictError {
  constructor(licenseNumber: string) {
    super(`Driver with license "${licenseNumber}" already exists`, 'licenseNumber');
    this.name = 'DriverLicenseAlreadyExistsError';
  }
}

export class InvalidDriverStatusError extends ValidationError {
  constructor(value: string) {
    super(`Invalid driver status "${value}". Allowed: ${ALLOWED_STATUSES.join(', ')}`, 'status');
    this.name = 'InvalidDriverStatusError';
  }
}

export class InvalidDriverTypeError extends ValidationError {
  constructor(value: string) {
    super(`Invalid driver type "${value}". Allowed: ${ALLOWED_TYPES.join(', ')}`, 'type');
    this.name = 'InvalidDriverTypeError';
  }
}

export class InvalidDriverLicenseTypeError extends ValidationError {
  constructor(value: string) {
    super(`Invalid driver license type "${value}". Allowed: ${ALLOWED_LICENSE_TYPES.join(', ')}`, 'licenseType');
    this.name = 'InvalidDriverLicenseTypeError';
  }
}

export class InvalidDriverStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string) {
    super(
      `Cannot transition driver status from "${from}" to "${to}"`,
      'INVALID_DRIVER_STATUS_TRANSITION',
      { from, to },
    );
    this.name = 'InvalidDriverStatusTransitionError';
  }
}

export class DriverLicenseExpiredError extends BusinessRuleError {
  constructor(driverId: string, expiresAt: string) {
    super(
      `Driver "${driverId}" license expired on ${expiresAt}`,
      'DRIVER_LICENSE_EXPIRED',
      { driverId, expiresAt },
    );
    this.name = 'DriverLicenseExpiredError';
  }
}

export class DriverNotAvailableForAssignmentError extends BusinessRuleError {
  constructor(driverId: string, status: string) {
    super(
      `Driver "${driverId}" is not available for assignment (status: ${status})`,
      'DRIVER_NOT_AVAILABLE_FOR_ASSIGNMENT',
      { driverId, status },
    );
    this.name = 'DriverNotAvailableForAssignmentError';
  }
}

export class DriverCashLimitExceededError extends BusinessRuleError {
  constructor(driverId: string, current: number, limit: number) {
    super(
      `Driver "${driverId}" cash limit exceeded: ${current}/${limit}`,
      'DRIVER_CASH_LIMIT_EXCEEDED',
      { driverId, current, limit, max: DRIVER.MAX_CASH_LIMIT },
    );
    this.name = 'DriverCashLimitExceededError';
  }
}
