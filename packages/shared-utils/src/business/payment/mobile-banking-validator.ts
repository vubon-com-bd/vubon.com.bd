/**
 * Mobile Banking Validator
 * মোবাইল ব্যাংকিং ভ্যালিডেটর
 */

export interface MobileBankingValidationResult {
  valid: boolean;
  provider?: string;
  errors: string[];
}

export interface MobileBankingDetails {
  provider: 'bkash' | 'nagad' | 'rocket' | 'dbbl' | 'city_bank' | 'brac_bank';
  accountNumber: string;
  accountName?: string;
}

export const validateMobileBanking = (
  details: MobileBankingDetails
): MobileBankingValidationResult => {
  const errors: string[] = [];

  // Provider validation
  const validProviders = ['bkash', 'nagad', 'rocket', 'dbbl', 'city_bank', 'brac_bank'];
  if (!validProviders.includes(details.provider)) {
    errors.push('Invalid mobile banking provider');
    return { valid: false, errors };
  }

  // Account number validation by provider
  const patterns: Record<string, RegExp> = {
    bkash: /^(?:\+880|880|0)?(?:17\d{8})$/,
    nagad: /^(?:\+880|880|0)?(?:17\d{8})$/,
    rocket: /^(?:\+880|880|0)?(?:18\d{8})$/,
    dbbl: /^(?:\+880|880|0)?(?:1[3-9]\d{8})$/,
    city_bank: /^(?:\+880|880|0)?(?:1[3-9]\d{8})$/,
    brac_bank: /^(?:\+880|880|0)?(?:1[3-9]\d{8})$/,
  };

  const pattern = patterns[details.provider];
  if (!pattern || !pattern.test(details.accountNumber)) {
    errors.push(`Invalid ${details.provider} account number`);
  }

  return {
    valid: errors.length === 0,
    provider: details.provider,
    errors,
  };
};

export const validateBkashNumber = (number: string): boolean => {
  const pattern = /^(?:\+880|880|0)?(?:17\d{8})$/;
  return pattern.test(number);
};

export const validateNagadNumber = (number: string): boolean => {
  const pattern = /^(?:\+880|880|0)?(?:17\d{8})$/;
  return pattern.test(number);
};

export const validateRocketNumber = (number: string): boolean => {
  const pattern = /^(?:\+880|880|0)?(?:18\d{8})$/;
  return pattern.test(number);
};

export const getMobileBankingProvider = (number: string): string | null => {
  if (validateBkashNumber(number)) return 'bkash';
  if (validateNagadNumber(number)) return 'nagad';
  if (validateRocketNumber(number)) return 'rocket';
  return null;
};

export const maskMobileNumber = (number: string): string => {
  const cleanNumber = number.replace(/[^0-9]/g, '');
  if (cleanNumber.length <= 4) {
    return cleanNumber;
  }
  const prefix = cleanNumber.slice(0, 3);
  const suffix = cleanNumber.slice(-4);
  return `${prefix}****${suffix}`;
};
