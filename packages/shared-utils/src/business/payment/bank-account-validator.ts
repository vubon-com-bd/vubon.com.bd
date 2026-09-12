export interface BankAccountData {
  bankName: string;
  accountNumber: string;
  routingNumber: string;
}

export const validateBankAccount = (
  account: Partial<BankAccountData>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!account.bankName) errors.push('Bank name is required');
  if (!account.accountNumber) errors.push('Account number is required');
  if (!account.routingNumber) errors.push('Routing number is required');
  if (account.accountNumber && !/^[0-9]{10,17}$/.test(account.accountNumber)) {
    errors.push('Invalid account number format');
  }
  if (account.routingNumber && !/^[0-9]{9}$/.test(account.routingNumber)) {
    errors.push('Invalid routing number format');
  }
  return { isValid: errors.length === 0, errors };
};
