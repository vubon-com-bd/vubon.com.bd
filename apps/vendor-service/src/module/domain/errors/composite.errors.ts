/**
 * Composite VO validation errors
 * @module vendor-service/domain/errors
 */
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class InvalidVendorIdentityError extends ValidationError {
  constructor(message: string) {
    super(message, 'vendorIdentity');
    this.name = 'InvalidVendorIdentityError';
  }
}

export class InvalidVendorContactError extends ValidationError {
  constructor(message: string) {
    super(message, 'vendorContact');
    this.name = 'InvalidVendorContactError';
  }
}

export class InvalidVendorLocationError extends ValidationError {
  constructor(message: string) {
    super(message, 'vendorLocation');
    this.name = 'InvalidVendorLocationError';
  }
}

export class InvalidVendorBankAccountError extends ValidationError {
  constructor(message: string) {
    super(message, 'vendorBankAccount');
    this.name = 'InvalidVendorBankAccountError';
  }
}

export class InvalidVendorCommissionConfigError extends ValidationError {
  constructor(message: string) {
    super(message, 'vendorCommissionConfig');
    this.name = 'InvalidVendorCommissionConfigError';
  }
}

export class InvalidVendorPayoutConfigError extends ValidationError {
  constructor(message: string) {
    super(message, 'vendorPayoutConfig');
    this.name = 'InvalidVendorPayoutConfigError';
  }
}
