/**
 * Packaging Domain Errors
 * @module logistics-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class PackagingNotFoundError extends NotFoundError {
  constructor(packagingId: string) {
    super('Packaging', packagingId);
    this.name = 'PackagingNotFoundError';
  }
}

export class PackagingCodeAlreadyExistsError extends ConflictError {
  constructor(code: string) {
    super(`Packaging with code "${code}" already exists`, 'code');
    this.name = 'PackagingCodeAlreadyExistsError';
  }
}

export class InvalidPackagingTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid packaging type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidPackagingTypeError';
  }
}

export class InvalidPackagingMaterialError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(
      `Invalid packaging material "${value}". Allowed: ${allowed.join(', ')}`,
      'material',
    );
    this.name = 'InvalidPackagingMaterialError';
  }
}

export class InvalidPackagingStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid packaging status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidPackagingStatusError';
  }
}

export class PackagingOutOfStockError extends BusinessRuleError {
  constructor(packagingId: string, requested: number, available: number) {
    super(
      `Packaging "${packagingId}" out of stock (requested ${requested}, available ${available})`,
      'PACKAGING_OUT_OF_STOCK',
      { packagingId, requested, available },
    );
    this.name = 'PackagingOutOfStockError';
  }
}

export class PackagingCapacityExceededError extends BusinessRuleError {
  constructor(packagingId: string, weightKg: number, maxKg: number) {
    super(
      `Packaging "${packagingId}" weight ${weightKg}kg exceeds max ${maxKg}kg`,
      'PACKAGING_CAPACITY_EXCEEDED',
      { packagingId, weightKg, maxKg },
    );
    this.name = 'PackagingCapacityExceededError';
  }
}

export class PackagingDimensionsExceededError extends BusinessRuleError {
  constructor(packagingId: string, dimensionCm: number, maxCm: number) {
    super(
      `Packaging "${packagingId}" dimension ${dimensionCm}cm exceeds max ${maxCm}cm`,
      'PACKAGING_DIMENSIONS_EXCEEDED',
      { packagingId, dimensionCm, maxCm },
    );
    this.name = 'PackagingDimensionsExceededError';
  }
}

export class PackagingNotSuitableError extends BusinessRuleError {
  constructor(packagingId: string, reason: string) {
    super(
      `Packaging "${packagingId}" not suitable: ${reason}`,
      'PACKAGING_NOT_SUITABLE',
      { packagingId, reason },
    );
    this.name = 'PackagingNotSuitableError';
  }
}
