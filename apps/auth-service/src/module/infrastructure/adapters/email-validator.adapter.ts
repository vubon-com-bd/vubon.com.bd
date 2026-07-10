/**
 * Email Validator Adapter - Infrastructure Layer Implementation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module infrastructure/adapters/email-validator.adapter
 *
 * @description
 * Infrastructure adapter that implements the IEmailValidator port.
 * Uses @vubon/shared-utils for reliable validation.
 *
 * Enterprise Features:
 * ✅ Implements domain port (IEmailValidator)
 * ✅ Uses shared-utils for actual validation
 * ✅ Comprehensive error handling
 * ✅ Type-safe conversion between infrastructure and domain types
 * ✅ Caching for frequently validated emails (performance)
 * ✅ Bangladesh specific - Complete domain detection
 *
 * @example
 * // In infrastructure module
 * const emailValidator = new EmailValidatorAdapter();
 * const email = new Email('user@example.com', emailValidator);
 */

import {
  isValidEmail,
  normalizeEmail,
  maskEmail as maskEmailUtil,
  getEmailDomain,
  getEmailUsername,
  getLocalPart,
  isCommonEmailDomain,
  isBangladeshEmailDomain,
  isEducationalEmail,
  isDisposableEmail,
  isGovernmentEmail,
  getEmailComponents,
  type EmailComponents as SharedEmailComponents,
} from '@vubon/shared-utils';

import {
  IEmailValidator,
  EmailValidationResult,
  EmailComponents,
  EmailDomainCategory,
  EmailProviderType,
} from '../../domain/ports/email-validator.port';

// ============================================================
// Constants (Infrastructure Level)
// ============================================================

/**
 * Cache configuration for frequently validated emails
 * Reduces parsing overhead for repeated validations
 */
const CACHE_CONFIG = {
  ENABLED: true,
  MAX_SIZE: 1000,
  TTL_MS: 5 * 60 * 1000, // 5 minutes
} as const;

// ============================================================
// Cache Implementation (Performance Optimization)
// ============================================================

interface CacheEntry {
  result: EmailValidationResult | null;
  timestamp: number;
}

/**
 * Simple in-memory cache for email validation results
 */
class EmailValidationCache {
  private cache = new Map<string, CacheEntry>();
  private readonly maxSize: number;
  private readonly ttlMs: number;

  constructor(maxSize: number = CACHE_CONFIG.MAX_SIZE, ttlMs: number = CACHE_CONFIG.TTL_MS) {
    this.maxSize = maxSize;
    this.ttlMs = ttlMs;
  }

  private getKey(email: string): string {
    return email.trim().toLowerCase();
  }

  get(email: string): EmailValidationResult | null {
    if (!CACHE_CONFIG.ENABLED) return null;

    const key = this.getKey(email);
    const entry = this.cache.get(key);

    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.ttlMs) {
      this.cache.delete(key);
      return null;
    }

    return entry.result;
  }

  set(email: string, result: EmailValidationResult): void {
    if (!CACHE_CONFIG.ENABLED) return;

    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    const key = this.getKey(email);
    this.cache.set(key, { result, timestamp: Date.now() });
  }

  clear(): void {
    this.cache.clear();
  }

  getStats(): { size: number; maxSize: number } {
    return { size: this.cache.size, maxSize: this.maxSize };
  }
}

// ============================================================
// Helper Functions (Infrastructure Level)
// ============================================================

/**
 * Map infrastructure provider to domain EmailProviderType
 */
const mapToDomainProvider = (email: string): EmailProviderType => {
  const domain = getEmailDomain(email);
  if (!domain) return 'other';

  const googleDomains = ['gmail.com', 'googlemail.com', 'google.com'];
  if (googleDomains.includes(domain) || domain.endsWith('.google.com')) {
    return 'google';
  }

  const microsoftDomains = ['outlook.com', 'hotmail.com', 'live.com', 'msn.com', 'passport.com'];
  if (microsoftDomains.includes(domain)) {
    return 'microsoft';
  }

  const appleDomains = ['icloud.com', 'me.com', 'mac.com'];
  if (appleDomains.includes(domain)) {
    return 'apple';
  }

  if (domain === 'yahoo.com') return 'yahoo';
  if (domain === 'protonmail.com') return 'protonmail';

  return 'other';
};

/**
 * Map infrastructure components to domain EmailComponents
 */
const mapToDomainComponents = (
  sharedComponents: SharedEmailComponents | null,
  email: string
): EmailComponents | null => {
  if (!sharedComponents) return null;

  const normalized = normalizeEmail(email);
  const [username, domain] = normalized.split('@');

  return {
    username: username || '',
    domain: domain || '',
    normalized,
    provider: mapToDomainProvider(normalized),
    category: mapToDomainCategory(email),
    isFreeProvider: isCommonEmailDomain(normalized),
    isBangladesh: isBangladeshEmailDomain(normalized),
    isDisposable: isDisposableEmail(normalized),
    isEducational: isEducationalEmail(normalized),
    isGovernment: isGovernmentEmail(normalized),
    hasSubAddress: false, // Will be set separately
    subAddressTag: undefined,
  };
};

/**
 * Map infrastructure category to domain EmailDomainCategory
 */
const mapToDomainCategory = (email: string): EmailDomainCategory => {
  const domain = getEmailDomain(email);
  if (!domain) return 'other';

  if (isDisposableEmail(email)) return 'disposable';
  if (isBangladeshEmailDomain(email)) return 'bangladesh';
  if (isEducationalEmail(email)) return 'educational';
  if (isGovernmentEmail(email)) return 'government';
  if (isCommonEmailDomain(email)) return 'free';

  return 'corporate';
};

// ============================================================
// Email Validator Adapter
// ============================================================

/**
 * Email Validator Adapter
 *
 * Implements IEmailValidator port using shared-utils
 */
export class EmailValidatorAdapter implements IEmailValidator {
  private cache: EmailValidationCache;

  constructor() {
    this.cache = new EmailValidationCache();
  }

  /**
   * Validate an email address with caching
   */
  validate(email: string): EmailValidationResult {
    // Check cache first
    const cached = this.cache.get(email);
    if (cached) {
      return cached;
    }

    try {
      // Validate with shared utility
      if (!isValidEmail(email)) {
        const result: EmailValidationResult = {
          isValid: false,
          error: 'Invalid email format',
        };
        this.cache.set(email, result);
        return result;
      }

      // Normalize
      const normalized = normalizeEmail(email);

      // Get components
      const sharedComponents = getEmailComponents(normalized);
      const components = mapToDomainComponents(sharedComponents, normalized);

      if (!components) {
        const result: EmailValidationResult = {
          isValid: false,
          error: 'Could not parse email components',
        };
        this.cache.set(email, result);
        return result;
      }

      // Check for subaddress
      const [localPart] = normalized.split('@');
      if (localPart) {
        const subaddressMatch = localPart.match(/^(.+)\+(.+)$/);
        if (subaddressMatch && subaddressMatch.length >= 3) {
          (components as any).hasSubAddress = true;
          (components as any).subAddressTag = subaddressMatch[2] || undefined;
        }
      }

      const result: EmailValidationResult = {
        isValid: true,
        normalized,
        components,
      };

      this.cache.set(email, result);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        isValid: false,
        error: `Validation failed: ${errorMessage}`,
      };
    }
  }

  /**
   * Check if an email address is valid
   */
  isValid(email: string): boolean {
    try {
      const result = this.validate(email);
      return result.isValid;
    } catch {
      return false;
    }
  }

  /**
   * Normalize an email address
   */
  normalize(email: string, stripSubaddress: boolean = false): string | null {
    try {
      const normalized = normalizeEmail(email);
      if (stripSubaddress) {
        const [localPart, domain] = normalized.split('@');
        if (localPart) {
          const baseLocalPart = localPart.split('+')[0];
          return `${baseLocalPart}@${domain}`;
        }
      }
      return normalized;
    } catch {
      return null;
    }
  }

  /**
   * Get email components
   */
  getComponents(email: string): EmailComponents | null {
    try {
      const result = this.validate(email);
      if (!result.isValid || !result.components) {
        return null;
      }
      return result.components;
    } catch {
      return null;
    }
  }

  /**
   * Mask email for privacy
   */
  mask(email: string): string {
    try {
      return maskEmailUtil(email);
    } catch {
      return email;
    }
  }

  /**
   * Get email domain
   */
  getDomain(email: string): string | null {
    try {
      return getEmailDomain(email);
    } catch {
      return null;
    }
  }

  /**
   * Get email username
   */
  getUsername(email: string): string | null {
    try {
      return getEmailUsername(email);
    } catch {
      return null;
    }
  }

  /**
   * Check if email is from a common free provider
   */
  isFreeProvider(email: string): boolean {
    try {
      return isCommonEmailDomain(email);
    } catch {
      return false;
    }
  }

  /**
   * Check if email is from Bangladesh
   */
  isBangladesh(email: string): boolean {
    try {
      return isBangladeshEmailDomain(email);
    } catch {
      return false;
    }
  }

  /**
   * Check if email is from a disposable service
   */
  isDisposable(email: string): boolean {
    try {
      return isDisposableEmail(email);
    } catch {
      return false;
    }
  }

  /**
   * Check if email is from an educational institution
   */
  isEducational(email: string): boolean {
    try {
      return isEducationalEmail(email);
    } catch {
      return false;
    }
  }

  /**
   * Check if email is from a government domain
   */
  isGovernment(email: string): boolean {
    try {
      return isGovernmentEmail(email);
    } catch {
      return false;
    }
  }

  /**
   * Check if email is from a corporate/business domain
   */
  isCorporate(email: string): boolean {
    try {
      const components = this.getComponents(email);
      if (!components) return false;
      return (
        !components.isFreeProvider &&
        !components.isEducational &&
        !components.isGovernment
      );
    } catch {
      return false;
    }
  }

  /**
   * Check if email has a subaddress tag
   */
  hasSubAddress(email: string): boolean {
    try {
      const components = this.getComponents(email);
      return components?.hasSubAddress || false;
    } catch {
      return false;
    }
  }

  /**
   * Get email provider type
   */
  getProvider(email: string): EmailProviderType {
    try {
      return mapToDomainProvider(email);
    } catch {
      return 'other';
    }
  }

  /**
   * Get email domain category
   */
  getCategory(email: string): EmailDomainCategory {
    try {
      return mapToDomainCategory(email);
    } catch {
      return 'other';
    }
  }

  /**
   * Batch validate multiple email addresses
   */
  batchValidate(emails: string[]): EmailValidationResult[] {
    return emails.map(email => this.validate(email));
  }

  /**
   * Clear validation cache (useful for testing)
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics (for monitoring)
   */
  getCacheStats(): { size: number; maxSize: number } {
    return this.cache.getStats();
  }
}

// ============================================================
// Singleton Export (For dependency injection)
// ============================================================

/**
 * Singleton instance of EmailValidatorAdapter
 * Use this for dependency injection in NestJS or other DI containers
 */
export const emailValidatorAdapter = new EmailValidatorAdapter();
