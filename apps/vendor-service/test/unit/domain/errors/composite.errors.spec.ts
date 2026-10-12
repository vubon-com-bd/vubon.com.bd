/**
 * Composite VO errors — unit tests
 * @module vendor-service/test/unit/domain/errors
 */
import {
  InvalidVendorIdentityError,
  InvalidVendorContactError,
  InvalidVendorLocationError,
  InvalidVendorBankAccountError,
  InvalidVendorCommissionConfigError,
  InvalidVendorPayoutConfigError,
} from '../../../../src/module/domain/errors/composite.errors.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('Composite VO errors', () => {
  it('InvalidVendorIdentityError extends ValidationError', () => {
    const e = new InvalidVendorIdentityError('bad identity');
    expect(e).toBeInstanceOf(ValidationError);
    expect(e.name).toBe('InvalidVendorIdentityError');
    expect(e.field).toBe('vendorIdentity');
    expect(e.message).toBe('bad identity');
  });

  it('InvalidVendorContactError extends ValidationError', () => {
    const e = new InvalidVendorContactError('bad contact');
    expect(e).toBeInstanceOf(ValidationError);
    expect(e.name).toBe('InvalidVendorContactError');
    expect(e.field).toBe('vendorContact');
  });

  it('InvalidVendorLocationError extends ValidationError', () => {
    const e = new InvalidVendorLocationError('bad location');
    expect(e).toBeInstanceOf(ValidationError);
    expect(e.name).toBe('InvalidVendorLocationError');
    expect(e.field).toBe('vendorLocation');
  });

  it('InvalidVendorBankAccountError extends ValidationError', () => {
    const e = new InvalidVendorBankAccountError('bad bank');
    expect(e).toBeInstanceOf(ValidationError);
    expect(e.name).toBe('InvalidVendorBankAccountError');
    expect(e.field).toBe('vendorBankAccount');
  });

  it('InvalidVendorCommissionConfigError extends ValidationError', () => {
    const e = new InvalidVendorCommissionConfigError('bad commission');
    expect(e).toBeInstanceOf(ValidationError);
    expect(e.name).toBe('InvalidVendorCommissionConfigError');
    expect(e.field).toBe('vendorCommissionConfig');
  });

  it('InvalidVendorPayoutConfigError extends ValidationError', () => {
    const e = new InvalidVendorPayoutConfigError('bad payout');
    expect(e).toBeInstanceOf(ValidationError);
    expect(e.name).toBe('InvalidVendorPayoutConfigError');
    expect(e.field).toBe('vendorPayoutConfig');
  });

  it('all have 422 status code', () => {
    expect(new InvalidVendorIdentityError('x').httpStatus).toBe(422);
    expect(new InvalidVendorContactError('x').httpStatus).toBe(422);
    expect(new InvalidVendorLocationError('x').httpStatus).toBe(422);
  });
});
