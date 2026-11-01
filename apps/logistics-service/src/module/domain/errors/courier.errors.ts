/**
 * Courier Domain Errors
 * @module logistics-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────
export class CourierNotFoundError extends NotFoundError {
  constructor(courierId: string) {
    super('Courier', courierId);
    this.name = 'CourierNotFoundError';
  }
}

// ─── Conflict (409) ────────────────────
export class CourierAlreadyExistsError extends ConflictError {
  constructor(code: string) {
    super(`Courier with code "${code}" already exists`, 'code');
    this.name = 'CourierAlreadyExistsError';
  }
}

// ─── Validation (422) ──────────────────
export class InvalidCourierStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid courier status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidCourierStatusError';
  }
}

export class InvalidCourierTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid courier type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidCourierTypeError';
  }
}

export class InvalidCourierNameError extends ValidationError {
  constructor(value: string, reason?: string) {
    super(`Invalid courier name "${value}"${reason ? `: ${reason}` : ''}`, 'name');
    this.name = 'InvalidCourierNameError';
  }
}

// ─── Business Rule (400) ───────────────
export class CourierUnavailableError extends BusinessRuleError {
  constructor(courierId: string, status: string) {
    super(
      `Courier "${courierId}" is not available (status: "${status}")`,
      'COURIER_UNAVAILABLE',
      { courierId, status },
    );
    this.name = 'CourierUnavailableError';
  }
}

export class CourierNotSupportCODError extends BusinessRuleError {
  constructor(courierId: string) {
    super(`Courier "${courierId}" does not support COD`, 'COURIER_NO_COD', { courierId });
    this.name = 'CourierNotSupportCODError';
  }
}

export class CourierNotSupportInsuranceError extends BusinessRuleError {
  constructor(courierId: string) {
    super(
      `Courier "${courierId}" does not support insurance`,
      'COURIER_NO_INSURANCE',
      { courierId },
    );
    this.name = 'CourierNotSupportInsuranceError';
  }
}

export class CourierNotSupportInternationalError extends BusinessRuleError {
  constructor(courierId: string) {
    super(
      `Courier "${courierId}" does not support international shipments`,
      'COURIER_NO_INTERNATIONAL',
      { courierId },
    );
    this.name = 'CourierNotSupportInternationalError';
  }
}

export class CourierZoneNotCoveredError extends BusinessRuleError {
  constructor(courierId: string, zone: string) {
    super(
      `Courier "${courierId}" does not cover zone "${zone}"`,
      'COURIER_ZONE_NOT_COVERED',
      { courierId, zone },
    );
    this.name = 'CourierZoneNotCoveredError';
  }
}

export class CourierCannotBeDeletedError extends BusinessRuleError {
  constructor(courierId: string, status: string) {
    super(
      `Courier "${courierId}" cannot be deleted in status "${status}"`,
      'COURIER_CANNOT_BE_DELETED',
      { courierId, status },
    );
    this.name = 'CourierCannotBeDeletedError';
  }
}

export class CourierMaxLimitExceededError extends BusinessRuleError {
  constructor(actual: number, max: number) {
    super(`Courier count ${actual} exceeds max ${max}`, 'COURIER_LIMIT_EXCEEDED', {
      actual,
      max,
    });
    this.name = 'CourierMaxLimitExceededError';
  }
}
