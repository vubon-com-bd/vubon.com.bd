/**
 * ShippingMethod Domain Errors
 * @module logistics-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class ShippingMethodNotFoundError extends NotFoundError {
  constructor(methodId: string) {
    super('ShippingMethod', methodId);
    this.name = 'ShippingMethodNotFoundError';
  }
}

export class ShippingMethodCodeAlreadyExistsError extends ConflictError {
  constructor(code: string) {
    super(`Shipping method with code "${code}" already exists`, 'code');
    this.name = 'ShippingMethodCodeAlreadyExistsError';
  }
}

export class InvalidShippingMethodStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(
      `Invalid shipping method status "${value}". Allowed: ${allowed.join(', ')}`,
      'status',
    );
    this.name = 'InvalidShippingMethodStatusError';
  }
}

export class InvalidShippingMethodTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid shipping method type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidShippingMethodTypeError';
  }
}

export class InvalidShippingRateTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(
      `Invalid shipping rate type "${value}". Allowed: ${allowed.join(', ')}`,
      'rateType',
    );
    this.name = 'InvalidShippingRateTypeError';
  }
}

export class ShippingMethodNotAvailableError extends BusinessRuleError {
  constructor(methodId: string, status: string) {
    super(
      `Shipping method "${methodId}" is not available (status: "${status}")`,
      'SHIPPING_METHOD_NOT_AVAILABLE',
      { methodId, status },
    );
    this.name = 'ShippingMethodNotAvailableError';
  }
}

export class ShippingMethodNotCoverZoneError extends BusinessRuleError {
  constructor(methodId: string, zone: string) {
    super(
      `Shipping method "${methodId}" does not cover zone "${zone}"`,
      'SHIPPING_METHOD_NOT_COVER_ZONE',
      { methodId, zone },
    );
    this.name = 'ShippingMethodNotCoverZoneError';
  }
}

export class ShippingWeightExceededError extends BusinessRuleError {
  constructor(methodId: string, weightKg: number, maxKg: number) {
    super(
      `Shipping method "${methodId}" weight ${weightKg}kg exceeds max ${maxKg}kg`,
      'SHIPPING_WEIGHT_EXCEEDED',
      { methodId, weightKg, maxKg },
    );
    this.name = 'ShippingWeightExceededError';
  }
}

export class ShippingMethodNotSupportCODError extends BusinessRuleError {
  constructor(methodId: string) {
    super(
      `Shipping method "${methodId}" does not support COD`,
      'SHIPPING_METHOD_NO_COD',
      { methodId },
    );
    this.name = 'ShippingMethodNotSupportCODError';
  }
}
