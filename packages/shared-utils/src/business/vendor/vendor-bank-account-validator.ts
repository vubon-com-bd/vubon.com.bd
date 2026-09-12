import { VENDOR_BANK_ACCOUNT } from '@vubon/shared-constants/src/business/vendor/vendor-bank-account.constants';

export interface VendorBankAccountInput {
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  type: string;
  accountType: string;
}

export const validateVendorBankAccount = (
  account: Partial<VendorBankAccountInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!account.bankName) errors.push('Bank name is required');
  if (!account.accountNumber) errors.push('Account number is required');
  if (!account.routingNumber) errors.push('Routing number is required');
  if (account.type && !Object.keys(VENDOR_BANK_ACCOUNT.TYPES).includes(account.type)) {
    errors.push('Invalid account type');
  }
  if (
    account.accountType &&
    !Object.keys(VENDOR_BANK_ACCOUNT.ACCOUNT_TYPES).includes(account.accountType)
  ) {
    errors.push('Invalid account category');
  }
  return { isValid: errors.length === 0, errors };
};
