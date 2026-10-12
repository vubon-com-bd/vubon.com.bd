/**
 * Vehicle domain errors
 * @module logistics-service/domain/errors
 */
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { VEHICLE_STATUS, VEHICLE_TYPE, VEHICLE_FUEL_TYPE, VEHICLE } from '@vubon/shared-constants/logistics';

const ALLOWED_STATUSES = Object.values(VEHICLE_STATUS) as readonly string[];
const ALLOWED_TYPES = Object.values(VEHICLE_TYPE) as readonly string[];
const ALLOWED_FUELS = Object.values(VEHICLE_FUEL_TYPE) as readonly string[];

export class VehicleNotFoundError extends NotFoundError {
  constructor(vehicleId: string) {
    super('Vehicle', vehicleId);
    this.name = 'VehicleNotFoundError';
  }
}

export class VehicleRegistrationAlreadyExistsError extends ConflictError {
  constructor(registrationNumber: string) {
    super(`Vehicle with registration "${registrationNumber}" already exists`, 'registrationNumber');
    this.name = 'VehicleRegistrationAlreadyExistsError';
  }
}

export class InvalidVehicleStatusError extends ValidationError {
  constructor(value: string) {
    super(`Invalid vehicle status "${value}". Allowed: ${ALLOWED_STATUSES.join(', ')}`, 'status');
    this.name = 'InvalidVehicleStatusError';
  }
}

export class InvalidVehicleTypeError extends ValidationError {
  constructor(value: string) {
    super(`Invalid vehicle type "${value}". Allowed: ${ALLOWED_TYPES.join(', ')}`, 'type');
    this.name = 'InvalidVehicleTypeError';
  }
}

export class InvalidVehicleFuelTypeError extends ValidationError {
  constructor(value: string) {
    super(`Invalid vehicle fuel type "${value}". Allowed: ${ALLOWED_FUELS.join(', ')}`, 'fuelType');
    this.name = 'InvalidVehicleFuelTypeError';
  }
}

export class InvalidVehicleStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string) {
    super(
      `Cannot transition vehicle status from "${from}" to "${to}"`,
      'INVALID_VEHICLE_STATUS_TRANSITION',
      { from, to },
    );
    this.name = 'InvalidVehicleStatusTransitionError';
  }
}

export class VehicleNotAvailableError extends BusinessRuleError {
  constructor(vehicleId: string, status: string) {
    super(
      `Vehicle "${vehicleId}" is not available (status: ${status})`,
      'VEHICLE_NOT_AVAILABLE',
      { vehicleId, status },
    );
    this.name = 'VehicleNotAvailableError';
  }
}

export class VehicleCapacityExceededError extends BusinessRuleError {
  constructor(vehicleId: string, requestedKg: number, maxKg: number) {
    super(
      `Vehicle "${vehicleId}" capacity exceeded: requested ${requestedKg}kg, max ${maxKg}kg`,
      'VEHICLE_CAPACITY_EXCEEDED',
      { vehicleId, requestedKg, maxKg, limit: VEHICLE.MAX_WEIGHT_KG },
    );
    this.name = 'VehicleCapacityExceededError';
  }
}
