/**
 * Shipping method domain errors
 * @module logistics-service/domain/errors
 */
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { SHIPPING_METHOD, SHIPPING_METHOD_STATUS, SHIPPING_RATE_TYPE } from '@vubon/shared-constants/logistics';

const ALLOWED_METHODS = Object.values(SHIPPING_METHOD) as readonly string[];
const ALLOWED_STATUSES = Object.values(SHIPPING_METHOD_STATUS) as readonly string[];
const ALLOWED_RATE_TYPES = Object.values(SHIPPING_RATE_TYPE) as readonly string[];

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

export class InvalidShippingMethodValueError extends ValidationError {
  constructor(value: string) {
    super(`Invalid shipping method "${value}". Allowed: ${ALLOWED_METHODS.join(', ')}`, 'method');
    this.name = 'InvalidShippingMethodValueError';
  }
}

export class InvalidShippingMethodStatusError extends ValidationError {
  constructor(value: string) {
    super(`Invalid shipping method status "${value}". Allowed: ${ALLOWED_STATUSES.join(', ')}`, 'status');
    this.name = 'InvalidShippingMethodStatusError';
  }
}

export class InvalidShippingRateTypeError extends ValidationError {
  constructor(value: string) {
    super(`Invalid shipping rate type "${value}". Allowed: ${ALLOWED_RATE_TYPES.join(', ')}`, 'rateType');
    this.name = 'InvalidShippingRateTypeError';
  }
}

export class InvalidShippingMethodStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string) {
    super(
      `Cannot transition shipping method status from "${from}" to "${to}"`,
      'INVALID_SHIPPING_METHOD_STATUS_TRANSITION',
      { from, to },
    );
    this.name = 'InvalidShippingMethodStatusTransitionError';
  }
}

export class ShippingMethodNotActiveError extends BusinessRuleError {
  constructor(methodId: string, status: string) {
    super(
      `Shipping method "${methodId}" is not active (status: ${status})`,
      'SHIPPING_METHOD_NOT_ACTIVE',
      { methodId, status },
    );
    this.name = 'ShippingMethodNotActiveError';
  }
}

export class ShippingMethodWeightLimitExceededError extends BusinessRuleError {
  constructor(actual: number, max: number) {
    super(
      `Shipping weight ${actual}kg exceeds method limit ${max}kg`,
      'SHIPPING_WEIGHT_LIMIT_EXCEEDED',
      { actual, max },
    );
    this.name = 'ShippingMethodWeightLimitExceededError';
  }
}
