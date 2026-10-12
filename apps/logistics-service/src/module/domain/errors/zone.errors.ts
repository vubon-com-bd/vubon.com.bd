/**
 * Zone domain errors
 * @module logistics-service/domain/errors
 */
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ZONE_STATUS, ZONE_TYPE, ZONE_PRICING_TYPE } from '@vubon/shared-constants/logistics';

const ALLOWED_STATUSES = Object.values(ZONE_STATUS) as readonly string[];
const ALLOWED_TYPES = Object.values(ZONE_TYPE) as readonly string[];
const ALLOWED_PRICING = Object.values(ZONE_PRICING_TYPE) as readonly string[];

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
  constructor(value: string) {
    super(`Invalid zone status "${value}". Allowed: ${ALLOWED_STATUSES.join(', ')}`, 'status');
    this.name = 'InvalidZoneStatusError';
  }
}

export class InvalidZoneTypeError extends ValidationError {
  constructor(value: string) {
    super(`Invalid zone type "${value}". Allowed: ${ALLOWED_TYPES.join(', ')}`, 'type');
    this.name = 'InvalidZoneTypeError';
  }
}

export class InvalidZonePricingTypeError extends ValidationError {
  constructor(value: string) {
    super(`Invalid zone pricing type "${value}". Allowed: ${ALLOWED_PRICING.join(', ')}`, 'pricingType');
    this.name = 'InvalidZonePricingTypeError';
  }
}

export class InvalidZoneStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string) {
    super(
      `Cannot transition zone status from "${from}" to "${to}"`,
      'INVALID_ZONE_STATUS_TRANSITION',
      { from, to },
    );
    this.name = 'InvalidZoneStatusTransitionError';
  }
}

export class ZoneNotCoveredError extends BusinessRuleError {
  constructor(address: string) {
    super(
      `Address "${address}" is not covered by any active zone`,
      'ZONE_NOT_COVERED',
      { address },
    );
    this.name = 'ZoneNotCoveredError';
  }
}

export class ZoneRemoteSurchargeError extends BusinessRuleError {
  constructor(zoneId: string, surcharge: number) {
    super(
      `Zone "${zoneId}" is remote; surcharge ${surcharge} required`,
      'ZONE_REMOTE_SURCHARGE',
      { zoneId, surcharge },
    );
    this.name = 'ZoneRemoteSurchargeError';
  }
}
