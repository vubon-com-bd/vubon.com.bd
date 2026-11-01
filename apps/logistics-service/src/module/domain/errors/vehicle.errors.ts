/**
 * Vehicle Domain Errors
 * @module logistics-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class VehicleNotFoundError extends NotFoundError {
  constructor(vehicleId: string) {
    super('Vehicle', vehicleId);
    this.name = 'VehicleNotFoundError';
  }
}

export class VehicleRegistrationAlreadyExistsError extends ConflictError {
  constructor(registrationNumber: string) {
    super(`Vehicle "${registrationNumber}" already exists`, 'registrationNumber');
    this.name = 'VehicleRegistrationAlreadyExistsError';
  }
}

export class InvalidVehicleStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid vehicle status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidVehicleStatusError';
  }
}

export class InvalidVehicleTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid vehicle type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidVehicleTypeError';
  }
}

export class InvalidVehicleFuelTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid vehicle fuel type "${value}". Allowed: ${allowed.join(', ')}`, 'fuelType');
    this.name = 'InvalidVehicleFuelTypeError';
  }
}

export class VehicleCapacityExceededError extends BusinessRuleError {
  constructor(vehicleId: string, requested: number, max: number, unit: string) {
    super(
      `Vehicle "${vehicleId}" capacity exceeded (${requested}/${max} ${unit})`,
      'VEHICLE_CAPACITY_EXCEEDED',
      { vehicleId, requested, max, unit },
    );
    this.name = 'VehicleCapacityExceededError';
  }
}

export class VehicleNotAvailableError extends BusinessRuleError {
  constructor(vehicleId: string, status: string) {
    super(
      `Vehicle "${vehicleId}" is not available (status: "${status}")`,
      'VEHICLE_NOT_AVAILABLE',
      { vehicleId, status },
    );
    this.name = 'VehicleNotAvailableError';
  }
}

export class VehicleInUseError extends BusinessRuleError {
  constructor(vehicleId: string) {
    super(
      `Vehicle "${vehicleId}" is currently in use`,
      'VEHICLE_IN_USE',
      { vehicleId },
    );
    this.name = 'VehicleInUseError';
  }
}

export class VehicleInsuranceExpiredError extends BusinessRuleError {
  constructor(vehicleId: string, expiresAt: string) {
    super(
      `Vehicle "${vehicleId}" insurance expired at ${expiresAt}`,
      'VEHICLE_INSURANCE_EXPIRED',
      { vehicleId, expiresAt },
    );
    this.name = 'VehicleInsuranceExpiredError';
  }
}

export class VehicleRegistrationExpiredError extends BusinessRuleError {
  constructor(vehicleId: string, expiresAt: string) {
    super(
      `Vehicle "${vehicleId}" registration expired at ${expiresAt}`,
      'VEHICLE_REGISTRATION_EXPIRED',
      { vehicleId, expiresAt },
    );
    this.name = 'VehicleRegistrationExpiredError';
  }
}
