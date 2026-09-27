/**
 * Address domain errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class AddressNotFoundError extends NotFoundError {
  constructor(addressId: string) {
    super('UserAddress', addressId);
    this.name = 'AddressNotFoundError';
  }
}

export class AddressLimitExceededError extends BusinessRuleError {
  constructor(current: number, max: number) {
    super(
      `Address limit exceeded: ${current}/${max}`,
      'ADDRESS_LIMIT_EXCEEDED'
    );
    this.name = 'AddressLimitExceededError';
  }
}

export class InvalidPostalCodeError extends ValidationError {
  constructor(value: string) {
    super(`Invalid BD postal code "${value}". Must be 4 digits.`, 'postalCode');
    this.name = 'InvalidPostalCodeError';
  }
}

export class DistrictDivisionMismatchError extends BusinessRuleError {
  constructor(district: string, division: string) {
    super(
      `District "${district}" does not belong to division "${division}"`,
      'DISTRICT_DIVISION_MISMATCH'
    );
    this.name = 'DistrictDivisionMismatchError';
  }
}

export class InvalidDivisionError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid division "${value}". Allowed: ${allowed.join(', ')}`, 'division');
    this.name = 'InvalidDivisionError';
  }
}

export class InvalidDistrictError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid district "${value}". Allowed: ${allowed.join(', ')}`, 'district');
    this.name = 'InvalidDistrictError';
  }
}
