/**
 * Email validation and normalization utilities
 * Used for validating and normalizing email addresses during registration
 */
import {
  EMAIL_DOMAIN_REGEX,
  EMAIL_LOCAL_PART_REGEX,
  EMAIL_REGEX,
} from '@vubon/auth-shared-constants';

export const isValidEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const trimmedEmail = email.trim();
  if (trimmedEmail.length === 0 || trimmedEmail.length > 255) {
    return false;
  }

  return EMAIL_REGEX.test(trimmedEmail);
};

export const normalizeEmail = (email: string): string => {
  if (!email || typeof email !== 'string') {
    return '';
  }

  let normalized = email.trim().toLowerCase();

  // Remove any extra whitespace
  normalized = normalized.replace(/\s+/g, '');

  // Handle Gmail special cases
  const [localPart, domain] = normalized.split('@');
  if (domain && ['gmail.com', 'googlemail.com'].includes(domain.toLowerCase())) {
    // Remove dots from local part (Gmail ignores dots)
    let normalizedLocal = localPart.replace(/\./g, '');

    // Remove everything after + (Gmail ignores everything after +)
    const plusIndex = normalizedLocal.indexOf('+');
    if (plusIndex !== -1) {
      normalizedLocal = normalizedLocal.substring(0, plusIndex);
    }

    normalized = `${normalizedLocal}@gmail.com`;
  }

  return normalized;
};

export const validateAndNormalizeEmail = (
  email: string,
): { isValid: boolean; normalizedEmail: string; errors: string[] } => {
  const errors: string[] = [];

  if (!email || typeof email !== 'string') {
    errors.push('Email is required');
    return { isValid: false, normalizedEmail: '', errors };
  }

  const trimmedEmail = email.trim();

  if (trimmedEmail.length === 0) {
    errors.push('Email is required');
    return { isValid: false, normalizedEmail: '', errors };
  }

  if (trimmedEmail.length > 255) {
    errors.push('Email must be less than 255 characters');
    return { isValid: false, normalizedEmail: '', errors };
  }

  if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.push('Invalid email format');
    return { isValid: false, normalizedEmail: '', errors };
  }

  const normalizedEmail = normalizeEmail(trimmedEmail);

  return {
    isValid: true,
    normalizedEmail,
    errors: [],
  };
};

export const getEmailDomain = (email: string): string | null => {
  if (!isValidEmail(email)) {
    return null;
  }

  const match = email.match(EMAIL_DOMAIN_REGEX);
  return match ? match[1].toLowerCase() : null;
};

export const getEmailLocalPart = (email: string): string | null => {
  if (!isValidEmail(email)) {
    return null;
  }

  const match = email.match(EMAIL_LOCAL_PART_REGEX);
  return match ? match[1].toLowerCase() : null;
};

export const isEmailFromDomain = (email: string, domain: string): boolean => {
  const emailDomain = getEmailDomain(email);
  if (!emailDomain) {
    return false;
  }

  return emailDomain.toLowerCase() === domain.toLowerCase();
};

export const isEmailFromAllowedDomains = (email: string, allowedDomains: string[]): boolean => {
  if (!isValidEmail(email) || !allowedDomains || allowedDomains.length === 0) {
    return false;
  }

  const emailDomain = getEmailDomain(email);
  if (!emailDomain) {
    return false;
  }

  return allowedDomains.some((domain) => domain.toLowerCase() === emailDomain.toLowerCase());
};

export const obfuscateEmail = (email: string): string => {
  if (!isValidEmail(email)) {
    return '';
  }

  const [localPart, domain] = email.split('@');
  const obfuscatedLocal =
    localPart.length <= 2
      ? localPart[0] + '*'
      : localPart[0] +
        '*'.repeat(Math.min(localPart.length - 2, 4)) +
        localPart[localPart.length - 1];

  return `${obfuscatedLocal}@${domain}`;
};

export const isDisposableEmail = (email: string, disposableDomains: string[]): boolean => {
  if (!isValidEmail(email) || !disposableDomains || disposableDomains.length === 0) {
    return false;
  }

  const emailDomain = getEmailDomain(email);
  if (!emailDomain) {
    return false;
  }

  return disposableDomains.some((domain) => domain.toLowerCase() === emailDomain.toLowerCase());
};

export const isEmailWithPlusAlias = (email: string): boolean => {
  if (!isValidEmail(email)) {
    return false;
  }

  const [localPart] = email.split('@');
  return localPart.includes('+');
};

export const stripEmailPlusAlias = (email: string): string => {
  if (!isValidEmail(email)) {
    return email;
  }

  const [localPart, domain] = email.split('@');
  const strippedLocal = localPart.includes('+') ? localPart.split('+')[0] : localPart;

  return `${strippedLocal}@${domain}`;
};

export const validateEmailArray = (emails: string[]): { valid: string[]; invalid: string[] } => {
  const valid: string[] = [];
  const invalid: string[] = [];

  if (!Array.isArray(emails)) {
    return { valid: [], invalid: [] };
  }

  for (const email of emails) {
    if (typeof email === 'string' && isValidEmail(email)) {
      valid.push(normalizeEmail(email));
    } else {
      invalid.push(email);
    }
  }

  return { valid, invalid };
};

export const compareEmails = (email1: string, email2: string): boolean => {
  if (!isValidEmail(email1) || !isValidEmail(email2)) {
    return false;
  }

  return normalizeEmail(email1) === normalizeEmail(email2);
};

export const isEmailLengthValid = (email: string): boolean => {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const trimmed = email.trim();
  return trimmed.length > 0 && trimmed.length <= 255;
};

export const sanitizeEmail = (email: string): string => {
  if (!email || typeof email !== 'string') {
    return '';
  }

  // Safe split & clean without relying on unsafe control characters in regex
  let sanitized = email
    .split('')
    .filter((char) => {
      const code = char.charCodeAt(0);
      return code >= 32 && code !== 127; // Exclude control characters safely
    })
    .join('');

  // Remove potential HTML tags
  sanitized = sanitized.replace(/<[^>]*>/g, '');

  // Normalize
  sanitized = normalizeEmail(sanitized);

  return sanitized;
};

export const extractEmailFromString = (text: string): string[] => {
  if (!text || typeof text !== 'string') {
    return [];
  }

  const matches = text.match(EMAIL_REGEX);
  return matches ? matches.map((email) => normalizeEmail(email)) : [];
};

export const isTemporaryEmail = (email: string, temporaryDomains: string[]): boolean => {
  return isDisposableEmail(email, temporaryDomains);
};

export const isEducationalEmail = (email: string): boolean => {
  const domains = ['.edu', '.edu.', '.ac.', '.school.', '.university.', '.college.'];

  const emailDomain = getEmailDomain(email);
  if (!emailDomain) {
    return false;
  }

  return domains.some((domain) => emailDomain.endsWith(domain));
};
