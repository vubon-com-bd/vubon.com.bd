/**
 * User KYC Type Constants
 * Defines all possible user KYC types
 */

export const USER_KYC_TYPE = {
  NID: 'nid',
  PASSPORT: 'passport',
  BIRTH_CERTIFICATE: 'birth-certificate',
  DRIVING_LICENSE: 'driving-license',
  ADDRESS: 'address',
  UTILITY_BILL: 'utility-bill',
  BANK_STATEMENT: 'bank-statement',
  INCOME: 'income',
  TAX_RETURN: 'tax-return',
  INCOME_CERTIFICATE: 'income-certificate',
  BUSINESS: 'business',
  BUSINESS_LICENSE: 'business-license',
  TRADE_LICENSE: 'trade-license',
  VAT_REGISTRATION: 'vat-registration',
  TIN_CERTIFICATE: 'tin-certificate',
  COMPANY_REGISTRATION: 'company-registration',
} as const;

export type UserKYCType = (typeof USER_KYC_TYPE)[keyof typeof USER_KYC_TYPE];

export const USER_KYC_TYPE_LABELS: Record<UserKYCType, string> = {
  [USER_KYC_TYPE.NID]: 'National ID Card',
  [USER_KYC_TYPE.PASSPORT]: 'Passport',
  [USER_KYC_TYPE.BIRTH_CERTIFICATE]: 'Birth Certificate',
  [USER_KYC_TYPE.DRIVING_LICENSE]: 'Driving License',
  [USER_KYC_TYPE.ADDRESS]: 'Address Verification',
  [USER_KYC_TYPE.UTILITY_BILL]: 'Utility Bill',
  [USER_KYC_TYPE.BANK_STATEMENT]: 'Bank Statement',
  [USER_KYC_TYPE.INCOME]: 'Income Verification',
  [USER_KYC_TYPE.TAX_RETURN]: 'Tax Return',
  [USER_KYC_TYPE.INCOME_CERTIFICATE]: 'Income Certificate',
  [USER_KYC_TYPE.BUSINESS]: 'Business Verification',
  [USER_KYC_TYPE.BUSINESS_LICENSE]: 'Business License',
  [USER_KYC_TYPE.TRADE_LICENSE]: 'Trade License',
  [USER_KYC_TYPE.VAT_REGISTRATION]: 'VAT Registration',
  [USER_KYC_TYPE.TIN_CERTIFICATE]: 'TIN Certificate',
  [USER_KYC_TYPE.COMPANY_REGISTRATION]: 'Company Registration',
};

export const USER_KYC_TYPE_DESCRIPTIONS: Record<UserKYCType, string> = {
  [USER_KYC_TYPE.NID]: 'National ID card for identity verification',
  [USER_KYC_TYPE.PASSPORT]: 'Passport for international identity verification',
  [USER_KYC_TYPE.BIRTH_CERTIFICATE]: 'Birth certificate for identity verification',
  [USER_KYC_TYPE.DRIVING_LICENSE]: 'Driving license for identity verification',
  [USER_KYC_TYPE.ADDRESS]: 'Address proof verification',
  [USER_KYC_TYPE.UTILITY_BILL]: 'Utility bill for address verification',
  [USER_KYC_TYPE.BANK_STATEMENT]: 'Bank statement for financial verification',
  [USER_KYC_TYPE.INCOME]: 'Income verification documents',
  [USER_KYC_TYPE.TAX_RETURN]: 'Tax return for income verification',
  [USER_KYC_TYPE.INCOME_CERTIFICATE]: 'Income certificate for income verification',
  [USER_KYC_TYPE.BUSINESS]: 'Business verification documents',
  [USER_KYC_TYPE.BUSINESS_LICENSE]: 'Business license for business verification',
  [USER_KYC_TYPE.TRADE_LICENSE]: 'Trade license for business verification',
  [USER_KYC_TYPE.VAT_REGISTRATION]: 'VAT registration for business verification',
  [USER_KYC_TYPE.TIN_CERTIFICATE]: 'TIN certificate for tax verification',
  [USER_KYC_TYPE.COMPANY_REGISTRATION]: 'Company registration for business verification',
};

export const IDENTITY_KYC_TYPES: UserKYCType[] = [
  USER_KYC_TYPE.NID,
  USER_KYC_TYPE.PASSPORT,
  USER_KYC_TYPE.BIRTH_CERTIFICATE,
  USER_KYC_TYPE.DRIVING_LICENSE,
];

export const ADDRESS_KYC_TYPES: UserKYCType[] = [USER_KYC_TYPE.ADDRESS, USER_KYC_TYPE.UTILITY_BILL];

export const FINANCIAL_KYC_TYPES: UserKYCType[] = [
  USER_KYC_TYPE.BANK_STATEMENT,
  USER_KYC_TYPE.INCOME,
  USER_KYC_TYPE.TAX_RETURN,
  USER_KYC_TYPE.INCOME_CERTIFICATE,
];

export const BUSINESS_KYC_TYPES: UserKYCType[] = [
  USER_KYC_TYPE.BUSINESS,
  USER_KYC_TYPE.BUSINESS_LICENSE,
  USER_KYC_TYPE.TRADE_LICENSE,
  USER_KYC_TYPE.VAT_REGISTRATION,
  USER_KYC_TYPE.TIN_CERTIFICATE,
  USER_KYC_TYPE.COMPANY_REGISTRATION,
];

export function isIdentityKYC(type: UserKYCType): boolean {
  return IDENTITY_KYC_TYPES.includes(type);
}

export function isAddressKYC(type: UserKYCType): boolean {
  return ADDRESS_KYC_TYPES.includes(type);
}

export function isFinancialKYC(type: UserKYCType): boolean {
  return FINANCIAL_KYC_TYPES.includes(type);
}

export function isBusinessKYC(type: UserKYCType): boolean {
  return BUSINESS_KYC_TYPES.includes(type);
}

export function getKYCTypeLabel(type: UserKYCType): string {
  return USER_KYC_TYPE_LABELS[type] || 'Unknown';
}

export function getKYCTypeDescription(type: UserKYCType): string {
  return USER_KYC_TYPE_DESCRIPTIONS[type] || '';
}

export function getKYCTypeByValue(value: string): UserKYCType | null {
  const normalized = value.toLowerCase();
  const types = Object.values(USER_KYC_TYPE);
  return types.find((type) => type.toLowerCase() === normalized) || null;
}

export function getKYCTypeCategory(type: UserKYCType): string {
  if (isIdentityKYC(type)) return 'identity';
  if (isAddressKYC(type)) return 'address';
  if (isFinancialKYC(type)) return 'financial';
  if (isBusinessKYC(type)) return 'business';
  return 'other';
}
