/**
 * Zone Domain Errors
 * @module logistics-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class ZoneNotFoundError extends NotFoundError {
  constructor(zoneId: string) {
    super('Zone', zoneId);
    this.name = 'ZoneNotFoundError';
  }
}

export class ZoneCodeAlreadyExistsError extends ConflictError {
  constructor(code: string) {
    super(`Zone with code "${code}" already exists`, 'code');
    this.name = 'ZoneCodeAlreadyExistsError';
  }
}

export class InvalidZoneStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid zone status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidZoneStatusError';
  }
}

export class InvalidZoneTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid zone type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidZoneTypeError';
  }
}

export class InvalidZonePricingTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(
      `Invalid zone pricing type "${value}". Allowed: ${allowed.join(', ')}`,
      'pricingType',
    );
    this.name = 'InvalidZonePricingTypeError';
  }
}

export class ZoneNotCoveredError extends BusinessRuleError {
  constructor(postalCode: string) {
    super(
      `Postal code "${postalCode}" is not covered by any zone`,
      'ZONE_NOT_COVERED',
      { postalCode },
    );
    this.name = 'ZoneNotCoveredError';
  }
}

export class ZoneAlreadyActiveError extends BusinessRuleError {
  constructor(zoneId: string) {
    super(
      `Zone "${zoneId}" is already active`,
      'ZONE_ALREADY_ACTIVE',
      { zoneId },
    );
    this.name = 'ZoneAlreadyActiveError';
  }
}

export class ZoneRestrictedError extends BusinessRuleError {
  constructor(zoneId: string, reason?: string) {
    super(
      `Zone "${zoneId}" is restricted${reason ? `: ${reason}` : ''}`,
      'ZONE_RESTRICTED',
      { zoneId, reason },
    );
    this.name = 'ZoneRestrictedError';
  }
}

export class ZoneShippingCostInvalidError extends ValidationError {
  constructor(value: number) {
    super(`Invalid shipping cost: ${value}`, 'shippingCost');
    this.name = 'ZoneShippingCostInvalidError';
  }
}

export class ZoneCODLimitExceededError extends BusinessRuleError {
  constructor(zoneId: string, amount: number, max: number, currency: string) {
    super(
      `Zone "${zoneId}" COD amount ${amount} ${currency} exceeds limit ${max} ${currency}`,
      'ZONE_COD_LIMIT_EXCEEDED',
      { zoneId, amount, max, currency },
    );
    this.name = 'ZoneCODLimitExceededError';
  }
}
