/**
 * User Profile Domain Errors
 * @module identity-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class ProfileNotFoundError extends NotFoundError {
  constructor(userId: string) {
    super('Profile', userId);
    this.name = 'ProfileNotFoundError';
  }
}

export class AddressNotFoundError extends NotFoundError {
  constructor(addressId: string) {
    super('Address', addressId);
    this.name = 'AddressNotFoundError';
  }
}

export class ContactNotFoundError extends NotFoundError {
  constructor(contactId: string) {
    super('Contact', contactId);
    this.name = 'ContactNotFoundError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidAddressTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid address type "${value}". Allowed: ${allowed.join(', ')}`, 'addressType');
    this.name = 'InvalidAddressTypeError';
  }
}

export class InvalidAddressError extends ValidationError {
  constructor(field: string, reason: string) {
    super(`Invalid address: ${reason}`, field);
    this.name = 'InvalidAddressError';
  }
}

// ─── Business Rule (400) ───────────────────
export class AddressLimitExceededError extends BusinessRuleError {
  constructor(userId: string, limit: number) {
    super(
      `Max addresses (${limit}) reached for user "${userId}"`,
      'ADDRESS_LIMIT_EXCEEDED',
      { userId, limit },
    );
    this.name = 'AddressLimitExceededError';
  }
}

export class CannotDeleteDefaultAddressError extends BusinessRuleError {
  constructor(addressId: string) {
    super(
      `Cannot delete default address "${addressId}"`,
      'CANNOT_DELETE_DEFAULT_ADDRESS',
      { addressId },
    );
    this.name = 'CannotDeleteDefaultAddressError';
  }
}
