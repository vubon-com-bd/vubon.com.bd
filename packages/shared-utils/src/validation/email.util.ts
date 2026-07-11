// packages/shared-utils/src/validation/email.util.ts
// Complete fixed file - all errors resolved

/**
 * Email Utilities - Email normalization and formatting
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-utils/validation/email.util
 *
 * RULES:
 * ✅ ONLY email normalization, validation, formatting - NO business logic
 * ✅ NO email sending, SMTP logic, MX lookup
 * ✅ Pure functions with deterministic output
 * ✅ Named exports only
 * ✅ No side effects or external API calls
 */

import validator from 'validator';

// ============================================================
// ✅ FIXED: Import domain sets from shared-constants (SSOT)
// ============================================================
import {
  DISPOSABLE_DOMAINS_SET,
  FREE_EMAIL_DOMAINS_SET,
  BANGLADESH_COMMERCIAL_DOMAINS_SET,
  BANGLADESH_EDUCATIONAL_DOMAINS_SET,
  BANGLADESH_GOVERNMENT_DOMAINS_SET,
  BANGLADESH_CORPORATE_DOMAINS_SET,
  INTERNATIONAL_EDUCATIONAL_DOMAINS_SET,
  INTERNATIONAL_GOVERNMENT_DOMAINS_SET,
} from '@vubon/shared-constants';

// ============================================================
// ✅ FIXED: Local constants (since EMAIL_CONFIG doesn't have these properties)
// ============================================================

/**
 * Email regex pattern (RFC 5322 compliant)
 */
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Common free email providers (for categorization)
 */
const COMMON_EMAIL_DOMAINS: readonly string[] = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
  'icloud.com', 'aol.com', 'protonmail.com', 'mail.com',
];

/**
 * Bangladesh-specific email domains
 */
const BANGLADESH_EMAIL_DOMAINS: readonly string[] = [
  'yahoo.com.bd', 'gmail.com', 'outlook.com', 'hotmail.com',
  'agni.com', 'bdcom.com', 'btcl.net.bd', 'dhaka.net',
];

/**
 * Educational institution domains (Bangladesh)
 */
const EDUCATIONAL_DOMAINS: readonly string[] = [
  'du.ac.bd', 'buet.ac.bd', 'ru.ac.bd', 'cu.ac.bd', 'ju.ac.bd',
  'northsouth.edu', 'bracu.ac.bd', 'aiub.edu', 'iub.edu.bd',
];

// Create Sets for O(1) lookup
const COMMON_EMAIL_DOMAINS_SET = new Set<string>(COMMON_EMAIL_DOMAINS);
const BANGLADESH_EMAIL_DOMAINS_SET = new Set<string>(BANGLADESH_EMAIL_DOMAINS);
const EDUCATIONAL_DOMAINS_SET = new Set<string>(EDUCATIONAL_DOMAINS);

// ============================================================
// Normalization
// ============================================================

/**
 * Normalize email address (trim, lowercase)
 *
 * @param email - Email address to normalize
 * @returns Normalized email string
 *
 * @example
 * normalizeEmail('  User@Example.COM  ') // 'user@example.com'
 */
export const normalizeEmail = (email: string): string => {
  if (!email || typeof email !== 'string') {
    throw new Error('Email is required');
  }
  return email.trim().toLowerCase();
};

/**
 * Normalize email with domain-specific rules
 * - Gmail: removes dots and + aliases
 * - Outlook/Hotmail: removes + aliases only
 * - Other domains: basic normalization only
 *
 * @param email - Email address to normalize
 * @returns Domain-specific normalized email
 *
 * @example
 * normalizeEmailWithRules('user.name+filter@gmail.com') // 'username@gmail.com'
 */
export const normalizeEmailWithRules = (email: string): string => {
  let normalized = normalizeEmail(email);
  const [username, domain] = normalized.split('@');

  if (!username || !domain) return normalized;

  // Gmail: remove dots and + aliases (Google ignores dots)
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    const normalizedUsername = username.replace(/\./g, '').replace(/\+.*$/, '');
    return `${normalizedUsername}@gmail.com`;
  }

  // Outlook/Hotmail/Live: + aliases only (they don't ignore dots)
  if (['hotmail.com', 'outlook.com', 'live.com', 'msn.com'].includes(domain)) {
    const normalizedUsername = username.replace(/\+.*$/, '');
    return `${normalizedUsername}@${domain}`;
  }

  // Yahoo: + aliases only
  if (domain === 'yahoo.com' || domain === 'yahoo.com.bd') {
    const normalizedUsername = username.replace(/\+.*$/, '');
    return `${normalizedUsername}@${domain}`;
  }

  return normalized;
};

// ============================================================
// Validation
// ============================================================

/**
 * Check if email format is valid (using validator library)
 *
 * @param email - Email address to validate
 * @returns True if email format is valid
 */
export const isValidEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  return validator.isEmail(email);
};

/**
 * Check if email format is valid (strict regex-based)
 *
 * @param email - Email address to validate
 * @returns True if email format matches strict pattern
 */
export const isValidEmailStrict = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  return EMAIL_REGEX.test(email) && validator.isEmail(email);
};

/**
 * Check if email domain has MX records (DNS check)
 * Warning: This is an async operation and may have side effects
 *
 * @param email - Email address to check
 * @returns Promise<boolean> - True if domain has MX records
 */
export const hasMxRecords = async (email: string): Promise<boolean> => {
  if (!email) return false;

  const domain = getEmailDomain(email);
  if (!domain) return false;

  try {
    const dns = await import('dns');
    const { promises } = dns;
    const mxRecords = await promises.resolveMx(domain);
    return mxRecords && mxRecords.length > 0;
  } catch {
    return false;
  }
};

// ============================================================
// Formatting
// ============================================================

/**
 * Mask email for privacy (e.g., u***r@example.com)
 *
 * @param email - Email address to mask
 * @returns Masked email string
 *
 * @example
 * maskEmail('user@example.com') // 'u***r@example.com'
 */
export const maskEmail = (email: string): string => {
  if (!email) return '';

  const [username, domain] = email.split('@');
  if (!username || !domain) return email;

  if (username.length <= 2) {
    const firstChar = username[0] || '';
    const secondChar = username[1] || '';
    return `${firstChar}${secondChar}***@${domain}`;
  }

  const firstChar = username[0] || '';
  const lastChar = username[username.length - 1] || '';
  const masked = `${firstChar}***${lastChar}`;

  return `${masked}@${domain}`;
};

/**
 * Get email domain
 *
 * @param email - Email address
 * @returns Domain part or null if invalid
 */
export const getEmailDomain = (email: string): string | null => {
  if (!email) return null;
  const parts = email.split('@');
  return parts.length === 2 ? (parts[1] ?? null) : null;
};

/**
 * Check if email is from common provider (Gmail, Yahoo, Outlook, etc.)
 *
 * @param email - Email address
 * @returns True if from common email provider
 */
export const isCommonEmailDomain = (email: string): boolean => {
  const domain = getEmailDomain(email);
  if (!domain) return false;
  return COMMON_EMAIL_DOMAINS_SET.has(domain);
};

/**
 * Check if email is from Bangladesh-specific domain
 *
 * @param email - Email address
 * @returns True if from Bangladesh domain
 */
export const isBangladeshEmailDomain = (email: string): boolean => {
  const domain = getEmailDomain(email);
  if (!domain) return false;
  return BANGLADESH_EMAIL_DOMAINS_SET.has(domain);
};

/**
 * Check if email is from educational institution
 *
 * @param email - Email address
 * @returns True if from educational domain (.edu, .ac.bd, etc.)
 */
export const isEducationalEmail = (email: string): boolean => {
  const domain = getEmailDomain(email);
  if (!domain) return false;

  if (domain.endsWith('.edu') || domain.endsWith('.ac.bd')) {
    return true;
  }

  return EDUCATIONAL_DOMAINS_SET.has(domain);
};

/**
 * Get email username part (local part)
 *
 * @param email - Email address
 * @returns Username part or empty string
 */
export const getEmailUsername = (email: string): string => {
  if (!email) return '';
  const parts = email.split('@');
  return parts.length === 2 ? (parts[0] ?? '') : '';
};

/**
 * Get local part (alias for getEmailUsername)
 */
export const getLocalPart = (email: string): string => {
  return getEmailUsername(email);
};

// ============================================================
// Component Extraction
// ============================================================

/**
 * Email components interface
 */
export interface EmailComponents {
  username: string;
  domain: string;
  isValid: boolean;
  isCommonDomain: boolean;
  isEducational: boolean;
  isBangladeshDomain: boolean;
}

/**
 * Extract all email components into an object
 *
 * @param email - Email address
 * @returns EmailComponents object with all properties
 */
export const getEmailComponents = (email: string): EmailComponents | null => {
  if (!isValidEmail(email)) return null;

  const username = getEmailUsername(email);
  const domain = getEmailDomain(email) || '';

  return {
    username,
    domain,
    isValid: true,
    isCommonDomain: isCommonEmailDomain(email),
    isEducational: isEducationalEmail(email),
    isBangladeshDomain: isBangladeshEmailDomain(email),
  };
};

// ============================================================
// ✅ Extended Domain Checks (using imported SSOT constants)
// ============================================================

/**
 * Check if email is from a disposable/temporary provider
 *
 * @param email - Email address
 * @returns True if from disposable provider
 *
 * @example
 * isDisposableEmail('test@tempmail.com') // true
 */
export const isDisposableEmail = (email: string): boolean => {
  const domain = getEmailDomain(email);
  if (!domain) return false;
  return DISPOSABLE_DOMAINS_SET.has(domain);
};

/**
 * Check if email is from a Bangladesh commercial domain
 *
 * @param email - Email address
 * @returns True if from Bangladesh commercial domain
 */
export const isBangladeshCommercialEmail = (email: string): boolean => {
  const domain = getEmailDomain(email);
  if (!domain) return false;
  return BANGLADESH_COMMERCIAL_DOMAINS_SET.has(domain);
};

/**
 * Check if email is from a Bangladesh government domain
 *
 * @param email - Email address
 * @returns True if from Bangladesh government domain
 */
export const isBangladeshGovernmentEmail = (email: string): boolean => {
  const domain = getEmailDomain(email);
  if (!domain) return false;
  return BANGLADESH_GOVERNMENT_DOMAINS_SET.has(domain);
};

/**
 * Check if email is from a Bangladesh corporate domain
 *
 * @param email - Email address
 * @returns True if from Bangladesh corporate domain
 */
export const isBangladeshCorporateEmail = (email: string): boolean => {
  const domain = getEmailDomain(email);
  if (!domain) return false;
  return BANGLADESH_CORPORATE_DOMAINS_SET.has(domain);
};

/**
 * Check if email is from an international educational domain
 *
 * @param email - Email address
 * @returns True if from international educational domain
 */
export const isInternationalEducationalEmail = (email: string): boolean => {
  const domain = getEmailDomain(email);
  if (!domain) return false;
  return INTERNATIONAL_EDUCATIONAL_DOMAINS_SET.has(domain);
};

/**
 * Check if email is from an international government domain
 *
 * @param email - Email address
 * @returns True if from international government domain
 */
export const isInternationalGovernmentEmail = (email: string): boolean => {
  const domain = getEmailDomain(email);
  if (!domain) return false;
  return INTERNATIONAL_GOVERNMENT_DOMAINS_SET.has(domain);
};

/**
 * Get detailed email category with priority
 *
 * @param email - Email address
 * @returns Email category with priority order
 */
export const getEmailCategory = (email: string): {
  category: string;
  priority: number;
  isDisposable: boolean;
  isFree: boolean;
  isBangladesh: boolean;
  isEducational: boolean;
  isGovernment: boolean;
  isCorporate: boolean;
} => {
  const domain = getEmailDomain(email);
  if (!domain) {
    return {
      category: 'unknown',
      priority: 0,
      isDisposable: false,
      isFree: false,
      isBangladesh: false,
      isEducational: false,
      isGovernment: false,
      isCorporate: false,
    };
  }

  const isDisposable = DISPOSABLE_DOMAINS_SET.has(domain);
  const isFree = FREE_EMAIL_DOMAINS_SET.has(domain);
  const isBangladeshCommercial = BANGLADESH_COMMERCIAL_DOMAINS_SET.has(domain);
  const isBangladeshEducational = BANGLADESH_EDUCATIONAL_DOMAINS_SET.has(domain);
  const isBangladeshGovernment = BANGLADESH_GOVERNMENT_DOMAINS_SET.has(domain);
  const isBangladeshCorporate = BANGLADESH_CORPORATE_DOMAINS_SET.has(domain);
  const isInternationalEducational = INTERNATIONAL_EDUCATIONAL_DOMAINS_SET.has(domain);
  const isInternationalGovernment = INTERNATIONAL_GOVERNMENT_DOMAINS_SET.has(domain);

  const isBangladesh = isBangladeshCommercial || isBangladeshEducational || isBangladeshGovernment || isBangladeshCorporate;
  const isEducational = isBangladeshEducational || isInternationalEducational;
  const isGovernment = isBangladeshGovernment || isInternationalGovernment;
  const isCorporate = isBangladeshCorporate;

  let category = 'unknown';
  let priority = 0;

  if (isDisposable) {
    category = 'disposable';
    priority = 10;
  } else if (isBangladeshGovernment) {
    category = 'bangladesh_government';
    priority = 9;
  } else if (isBangladeshEducational) {
    category = 'bangladesh_educational';
    priority = 8;
  } else if (isBangladeshCorporate) {
    category = 'bangladesh_corporate';
    priority = 7;
  } else if (isBangladeshCommercial) {
    category = 'bangladesh_commercial';
    priority = 6;
  } else if (isInternationalGovernment) {
    category = 'international_government';
    priority = 5;
  } else if (isInternationalEducational) {
    category = 'international_educational';
    priority = 4;
  } else if (isFree) {
    category = 'free';
    priority = 3;
  } else if (isBangladesh) {
    category = 'bangladesh';
    priority = 2;
  } else if (domain) {
    category = 'common';
    priority = 1;
  }

  return {
    category,
    priority,
    isDisposable,
    isFree,
    isBangladesh,
    isEducational,
    isGovernment,
    isCorporate,
  };
};

// ============================================================
// ✅ Additional Validation Helpers
// ============================================================

/**
 * Local email validation pattern (RFC 5322 compliant)
 */
const EMAIL_VALIDATION_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Strict email validation with custom pattern
 *
 * @param email - Email address to validate
 * @returns True if email matches strict pattern
 */
export const isValidEmailWithPattern = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  return EMAIL_VALIDATION_PATTERN.test(email);
};
