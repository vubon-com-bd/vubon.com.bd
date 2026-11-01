/**
 * Address Domain Errors
 * @module identity-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class AddressLimitReachedError extends BusinessRuleError {
  constructor(userId: string, limit: number) {
    super(`Max addresses (${limit}) reached for user "${userId}"`,
      'ADDRESS_LIMIT_REACHED', { userId, limit });
    this.name = 'AddressLimitReachedError';
  }
}

export class AddressNotFoundError2 extends NotFoundError {
  constructor(addressId: string) {
    super('Address', addressId);
    this.name = 'AddressNotFoundError2';
  }
}

export class InvalidPostalCodeError extends ValidationError {
  constructor(value: string) {
    super(`Invalid postal code "${value}"`, 'postalCode');
    this.name = 'InvalidPostalCodeError';
  }
}

export class AddressVerificationRequiredError extends BusinessRuleError {
  constructor(addressId: string) {
    super(`Address "${addressId}" must be verified first`,
      'ADDRESS_VERIFICATION_REQUIRED', { addressId });
    this.name = 'AddressVerificationRequiredError';
  }
}

export class DefaultAddressRequiredError extends BusinessRuleError {
  constructor(userId: string) {
    super(`User "${userId}" must have at least one default address`,
      'DEFAULT_ADDRESS_REQUIRED', { userId });
    this.name = 'DefaultAddressRequiredError';
  }
}
