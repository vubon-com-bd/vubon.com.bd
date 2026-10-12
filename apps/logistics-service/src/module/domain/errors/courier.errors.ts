/**
 * Courier domain errors
 * @module logistics-service/domain/errors
 */
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { COURIER_STATUS, COURIER_TYPE, COURIER_NAME } from '@vubon/shared-constants/logistics';

const ALLOWED_STATUSES = Object.values(COURIER_STATUS) as readonly string[];
const ALLOWED_TYPES = Object.values(COURIER_TYPE) as readonly string[];
const ALLOWED_NAMES = Object.values(COURIER_NAME) as readonly string[];

export class CourierNotFoundError extends NotFoundError {
  constructor(courierId: string) {
    super('Courier', courierId);
    this.name = 'CourierNotFoundError';
  }
}

export class CourierAlreadyExistsError extends ConflictError {
  constructor(code: string) {
    super(`Courier with code "${code}" already exists`, 'code');
    this.name = 'CourierAlreadyExistsError';
  }
}

export class InvalidCourierStatusError extends ValidationError {
  constructor(value: string) {
    super(`Invalid courier status "${value}". Allowed: ${ALLOWED_STATUSES.join(', ')}`, 'status');
    this.name = 'InvalidCourierStatusError';
  }
}

export class InvalidCourierTypeError extends ValidationError {
  constructor(value: string) {
    super(`Invalid courier type "${value}". Allowed: ${ALLOWED_TYPES.join(', ')}`, 'type');
    this.name = 'InvalidCourierTypeError';
  }
}

export class InvalidCourierCodeError extends ValidationError {
  constructor(value: string) {
    super(`Invalid courier code "${value}". Allowed: ${ALLOWED_NAMES.join(', ')}`, 'code');
    this.name = 'InvalidCourierCodeError';
  }
}

export class InvalidCourierStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string) {
    super(
      `Cannot transition courier status from "${from}" to "${to}"`,
      'INVALID_COURIER_STATUS_TRANSITION',
      { from, to },
    );
    this.name = 'InvalidCourierStatusTransitionError';
  }
}

export class CourierUnavailableError extends BusinessRuleError {
  constructor(courierId: string, reason: string) {
    super(
      `Courier "${courierId}" is unavailable: ${reason}`,
      'COURIER_UNAVAILABLE',
      { courierId, reason },
    );
    this.name = 'CourierUnavailableError';
  }
}

export class CourierCurrencyNotSupportedError extends BusinessRuleError {
  constructor(courierCode: string, currency: string) {
    super(
      `Courier "${courierCode}" does not support currency "${currency}"`,
      'COURIER_CURRENCY_UNSUPPORTED',
      { courierCode, currency },
    );
    this.name = 'CourierCurrencyNotSupportedError';
  }
}

export class CourierApiFailedError extends BusinessRuleError {
  constructor(courierCode: string, reason: string) {
    super(
      `Courier API call failed for "${courierCode}": ${reason}`,
      'COURIER_API_FAILED',
      { courierCode, reason },
    );
    this.name = 'CourierApiFailedError';
  }
}
