/**
 * Vendor Bank Account Validator
 * ভেন্ডর ব্যাংক অ্যাকাউন্ট ভ্যালিডেটর
 */

import { REGEX } from '@vubon/shared-constants';
import { VendorPayoutSchema } from '@vubon/shared-schemas';
import type { VendorBankAccount } from '@vubon/shared-types';

export interface VendorBankAccountValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: VendorBankAccount;
}

export const validateVendorBankAccount = (data: unknown): VendorBankAccountValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid bank account data'] },
    };
  }

  const account = data as Record<string, unknown>;

  // Vendor ID validation
  if (!account.vendorId || typeof account.vendorId !== 'string') {
    errors.vendorId = ['Vendor ID is required'];
    valid = false;
  }

  // Account type validation
  if (account.accountType) {
    const validTypes = ['savings', 'current', 'business'];
    if (!validTypes.includes(account.accountType as string)) {
      errors.accountType = ['Invalid account type'];
      valid = false;
    }
  } else {
    errors.accountType = ['Account type is required'];
    valid = false;
  }

  // Bank name validation
  if (!account.bankName || typeof account.bankName !== 'string' || account.bankName.length < 2) {
    errors.bankName = ['Bank name is required'];
    valid = false;
  }

  // Account number validation - REGEX ব্যবহার
  if (
    !account.accountNumber ||
    typeof account.accountNumber !== 'string' ||
    account.accountNumber.length < 8
  ) {
    errors.accountNumber = ['Account number must be at least 8 characters'];
    valid = false;
  } else if (!REGEX.ONLY_NUMBERS.test(account.accountNumber as string)) {
    errors.accountNumber = ['Account number must contain only digits'];
    valid = false;
  }

  // Account name validation
  if (
    !account.accountName ||
    typeof account.accountName !== 'string' ||
    account.accountName.length < 2
  ) {
    errors.accountName = ['Account name is required'];
    valid = false;
  }

  // Routing number validation (optional) - REGEX ব্যবহার
  if (account.routingNumber && typeof account.routingNumber === 'string') {
    if (!REGEX.ONLY_NUMBERS.test(account.routingNumber) || account.routingNumber.length !== 9) {
      errors.routingNumber = ['Routing number must be 9 digits'];
      valid = false;
    }
  }

  // Swift code validation (optional)
  if (account.swiftCode && typeof account.swiftCode === 'string') {
    if (!/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(account.swiftCode)) {
      errors.swiftCode = ['Invalid SWIFT code format'];
      valid = false;
    }
  }

  try {
    const validatedData = VendorPayoutSchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as unknown as VendorBankAccount,
    };
  } catch {
    return {
      valid,
      errors,
    };
  }
};

export const validateVendorBankAccountCreate = (
  data: unknown
): VendorBankAccountValidationResult => {
  return validateVendorBankAccount(data);
};

export const validateVendorBankAccountUpdate = (
  data: unknown
): VendorBankAccountValidationResult => {
  return validateVendorBankAccount(data);
};
