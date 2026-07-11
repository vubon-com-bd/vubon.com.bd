// packages/shared-schemas/src/auth/email.schema.ts
// Complete fixed file with all errors resolved

/**
 * Email Schema - Enterprise Grade Validation Schema
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-schemas/auth/email.schema
 * 
 * @description
 * Zod schema for email validation with Bangladesh-specific rules.
 * Supports international email formats, disposable email detection,
 * and domain-based validation rules.
 * 
 * Enterprise Rules:
 * ✅ RFC 5322 compliant email validation
 * ✅ Bangladesh specific domain support (.com.bd, .edu.bd, .gov.bd)
 * ✅ Disposable email detection
 * ✅ Educational institution email validation
 * ✅ Government email validation
 * ✅ Corporate email detection
 * ✅ Sub-addressing support (user+tag@example.com)
 * ✅ Length constraints (max 254 characters)
 * ✅ Unicode support for international emails
 * ✅ Type inference for TypeScript
 * 
 * @example
 * const result = EmailSchema.safeParse('user@example.com');
 * if (result.success) {
 *   console.log(result.data); // 'user@example.com'
 * }
 */

import { z } from 'zod';

// ============================================================
// Imports from shared-constants (SSOT)
// ============================================================
import {
  DISPOSABLE_DOMAINS_SET,
  BANGLADESH_COMMERCIAL_DOMAINS_SET,
  BANGLADESH_EDUCATIONAL_DOMAINS_SET,
  BANGLADESH_GOVERNMENT_DOMAINS_SET,
  BANGLADESH_CORPORATE_DOMAINS_SET,
  INTERNATIONAL_EDUCATIONAL_DOMAINS_SET,
  INTERNATIONAL_GOVERNMENT_DOMAINS_SET,
  FREE_EMAIL_DOMAINS_SET,
  EMAIL_VALIDATION_PATTERNS,
} from '@vubon/shared-constants';

// ============================================================
// Local Constants (from shared-constants)
// ============================================================

// Re-export sets for local use
const DISPOSABLE_DOMAINS = DISPOSABLE_DOMAINS_SET;
const FREE_PROVIDERS = FREE_EMAIL_DOMAINS_SET;
const EDUCATIONAL_DOMAINS = new Set([
  ...BANGLADESH_EDUCATIONAL_DOMAINS_SET,
  ...INTERNATIONAL_EDUCATIONAL_DOMAINS_SET,
]);
const GOVERNMENT_DOMAINS = new Set([
  ...BANGLADESH_GOVERNMENT_DOMAINS_SET,
  ...INTERNATIONAL_GOVERNMENT_DOMAINS_SET,
]);

// Bangladesh domain patterns (from email.constants)
const BANGLADESH_DOMAIN_PATTERNS = {
  COMMERCIAL: /\.(com\.bd|net\.bd|org\.bd|co\.bd)$/i,
  EDUCATIONAL: /\.(edu\.bd|ac\.bd)$/i,
  GOVERNMENT: /\.(gov\.bd|mil\.bd)$/i,
  CORPORATE: new Set([...BANGLADESH_COMMERCIAL_DOMAINS_SET, ...BANGLADESH_CORPORATE_DOMAINS_SET]),
};

// ============================================================
// Helper Functions (with proper type annotations)
// ============================================================

/**
 * Extract domain from email
 */
const getDomain = (email: string): string | null => {
  const parts = email.split('@');
  return parts.length === 2 ? parts[1] ?? null : null;
};

/**
 * Check if domain matches any pattern in a set
 */
const domainMatchesSet = (domain: string, set: Set<string>): boolean => {
  return set.has(domain);
};

/**
 * Check if domain matches a regex pattern
 */
const domainMatchesPattern = (domain: string, pattern: RegExp): boolean => {
  return pattern.test(domain);
};

// ============================================================
// Base Email Schema
// ============================================================

/**
 * Base email validation schema
 * - RFC 5322 compliant
 * - Max 254 characters
 * - Trim and lowercase
 */
export const EmailSchema = z
  .string()
  .min(1, 'Email is required')
  .max(254, 'Email cannot exceed 254 characters')
  .regex(EMAIL_VALIDATION_PATTERNS.STRICT, 'Invalid email format')
  .trim()
  .toLowerCase()
  .brand('Email');

// ============================================================
// Extended Email Schemas
// ============================================================

/**
 * Strict Email Schema
 * - No disposable/temporary email domains
 * - Valid MX record format (syntax only)
 */
export const StrictEmailSchema = EmailSchema
  .refine(
    (email: string) => {
      const domain = getDomain(email);
      if (!domain) return true;
      return !domainMatchesSet(domain, DISPOSABLE_DOMAINS);
    },
    {
      message: 'Disposable email addresses are not allowed. Please use a permanent email address.',
      path: ['email'],
    }
  );

/**
 * Bangladesh Email Schema
 * - Must be from a Bangladesh domain (.com.bd, .edu.bd, .gov.bd)
 * - Or from a Bangladesh-specific corporate domain
 */
export const BangladeshEmailSchema = EmailSchema
  .refine(
    (email: string) => {
      const domain = getDomain(email);
      if (!domain) return false;
      
      // Check Bangladesh domain patterns
      if (domainMatchesPattern(domain, BANGLADESH_DOMAIN_PATTERNS.COMMERCIAL)) return true;
      if (domainMatchesPattern(domain, BANGLADESH_DOMAIN_PATTERNS.EDUCATIONAL)) return true;
      if (domainMatchesPattern(domain, BANGLADESH_DOMAIN_PATTERNS.GOVERNMENT)) return true;
      if (domainMatchesSet(domain, BANGLADESH_DOMAIN_PATTERNS.CORPORATE)) return true;
      
      return false;
    },
    {
      message: 'Please use a Bangladesh email address (.com.bd, .edu.bd, .gov.bd, or local provider)',
      path: ['email'],
    }
  );

/**
 * Educational Email Schema
 * - .edu, .ac, .edu.bd, .ac.bd domains
 * - Known educational institutions list
 */
export const EducationalEmailSchema = EmailSchema
  .refine(
    (email: string) => {
      const domain = getDomain(email);
      if (!domain) return false;
      
      // Check domain pattern
      if (domainMatchesPattern(domain, /\.(edu|ac|edu\.bd|ac\.bd)$/i)) return true;
      
      // Check known educational domains
      if (domainMatchesSet(domain, EDUCATIONAL_DOMAINS)) return true;
      
      return false;
    },
    {
      message: 'Please use your educational institution email address (.edu, .ac, .edu.bd)',
      path: ['email'],
    }
  );

/**
 * Government Email Schema
 * - .gov, .gov.bd domains
 * - Known government domains
 */
export const GovernmentEmailSchema = EmailSchema
  .refine(
    (email: string) => {
      const domain = getDomain(email);
      if (!domain) return false;
      
      // Check domain pattern
      if (domainMatchesPattern(domain, /\.(gov|gov\.bd|mil|mil\.bd)$/i)) return true;
      
      // Check known government domains
      if (domainMatchesSet(domain, GOVERNMENT_DOMAINS)) return true;
      
      return false;
    },
    {
      message: 'Please use your government email address (.gov, .gov.bd)',
      path: ['email'],
    }
  );

/**
 * Corporate Email Schema
 * - Not from free providers
 * - Not from educational institutions
 * - Not from government
 * - Has valid domain format
 */
export const CorporateEmailSchema = EmailSchema
  .refine(
    (email: string) => {
      const domain = getDomain(email);
      if (!domain) return false;
      
      // Must not be free provider
      if (domainMatchesSet(domain, FREE_PROVIDERS)) return false;
      
      // Must not be educational
      if (domainMatchesSet(domain, EDUCATIONAL_DOMAINS)) return false;
      
      // Must not be government
      if (domainMatchesSet(domain, GOVERNMENT_DOMAINS)) return false;
      
      // Must have at least 2 parts in domain
      const parts = domain.split('.');
      return parts.length >= 2;
    },
    {
      message: 'Please use your business/corporate email address',
      path: ['email'],
    }
  );

/**
 * Email with Sub-address Support
 * - Allows sub-addressing (user+tag@example.com)
 * - Useful for filtering and testing
 */
export const EmailWithSubaddressSchema = EmailSchema
  .refine(
    (email: string) => {
      const localPart = email.split('@')[0];
      if (!localPart) return true;
      
      // Allow + in local part
      return /^[a-zA-Z0-9._%+-]+(\+[a-zA-Z0-9._%+-]+)?$/.test(localPart);
    },
    {
      message: 'Invalid email format with sub-address',
      path: ['email'],
    }
  );

/**
 * Professional Email Schema
 * - Must be corporate or educational
 */
export const ProfessionalEmailSchema = EmailSchema
  .refine(
    (email: string) => {
      const domain = getDomain(email);
      if (!domain) return false;
      
      // Must be corporate or educational
      if (domainMatchesSet(domain, FREE_PROVIDERS)) return false;
      if (domainMatchesSet(domain, DISPOSABLE_DOMAINS)) return false;
      
      return true;
    },
    {
      message: 'Please use your professional email address (corporate or educational)',
      path: ['email'],
    }
  );

// ============================================================
// Contextual Email Schemas
// ============================================================

/**
 * Email Schema for Login
 * - Less strict validation
 * - Allows most valid email formats
 */
export const LoginEmailSchema = EmailSchema;

/**
 * Email Schema for Registration
 * - Stricter validation
 * - No disposable emails
 */
export const RegistrationEmailSchema = StrictEmailSchema;

// ============================================================
// Email Category Detection Helpers
// ============================================================

export type EmailCategory = 'free' | 'corporate' | 'educational' | 'government' | 'bangladesh' | 'disposable' | 'unknown';

/**
 * Get email category
 */
export function getEmailCategory(email: string): {
  category: EmailCategory;
  provider?: string;
} {
  const domain = getDomain(email);
  if (!domain) return { category: 'unknown' };

  // Check disposable
  if (domainMatchesSet(domain, DISPOSABLE_DOMAINS)) {
    return { category: 'disposable' };
  }

  // Check Bangladesh domains
  if (domainMatchesPattern(domain, BANGLADESH_DOMAIN_PATTERNS.COMMERCIAL)) {
    return { category: 'bangladesh', provider: 'bd_commercial' };
  }
  if (domainMatchesPattern(domain, BANGLADESH_DOMAIN_PATTERNS.EDUCATIONAL)) {
    return { category: 'educational', provider: 'bd_educational' };
  }
  if (domainMatchesPattern(domain, BANGLADESH_DOMAIN_PATTERNS.GOVERNMENT)) {
    return { category: 'government', provider: 'bd_government' };
  }
  if (domainMatchesSet(domain, BANGLADESH_DOMAIN_PATTERNS.CORPORATE)) {
    return { category: 'bangladesh', provider: 'bd_corporate' };
  }

  // Check educational
  if (domainMatchesSet(domain, EDUCATIONAL_DOMAINS) || domainMatchesPattern(domain, /\.(edu|ac)$/i)) {
    return { category: 'educational', provider: 'international_educational' };
  }

  // Check government
  if (domainMatchesSet(domain, GOVERNMENT_DOMAINS) || domainMatchesPattern(domain, /\.(gov)$/i)) {
    return { category: 'government', provider: 'international_government' };
  }

  // Check free providers
  if (domainMatchesSet(domain, FREE_PROVIDERS)) {
    return { category: 'free', provider: domain };
  }

  // Otherwise corporate
  return { category: 'corporate' };
}

// ============================================================
// Utility Functions
// ============================================================

/**
 * Check if email is valid
 */
export function isValidEmail(email: string): boolean {
  return EmailSchema.safeParse(email).success;
}

/**
 * Check if email is from a free provider
 */
export function isFreeEmail(email: string): boolean {
  const domain = getDomain(email);
  return domain ? domainMatchesSet(domain, FREE_PROVIDERS) : false;
}

/**
 * Check if email is from a disposable provider
 */
export function isDisposableEmail(email: string): boolean {
  const domain = getDomain(email);
  return domain ? domainMatchesSet(domain, DISPOSABLE_DOMAINS) : false;
}

/**
 * Check if email is from Bangladesh
 */
export function isBangladeshEmail(email: string): boolean {
  const domain = getDomain(email);
  if (!domain) return false;
  
  return (
    domainMatchesPattern(domain, BANGLADESH_DOMAIN_PATTERNS.COMMERCIAL) ||
    domainMatchesPattern(domain, BANGLADESH_DOMAIN_PATTERNS.EDUCATIONAL) ||
    domainMatchesPattern(domain, BANGLADESH_DOMAIN_PATTERNS.GOVERNMENT) ||
    domainMatchesSet(domain, BANGLADESH_DOMAIN_PATTERNS.CORPORATE)
  );
}

/**
 * Check if email is from educational institution
 */
export function isEducationalEmail(email: string): boolean {
  const domain = getDomain(email);
  if (!domain) return false;
  
  return domainMatchesSet(domain, EDUCATIONAL_DOMAINS) || domainMatchesPattern(domain, /\.(edu|ac|edu\.bd|ac\.bd)$/i);
}

/**
 * Check if email is from government
 */
export function isGovernmentEmail(email: string): boolean {
  const domain = getDomain(email);
  if (!domain) return false;
  
  return domainMatchesSet(domain, GOVERNMENT_DOMAINS) || domainMatchesPattern(domain, /\.(gov|gov\.bd|mil|mil\.bd)$/i);
}

/**
 * Normalize email address
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Mask email for privacy
 */
export function maskEmail(email: string): string {
  const [username, domain] = email.split('@');
  if (!username || !domain) return email;
  
  if (username.length <= 2) {
    return `${username}***@${domain}`;
  }
  
  const first = username[0];
  const last = username[username.length - 1];
  return `${first}***${last}@${domain}`;
}

// ============================================================
// Type Exports
// ============================================================

export type EmailBranded = z.infer<typeof EmailSchema>;

// ============================================================
// ENTERPRISE SUMMARY
// ============================================================
// 
// ✅ All TypeScript Errors Fixed:
// 1. EmailSchema - defined at the top
// 2. DISPOSABLE_DOMAINS - imported from shared-constants
// 3. BANGLADESH_DOMAIN_PATTERNS - defined locally from imported sets
// 4. EDUCATIONAL_DOMAINS - combined set from imports
// 5. GOVERNMENT_DOMAINS - combined set from imports
// 6. FREE_PROVIDERS - imported from shared-constants
// 7. All parameter types properly annotated with ': string'
// 
// Enterprise Features:
// 1. ✅ RFC 5322 compliant email validation
// 2. ✅ Bangladesh-specific domain support
// 3. ✅ Disposable email detection
// 4. ✅ Educational institution validation
// 5. ✅ Government email validation
// 6. ✅ Free provider detection
// 7. ✅ Sub-addressing support
// 8. ✅ Contextual validation (login, registration, professional)
// 9. ✅ Email category detection
// 10. ✅ Utility functions
// 11. ✅ Type-safe with Zod brand
// 12. ✅ Comprehensive error messages
// 
// ============================================================
