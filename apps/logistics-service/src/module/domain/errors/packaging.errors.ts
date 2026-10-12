/**
 * Packaging domain errors
 * @module logistics-service/domain/errors
 */
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { PACKAGING_TYPE, PACKAGING_MATERIAL, PACKAGING_STATUS, PACKAGING } from '@vubon/shared-constants/logistics';

const ALLOWED_TYPES = Object.values(PACKAGING_TYPE) as readonly string[];
const ALLOWED_MATERIALS = Object.values(PACKAGING_MATERIAL) as readonly string[];
const ALLOWED_STATUSES = Object.values(PACKAGING_STATUS) as readonly string[];

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
  constructor(value: string) {
    super(`Invalid packaging type "${value}". Allowed: ${ALLOWED_TYPES.join(', ')}`, 'type');
    this.name = 'InvalidPackagingTypeError';
  }
}

export class InvalidPackagingMaterialError extends ValidationError {
  constructor(value: string) {
    super(`Invalid packaging material "${value}". Allowed: ${ALLOWED_MATERIALS.join(', ')}`, 'material');
    this.name = 'InvalidPackagingMaterialError';
  }
}

export class InvalidPackagingStatusError extends ValidationError {
  constructor(value: string) {
    super(`Invalid packaging status "${value}". Allowed: ${ALLOWED_STATUSES.join(', ')}`, 'status');
    this.name = 'InvalidPackagingStatusError';
  }
}

export class InvalidPackagingStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string) {
    super(
      `Cannot transition packaging status from "${from}" to "${to}"`,
      'INVALID_PACKAGING_STATUS_TRANSITION',
      { from, to },
    );
    this.name = 'InvalidPackagingStatusTransitionError';
  }
}

export class PackagingOutOfStockError extends BusinessRuleError {
  constructor(packagingId: string) {
    super(
      `Packaging "${packagingId}" is out of stock`,
      'PACKAGING_OUT_OF_STOCK',
      { packagingId },
    );
    this.name = 'PackagingOutOfStockError';
  }
}

export class PackagingWeightLimitExceededError extends BusinessRuleError {
  constructor(actual: number, max: number) {
    super(
      `Packaging weight ${actual}kg exceeds limit ${max}kg`,
      'PACKAGING_WEIGHT_LIMIT_EXCEEDED',
      { actual, max, limit: PACKAGING.MAX_PACKAGE_WEIGHT_KG },
    );
    this.name = 'PackagingWeightLimitExceededError';
  }
}

export class PackagingDimensionLimitExceededError extends BusinessRuleError {
  constructor(actual: number, max: number, dimension: string) {
    super(
      `Packaging ${dimension} ${actual}cm exceeds limit ${max}cm`,
      'PACKAGING_DIMENSION_LIMIT_EXCEEDED',
      { actual, max, dimension },
    );
    this.name = 'PackagingDimensionLimitExceededError';
  }
}
