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
// ✅ FIXED: Correct package name
import { EMAIL_CONFIG } from '@vubon/shared-constants';

// ==================== Constants (from shared-constants) ====================

// Email regex pattern from constants (with fallback)
const EMAIL_REGEX = EMAIL_CONFIG?.EMAIL_REGEX || /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;

// Common email providers (for categorization)
const COMMON_EMAIL_DOMAINS = EMAIL_CONFIG?.COMMON_EMAIL_DOMAINS || [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
  'icloud.com', 'aol.com', 'protonmail.com', 'mail.com',
];

// Bangladesh specific email domains
const BANGLADESH_EMAIL_DOMAINS = EMAIL_CONFIG?.BANGLADESH_EMAIL_DOMAINS || [
  'yahoo.com.bd', 'gmail.com', 'outlook.com', 'hotmail.com',
  'agni.com', 'bdcom.com', 'btcl.net.bd', 'dhaka.net',
];

// Educational institutions in Bangladesh
const EDUCATIONAL_DOMAINS = EMAIL_CONFIG?.EDUCATIONAL_DOMAINS || [
  'du.ac.bd', 'buet.ac.bd', 'ru.ac.bd', 'cu.ac.bd', 'ju.ac.bd',
  'northsouth.edu', 'bracu.ac.bd', 'aiub.edu', 'iub.edu.bd',
];

// Create Sets for O(1) lookup
const COMMON_EMAIL_DOMAINS_SET = new Set(COMMON_EMAIL_DOMAINS);
const BANGLADESH_EMAIL_DOMAINS_SET = new Set(BANGLADESH_EMAIL_DOMAINS);
const EDUCATIONAL_DOMAINS_SET = new Set(EDUCATIONAL_DOMAINS);

// ==================== Normalization ====================

/**
 * Normalize email address (trim, lowercase)
 * Pure function - deterministic given same input
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

// ==================== Validation ====================

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
 * Use with caution - only when DNS lookup is acceptable
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

// ==================== Formatting ====================

/**
 * Mask email for privacy (e.g., u***r@example.com)
 *
 * @param email - Email address to mask
 * @returns Masked email string
 *
 * @example
 * maskEmail('user@example.com') // 'u***r@example.com'
 * maskEmail('us@example.com') // 'us***@example.com'
 */
export const maskEmail = (email: string): string => {
  if (!email) return '';

  const [username, domain] = email.split('@');
  if (!username || !domain) return email;

  if (username.length <= 2) {
    return `${username[0]}${username[1] || ''}***@${domain}`;
  }

  const firstChar = username[0];
  const lastChar = username[username.length - 1];
  const middleLength = username.length - 2;
  const maskedMiddle = '*'.repeat(Math.min(middleLength, 3));

  return `${firstChar}${maskedMiddle}${lastChar}@${domain}`;
};

/**
 * Get email domain
 *
 * @param email - Email address
 * @returns Domain part or null if invalid
 */
export const getEmailDomain = (email: string): string | null => {
  if (!email) return null;
  const [, domain] = email.split('@');
  return domain || null;
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
  // ✅ FIXED: Using Set for type-safe includes
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
  // ✅ FIXED: Using Set for type-safe includes
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

  // Check .edu domains
  if (domain.endsWith('.edu') || domain.endsWith('.ac.bd')) {
    return true;
  }

  // ✅ FIXED: Using Set for type-safe includes
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
  const [username] = email.split('@');
  return username || '';
};

/**
 * Get local part (alias for getEmailUsername)
 */
export const getLocalPart = (email: string): string => {
  return getEmailUsername(email);
};

// ==================== Component Extraction ====================

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

// ==================== Type Exports ====================

// ✅ FIXED: EmailComponents already exported as interface above
// No duplicate export needed
