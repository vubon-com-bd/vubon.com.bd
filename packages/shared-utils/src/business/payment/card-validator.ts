/**
 * Card Validator
 * কার্ড ভ্যালিডেটর
 */

import { REGEX } from '@vubon/shared-constants';

export interface CardValidationResult {
  valid: boolean;
  brand?: string;
  type?: 'credit' | 'debit' | 'prepaid';
  errors: string[];
}

export interface CardDetails {
  number: string;
  expiryMonth: number;
  expiryYear: number;
  cvv: string;
  cardHolderName: string;
}

export const validateCardNumber = (number: string): CardValidationResult => {
  const errors: string[] = [];
  const cleanNumber = number.replace(/\s/g, '');

  // REGEX.ONLY_NUMBERS ব্যবহার করে চেক করা
  if (!REGEX.ONLY_NUMBERS.test(cleanNumber)) {
    errors.push('Card number must contain only digits');
    return { valid: false, errors };
  }

  // Check length
  if (cleanNumber.length < 13 || cleanNumber.length > 19) {
    errors.push('Card number must be between 13 and 19 digits');
    return { valid: false, errors };
  }

  // Detect card brand
  const brand = detectCardBrand(cleanNumber);
  if (!brand) {
    errors.push('Unsupported card brand');
    return { valid: false, errors };
  }

  // Luhn algorithm validation
  if (!isValidLuhn(cleanNumber)) {
    errors.push('Invalid card number');
    return { valid: false, errors };
  }

  return {
    valid: true,
    brand,
    errors: [],
  };
};

export const validateCardExpiry = (
  month: number,
  year: number
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (month < 1 || month > 12) {
    errors.push('Invalid expiry month');
    return { valid: false, errors };
  }

  if (year < currentYear) {
    errors.push('Card has expired');
    return { valid: false, errors };
  }

  if (year === currentYear && month < currentMonth) {
    errors.push('Card has expired');
    return { valid: false, errors };
  }

  return { valid: true, errors: [] };
};

export const validateCVV = (cvv: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // REGEX.ONLY_NUMBERS ব্যবহার করে CVV চেক করা
  if (!REGEX.ONLY_NUMBERS.test(cvv) || cvv.length < 3 || cvv.length > 4) {
    errors.push('CVV must be 3 or 4 digits');
    return { valid: false, errors };
  }

  return { valid: true, errors: [] };
};

export const validateCard = (card: CardDetails): CardValidationResult => {
  const errors: string[] = [];

  // Validate card number
  const numberResult = validateCardNumber(card.number);
  if (!numberResult.valid) {
    errors.push(...numberResult.errors);
  }

  // Validate expiry
  const expiryResult = validateCardExpiry(card.expiryMonth, card.expiryYear);
  if (!expiryResult.valid) {
    errors.push(...expiryResult.errors);
  }

  // Validate CVV
  const cvvResult = validateCVV(card.cvv);
  if (!cvvResult.valid) {
    errors.push(...cvvResult.errors);
  }

  // Validate card holder name
  if (!card.cardHolderName || card.cardHolderName.trim().length < 2) {
    errors.push('Card holder name is required');
  }

  return {
    valid: errors.length === 0,
    brand: numberResult.brand,
    errors,
  };
};

export const detectCardBrand = (number: string): string | null => {
  const patterns: Record<string, RegExp> = {
    visa: /^4/,
    mastercard: /^5[1-5]/,
    amex: /^3[47]/,
    discover: /^6(?:011|5)/,
    diners: /^3(?:0[0-5]|[68])/,
    jcb: /^35(?:2[89]|[3-8])/,
  };

  for (const [brand, pattern] of Object.entries(patterns)) {
    if (pattern.test(number)) {
      return brand;
    }
  }

  return null;
};

export const isValidLuhn = (number: string): boolean => {
  let sum = 0;
  let isEven = false;

  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

export const maskCardNumber = (number: string): string => {
  const cleanNumber = number.replace(/\s/g, '');
  const last4 = cleanNumber.slice(-4);
  const prefix = cleanNumber.slice(0, 6);
  const masked = prefix + '****' + last4;

  return masked.replace(/(.{4})/g, '$1 ').trim();
};
