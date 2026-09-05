/**
 * Bank Account Validator
 * ব্যাংক অ্যাকাউন্ট ভ্যালিডেটর
 */

import { REGEX } from '@vubon/shared-constants';

export interface BankAccountValidationResult {
  valid: boolean;
  errors: string[];
}

export interface BankAccountDetails {
  accountNumber: string;
  routingNumber?: string;
  swiftCode?: string;
  bankName: string;
  accountName: string;
  accountType: 'savings' | 'current' | 'business';
}

export const validateBankAccount = (account: BankAccountDetails): BankAccountValidationResult => {
  const errors: string[] = [];

  // Account number validation using REGEX
  if (!account.accountNumber || account.accountNumber.length < 8) {
    errors.push('Account number must be at least 8 characters');
  }

  // Use REGEX.ONLY_NUMBERS for account number validation
  if (account.accountNumber && !REGEX.ONLY_NUMBERS.test(account.accountNumber)) {
    errors.push('Account number must contain only digits');
  }

  // Routing number validation (optional)
  if (account.routingNumber) {
    if (!REGEX.ONLY_NUMBERS.test(account.routingNumber) || account.routingNumber.length !== 9) {
      errors.push('Routing number must be 9 digits');
    }
  }

  // SWIFT code validation (optional) - using REGEX pattern
  if (account.swiftCode) {
    const swiftRegex = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
    if (!swiftRegex.test(account.swiftCode)) {
      errors.push('Invalid SWIFT code format');
    }
  }

  // Bank name validation
  if (!account.bankName || account.bankName.length < 2) {
    errors.push('Bank name is required');
  }

  // Account name validation
  if (!account.accountName || account.accountName.length < 2) {
    errors.push('Account name is required');
  }

  // Account type validation
  if (!['savings', 'current', 'business'].includes(account.accountType)) {
    errors.push('Invalid account type');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const validateBankAccountNumber = (accountNumber: string): boolean => {
  return (
    REGEX.ONLY_NUMBERS.test(accountNumber) &&
    accountNumber.length >= 8 &&
    accountNumber.length <= 20
  );
};

export const validateRoutingNumber = (routingNumber: string): boolean => {
  return REGEX.ONLY_NUMBERS.test(routingNumber) && routingNumber.length === 9;
};

export const validateSwiftCode = (swiftCode: string): boolean => {
  const swiftRegex = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
  return swiftRegex.test(swiftCode);
};

export const validateIBAN = (iban: string): boolean => {
  // Simplified IBAN validation
  const ibanPattern = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4,}$/;
  return ibanPattern.test(iban);
};

export const maskAccountNumber = (accountNumber: string): string => {
  if (accountNumber.length <= 8) {
    return accountNumber;
  }
  const last4 = accountNumber.slice(-4);
  const masked = '****' + last4;
  return masked;
};
